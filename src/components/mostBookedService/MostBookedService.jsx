import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard";

const TopRated = ({ services }) => {
  const [canonicalUrl, setCanonicalUrl] = useState("");

  useEffect(() => {
    setCanonicalUrl(window.location.href); // Set canonical URL dynamically
  }, []);

  if (!services.length) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-foreground text-8xl">No services found.</p>
      </div>
    );
  }

  // Generate JSON-LD structured data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": services.map(service => {
      const serviceSchema = {
        "@type": "Service",
        name: service.name,
        description: service.description,
        image: service.imageUrl,
        offers: {
          "@type": "Offer",
          price: service.price,
          priceCurrency: service.currency || "INR",
        },
        ...(service.rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: service.rating,
            reviewCount: service.reviewCount,
          },
        }),
        url: service.url || canonicalUrl,
      };

      // Remove undefined values
      return Object.fromEntries(
        Object.entries(serviceSchema).filter(([_, v]) => v !== undefined)
      );
    }),
  };

  return (
    <>
      <Helmet>
        <title>Top Rated Services</title>
        <meta name="description" content="Discover top-rated services with excellent customer reviews and competitive pricing." />
        <meta name="keywords" content="top services marriage vendors, best-rated services marriage vendors, professional services marriage vendors, trusted services marriage vendors" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <div className="relative bg-muted rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={service.id} className="relative">
            <ServiceCard service={service} />
            {index === services.length - 1 && (
              <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold rounded-lg">
                <span className="bg-primary px-5 py-2 rounded-md">See More</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TopRated;
