import { ChatGroq } from "@langchain/groq";
import { HfInference } from "@huggingface/inference";
import { MongoClient } from "mongodb";
import { streamText } from "ai";
import dotenv from "dotenv";
import process from "node:process";
export { handler as POST };

dotenv.config();

const { HUGGINGFACE_API_KEY, GROQ_API_KEY, MONGO_DB_URL } = process.env;

// Initialize services
const hf = new HfInference(HUGGINGFACE_API_KEY);
const mongoClient = new MongoClient(MONGO_DB_URL, {
  maxPoolSize: 10,
  minPoolSize: 2,
  connectTimeoutMS: 30000,
});
await mongoClient.connect(); // Prevent repeated connections
const llm = new ChatGroq({
  apiKey: GROQ_API_KEY,
  model: "llama-3.2-90b-vision-preview",
  temperature: 0,
});
const llm2 = new ChatGroq({
  apiKey: GROQ_API_KEY,
  model: "llama-3.2-90b-vision-preview",
  temperature: 0.7,
});

const SERVICE_TYPES = [
  "wedding lawns farmhouse", "hotel", "banquet halls", "marriage garden",
  "wedding halls", "wedding resorts", "caterers", "wedding invitation",
  "wedding decor", "wedding gift", "wedding photographers", "wedding coordinators",
  "wedding music", "wedding videographers", "wedding transportation", "wedding house",
  "tent house", "wedding entertainment", "florists", "wedding planner",
  "wedding decoration", "wedding cakes", "wedding agencies", "wedding dj",
  "pandit", "photobooth", "astrologers", "bridal lahenga", "bridal jewellery",
  "bridal makeup artist", "mehndi artist", "makeup salon"
];

const synonymMapping = {
  "hall": "wedding halls", "venue": "wedding halls",
  "decorations": "wedding decoration", "dj": "wedding dj",
  "flowers": "florists", "tent": "tent house"
};

/**
 * Detects service type from user query.
 */
async function detectServiceType(userMessage) {
  const detectionPrompt = `Analyze this wedding service query: "${userMessage}"
  Respond with **one or more** relevant keywords as minimum as possible from: ${SERVICE_TYPES.join(", ")}
  - Separate multiple services with commas
  - Remove punctuation and explanations
  - Use ONLY exact matches from the list`;

  try {
    const detectionResult = await llm.invoke(detectionPrompt);
    let detected = detectionResult.content.toLowerCase().trim().split(",").map(s => s.trim());

    console.log("Detected Service Type:", detected);

    // Handle synonyms
    detected = detected.map(service => synonymMapping[service] || service);

    return detected;
  } catch (error) {
    console.error("Detection error:", error);
    return ["other"];
  }
}

/**
 * Searches vendors using embedding similarity and filters by service type.
 */
async function searchVendors(serviceTypes, queryEmbeddings) {
  const collection = mongoClient.db("wedding_services").collection("vendors");

  let allVendors = [];

  for (let i = 0; i < serviceTypes.length; i++) {
    const serviceType = serviceTypes[i];
    const queryVector = queryEmbeddings[i]; // Ensure each service has its embedding

    if (!Array.isArray(queryVector) || queryVector.length === 0) {
      console.error(`Invalid embedding for service: ${serviceType}`);
      continue;
    }

    const vendorResults = await collection.aggregate([
      {
        $vectorSearch: {
          index: "vendor_vector_index",
          path: "embedding",
          queryVector: queryVector, // Pass the flattened array
          numCandidates: 100,
          limit: 10
        }
      },
      { $match: { service_type: serviceType } }, // Match only relevant services
      { $sort: { rating: -1, min_price: 1 } }, // Sorts by rating, then price
      { $limit: 3}
    ]).toArray();

    allVendors.push(...vendorResults);
  }

  console.log("Vendor Search Results:", allVendors);
  return allVendors;
}


/**
 * Main API handler function.
 */
export async function handler(req, res) {
  try {
    const { messages } = req.body;
    const userMessage = messages[messages.length - 1].content;

    // Detect service type
    const serviceTypes = await detectServiceType(userMessage);

    console.log(`User Query: "${userMessage}" => Detected: "${serviceTypes}"`);

    if (serviceTypes.includes("other")) {
      return res.status(200).json({
        content: "Which specific service are you looking for? (e.g., catering, venue, photography)",
        vendors: [],
      });
    }

    // Generate embeddings in a single batch request
    const embeddingResponse = await hf.featureExtraction({
      model: "mixedbread-ai/mxbai-embed-large-v1",
      inputs: serviceTypes
    });

    if (!Array.isArray(embeddingResponse) || embeddingResponse.length !== serviceTypes.length) {
      throw new Error("Invalid embedding response format");
    }

    // Get vendors using embeddings
    const vendors = await searchVendors(serviceTypes, embeddingResponse);

    if (!vendors.length) {
      return res.status(200).json({
        content: `No ${serviceTypes.join(", ")} vendors found matching your criteria.`,
        vendors: [],
      });
    }

    const responseStream = await streamText({
      model: llm2,
      system: `You are an intelligent wedding planner assistant. Always respond in JSON format.
    
      Example Response Format:
      {
        "message": "Generated response here",
        "vendors": [
          {
            "name": "Vendor Name",
            "rating": 4.5,
            "price_range": "₹10000 - ₹20000",
            "service_type": "Catering"
          }
        ]
      }`,
      messages: [{
        role: "user",
        content: `User Query: ${userMessage}
        Available Services: ${serviceTypes.join(", ")}
        Vendors: ${JSON.stringify(vendors)}`
      }]
    });
    
    let llmResponse = "";
    for await (const chunk of responseStream) {
      llmResponse += chunk;
    }
    
    console.log("Raw LLM Response:", llmResponse);
    
    try {
      const structuredResponse = JSON.parse(llmResponse);
    
      const filteredVendors = vendors.map(vendor => {
        const { embedding, ...rest } = vendor;
        return rest;
      });
      
    
      // Sort vendors by rating (descending) and price (ascending)
      filteredVendors.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return a.min_price - b.min_price;
      });
    
      return res.status(200).json({
        content: structuredResponse,
        vendors: filteredVendors
      });
    } catch (error) {
      console.error("LLM response is not valid JSON:", error);
    
      return res.status(500).json({
        error: "Invalid response from AI",
        vendors: []
      });
    }
       
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      content: "Our wedding planning services are currently unavailable. Please try again later in some time.",
      vendors: [],
    });
  }
}
