import { useState } from "react";
import ServiceCategoriesCard from "../../components/servicecatogories/ServiceCatogoriesCard";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { categories } from "../../static/static.js";

const ServiceCategoriesPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleOnPlusBtn = (title) => {
    setIsActive(!isActive);
    setTitle(title);
  };

  const [category, setCategory] = useState();

  const handleOnSubCategoryNavigate = (category, subCategory) => {
    // const queryParams = new URLSearchParams({
    //   category,
    //   subCategory
    // }).toString();

    navigate(`/all/${category}/${subCategory}`);
  };

  //handle on category
  const handleOnCategory = (c) => {
    // // const queryParams = new URLSearchParams({
    // //   category
    // // }).toString();
    // navigate(`/all/${category}`);
    setCategory(c);
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wedding Services Categories",
    description:
      "Explore comprehensive wedding services including venues, vendors, bridal services, groom essentials, and more.",
    itemListElement: categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: category.title,
        description: category.description,
        image: `https://marriagevendors${category.image}`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${category.title} Subcategories`,
          itemListElement: category.subcategories.map((sub, subIndex) => ({
            "@type": "Offer",
            name: sub.name,
            image: `https://marriagevendors${sub.image}`,
          })),
        },
      },
    })),
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Wedding Services & Vendors | Marriage Vendors</title>
        <meta
          name="title"
          content="Wedding Services & Vendors | Marriage Vendors"
        />
        <meta
          name="description"
          content="Discover premium wedding services, venues, vendors, bridal & groom essentials. Plan your perfect wedding with trusted professionals and services."
        />
        <meta
          name="keywords"
          content="wedding venues, bridal services, groom essentials, wedding planners, caterers, wedding decor, wedding photography, wedding vendors"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta
          property="og:title"
          content="Wedding Services & Vendors | Marriage Vendors"
        />
        <meta
          property="og:description"
          content="Discover premium wedding services, venues, vendors, bridal & groom essentials. Plan your perfect wedding with trusted professionals and services."
        />
        <meta property="og:image" content="/" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="/" />
        <meta
          property="twitter:title"
          content="Wedding Services & Vendors | Marriage Vendors"
        />
        <meta
          property="twitter:description"
          content="Discover premium wedding services, venues, vendors, bridal & groom essentials. Plan your perfect wedding with trusted professionals and services."
        />
        <meta property="twitter:image" content="/" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 px-4 md:px-16 py-5 md:py-10">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleOnCategory(category.title)}
            className={` transition-all duration-300 ${
              isActive && title !== category.title
                ? "opacity-50 blur-xs "
                : "opacity-100 "
            }`}
          >
            <ServiceCategoriesCard
              title={category.title}
              description={category.description}
              image={category.image}
              handleOnPlusBtn={handleOnPlusBtn}dis
              handleOnCategory={handleOnCategory}
            />

            {/* SubCategory Component Opens Just Below Active Card */}
            {isActive && title === category.title && (
              <div className="absolute left-0   w-full mt-4 bg-[#f1f1f1] z-10 px-5 md:px-20">
                {/* Display Subcategories with Masonry Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-4 py-5 border border-gray-200 rounded-lg ">
                  {category.subcategories.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() =>
                        handleOnSubCategoryNavigate(category.title, sub.name)
                      }
                      className="relative   rounded-lg p-4 cursor-pointer overflow-hidden group"
                    >
                      {/* Image Container */}
                      <div className="relative w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </div>

                      <div className="absolute inset-0 left-0 w-full flex items-end bg-gradient-to-b from-transparent  to-black p-2">
                        <span className="w-full text-white text-sm font-semibold px-3 py-2 rounded-b-lg text-center">
                          {sub.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategoriesPage;
