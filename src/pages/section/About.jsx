4// import React, { useState, useEffect } from 'react';
// import { Heart, MapPin, Users, Star, Sparkles } from 'lucide-react';

// const reviews = [
//   {
//     id: 1,
//     name: "Priya & Rahul",
//     text: "Our dream wedding came to life exactly as we imagined. The team's attention to detail was incredible!",
//     location: "Mumbai"
//   },
//   {
//     id: 2,
//     name: "Anisha Kumar",
//     text: "From venue selection to final execution, they made our wedding planning stress-free and enjoyable.",
//     location: "Delhi"
//   },
//   {
//     id: 3,
//     name: "Rohan Sharma",
//     text: "Professional, creative, and passionate. They transformed our wedding into a magical experience.",
//     location: "Bangalore"
//   }
// ];

// const AboutUs = () => {
//   const [currentReview, setCurrentReview] = useState(0);
//   const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Jaipur", "Goa"];

//   useEffect(() => {
//     const autoAdvance = setInterval(() => {
//       setCurrentReview((prev) => (prev + 1) % reviews.length);
//     }, 5000);

//     return () => clearInterval(autoAdvance);
//   }, []);

//   return (
//     <div className="bg-white text-gray-800">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-pink-100 to-purple-100 py-20 overflow-hidden rounded-b-[50px]">
//         <div className="absolute inset-0 opacity-20">
//           <img 
//             src="/api/placeholder/1200/600?text=Wedding+Celebration" 
//             alt="Wedding Background" 
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="container mx-auto px-6 relative z-10 text-center">
//           <Heart className="mx-auto text-pink-500 mb-6" size={64} />
//           <h1 className="text-5xl font-bold text-gray-800 mb-4">Text text text</h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Text text textText text textText text textText text textText text text
//           </p>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white rounded-b-[50px]">
//         <div className="container mx-auto px-6">
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { icon: MapPin, title: "Nationwide Coverage", desc: "Weddings planned across India's most beautiful locations" },
//               { icon: Users, title: "Expert Team", desc: "Dedicated professionals with years of wedding planning experience" },
//               { icon: Sparkles, title: "Personalized Service", desc: "Tailored solutions for your dream wedding" }
//             ].map((feature, index) => (
//               <div key={index} className="text-center p-6 bg-pink-50 rounded-lg shadow-md">
//                 <feature.icon className="mx-auto text-pink-500 mb-4" size={48} />
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Locations */}
//       <section className="py-16 bg-gray-100 relative rounded-b-[50px]">
//         <div className="absolute inset-0 opacity-10 grayscale">
//           <img 
//             src="/api/placeholder/1600/800?text=India+Map" 
//             alt="India Map" 
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="container mx-auto px-6 text-center relative z-10">
//           <h2 className="text-4xl font-bold mb-8">Our Wedding Destinations</h2>
//           <div className="flex flex-wrap justify-center gap-4">
//             {cities.map((city) => (
//               <span 
//                 key={city} 
//                 className="bg-white px-6 py-2 rounded-full shadow-md text-gray-700 hover:bg-pink-100 transition"
//               >
//                 {city}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Reviews Carousel */}
//       <section className="py-16 bg-gradient-to-b from-purple-100 to-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-12">What Our Couples Say</h2>
//           <div className="max-w-2xl mx-auto">
//             <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//               <Star className="mx-auto text-yellow-500 mb-4" size={48} />
//               <p className="text-xl italic mb-4">"{reviews[currentReview].text}"</p>
//               <p className="font-semibold">
//                 - {reviews[currentReview].name} 
//                 <span className="text-gray-500 ml-2">from {reviews[currentReview].location}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Getting Started */}
//       <section className="py-16 bg-pink-50">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Love Story?</h2>
//           <p className="text-xl text-gray-700 mb-8">Let's create memories that will last a lifetime</p>
//           <div className="flex justify-center space-x-4">
//             <a 
//               href="/signup" 
//               className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition"
//             >
//               Get Started
//             </a>
//             <a 
//               href="/contact" 
//               className="border border-pink-500 text-pink-500 px-8 py-3 rounded-full hover:bg-pink-500 hover:text-white transition"
//             >
//               Contact Us
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutUs;
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet from react-helmet
import { Heart, MapPin, Users, Star, Sparkles } from 'lucide-react';
import aboutimageBg from '../../../public/about/about-img-1.png';
import Footer from '../Footer';

const reviews = [
  {
    id: 1,
    name: "Priya & Rahul",
    text: "Our dream wedding came to life exactly as we imagined. The team's attention to detail was incredible!",
    location: "Mumbai"
  },
  {
    id: 2,
    name: "Anisha Kumar",
    text: "From venue selection to final execution, they made our wedding planning stress-free and enjoyable.",
    location: "Delhi"
  },
  {
    id: 3,
    name: "Rohan Sharma",
    text: "Professional, creative, and passionate. They transformed our wedding into a magical experience.",
    location: "Bangalore"
  }
];

const AboutUs = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const cities = ["Ludhiana", "Delhi", "Bangalore", "Chennai", "Kolkata", "Jaipur", "Goa"];

  useEffect(() => {
    const autoAdvance = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(autoAdvance);
  }, []);

  // Define JSON‑LD structured data for the webpage
  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "About Us - Marriage Vendors",
    "url": "https://yourwebsite.com/aboutus",
    "description": "Discover trusted wedding vendors for every need at Marriage Vendors. Find everything to plan your perfect day including venues, photographers, caterers and more.",
    "publisher": {
      "@type": "Organization",
      "name": "Marriage Vendors",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.marriagevendors.com/about"
      }
    }
  };

  // Define JSON‑LD structured data for the organization
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marriage Vendors",
    "url": "https://www.marriagevendors.com/about",
    "logo": "https://www.marriagevendors.com/",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-1234",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/marriagevendors/?viewAsMember=true",
      "https://x.com/MarriageVendors",
      "https://www.instagram.com/marriagevendors/?hl=en",
      "https://www.youtube.com/channel/UCflLelgupPqW0kkKpJdACpA",
      "https://www.linkedin.com/company/marriagevendors/?viewAsMember=true"
    ]
  };

  return (
    <div className="bg-white text-gray-800">
      <Helmet>
        <title>About Us - Marriage Vendors</title>
        <meta
          name="description"
          content="Discover trusted wedding vendors for every need at Marriage Vendors. Plan your perfect wedding with expert services and personalized solutions."
          />
          {/* Add meta keywords */}
          <meta
            name="keywords"
            content="wedding vendors, wedding planning, marriage vendors, wedding checklist, guest list management, wedding inspiration, vendor search, wedding budget, custom wedding website, wedding services"
          />
        {/* Inject JSON‑LD for the webpage */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdWebPage)}
        </script>
        {/* Inject JSON‑LD for the organization */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdOrganization)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-100 to-purple-100 py-20 overflow-hidden rounded-b-[50px]">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={aboutimageBg} 
            alt="Wedding Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Heart className="mx-auto text-pink-500 mb-6" size={64} />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover trusted wedding vendors for every need at Marriage Vendors! From stunning venues to photographers, caterers, and more, find everything to plan your perfect day. Compare services, read reviews, and book with confidence. Start creating your dream wedding today!
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white rounded-b-[50px]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Nationwide Coverage", desc: "Weddings planned across India's most beautiful locations" },
              { icon: Users, title: "Expert Team", desc: "Dedicated professionals with years of wedding planning experience" },
              { icon: Sparkles, title: "Personalized Service", desc: "Tailored solutions for your dream wedding" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-pink-50 rounded-lg shadow-md">
                <feature.icon className="mx-auto text-pink-500 mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Six-Section Div */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: "📋", title: "The ultimate wedding checklist", desc: "To make sure it all gets done." },
              { icon: "👥", title: "Create and manage guest lists", desc: "And RSVPs for all of your events." },
              { icon: "💡", title: "Get inspired", desc: "With fashion, decor, and etiquette ideas." },
              { icon: "🔍", title: "Quickly find vendors", desc: "Manage and message local vendors." },
              { icon: "💰", title: "Manage your wedding budget", desc: "Easily keep track and manage expenses." },
              { icon: "🌐", title: "Create a custom wedding website", desc: "To share with guests." },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-16 bg-gray-100 relative rounded-b-[50px]">
        <div className="absolute inset-0 opacity-10 grayscale">
          <img 
            src={aboutimageBg} 
            alt="Wedding Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8">Our Wedding Destinations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city) => (
              <span 
                key={city} 
                className="bg-white px-6 py-2 rounded-full shadow-md text-gray-700 hover:bg-pink-100 transition"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section className="py-16 bg-gradient-to-b from-purple-100 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Couples Say</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Star className="mx-auto text-yellow-500 mb-4" size={48} />
              <p className="text-xl italic mb-4">"{reviews[currentReview].text}"</p>
              <p className="font-semibold">
                - {reviews[currentReview].name} 
                <span className="text-gray-500 ml-2">from {reviews[currentReview].location}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Love Story?</h2>
          <p className="text-xl text-gray-700 mb-8">Let's create memories that will last a lifetime</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/signup" 
              className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition"
            >
              Get Started
            </a>
            <a 
              href="/contactus" 
              className="border border-pink-500 text-pink-500 px-8 py-3 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
