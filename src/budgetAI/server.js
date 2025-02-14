import express from 'express';
import cors from 'cors';
import { POST as handler } from './route.js';  
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

// Enable CORS and JSON parsing for incoming requests
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post("/api/wedding-services", handler); // ✅ Use the imported POST function

app.listen(port, () => {
  console.log(`AI server running on http://localhost:${port}`);
});
