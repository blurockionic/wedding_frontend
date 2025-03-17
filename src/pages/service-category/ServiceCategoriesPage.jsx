import { useState } from "react";
import ServiceCategoriesCard from "../../components/servicecatogories/ServiceCatogoriesCard";
// import SubCategory from "../../components/sub-category/SubCategory";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const weddingVenues = [
  { name: "Wedding Lawns Farmhouse", image: "/weddingvenue/weddingfarm.webp" },
  { name: "Hotel", image: "/weddingvenue/hotel.jpg" },
  { name: "Banquet Halls", image: "/weddingvenue/banquet.jpg" },
  { name: "Marriage Garden", image: "/weddingvenue/gardenn.jpg" },
  { name: "Wedding Halls", image: "/weddingvenue/hall.avif" },
  { name: "Wedding Resorts", image: "/weddingvenue/resort.jpg" },
];

const weddingVendors = [
  { name: "Caterers", image: "/weddingvendors/cateres.jpg" },
  { name: "Wedding Invitation", image: "/weddingvendors/inviation.jpg" },
  { name: "Wedding Decor", image: "/weddingvendors/decoration.jpg" },
  { name: "Wedding Gift", image: "/weddingvendors/gift.webp" },
  { name: "Wedding Photographers", image: "/weddingvendors/photo.jpg" },
  { name: "Wedding Coordinators", image: "/weddingvendors/cordinator.jpg" },
  { name: "Wedding Music", image: "/weddingvendors/band.jpeg" },
  { name: "Wedding Videographers", image: "/weddingvendors/cateres.jpg" },
  {
    name: "Wedding Transportation",
    image: "/weddingvendors/transportt.avif",
  },
  { name: "Wedding House", image: "/weddingvendors/house.jpg" },
  { name: "Tent House", image: "/weddingvendors/tent.jpeg" },
  { name: "Wedding Entertainment", image: "/weddingvendors/game.jpeg" },
  { name: "Florists", image: "/weddingvendors/florist.jpeg" },
  { name: "Wedding Planner", image: "/weddingvendors/planner.jpeg" },
  { name: "Wedding Decoration", image: "/weddingvendors/decoration.jpg" },
  { name: "Wedding Cakes", image: "/weddingvendors/cake.jpg" },
  { name: "Wedding Agencies", image: "/weddingvendors/cordinator.jpg" },
  { name: "Wedding DJ", image: "/weddingvendors/dj.jpg" },
  { name: "Pandit", image: "/weddingvendors/pandit.jpeg" },
  { name: "Photobooth", image: "/weddingvendors/photobooth.jpg" },
  { name: "Astrologers", image: "/weddingvendors/astro.jpg" },
];

const brides = [
  { name: "Bridal Lahenga", image: "/bride/bridal_lengha.png" },
  { name: "Bridal Jewellery", image: "/bride/bridal_jewellery.png" },
  { name: "Bridal Makeup Artist", image: "/bride/bridal_makeup_artists.png" },
  { name: "Mehndi Artist", image: "/bride/mehdi_artist.jpg" },
  { name: "Makeup Salon", image: "/bride/bridal_makeup_salon.png" },
];

const grooms = [
  { name: "Sherwani", image: "/groom/Sherwani.avif" },
  { name: "Men's Grooming", image: "/groom/groom.webp" },
  { name: "Men's Accessories", image: "/groom/aceeroes.jpg" },
];

const ServiceCategoriesPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleOnPlusBtn = (title) => {
    setIsActive(!isActive);
    setTitle(title);
  };

  const categories = [
    {
      title: "Wedding Venues",
      description: "Find stunning venues, from grand resorts to cozy gardens!",
      image: "/discover/wedding-venues.png",
      subcategories: weddingVenues,
    },
    {
      title: "Wedding Vendors",
      description:
        "Top-rated professionals to bring your wedding vision to life!",
      image: "/discover/wedding-vendor.png",
      subcategories: weddingVendors,
    },
    {
      title: "Bride",
      description:
        "Bridal wear, beauty, and essentials for your perfect wedding look!",
      image: "/discover/bride.png",
      subcategories: brides,
    },
    {
      title: "Groom",
      description:
        "Stylish suits, grooming, and accessories for the modern groom!",
      image: "/discover/groom.png",
      subcategories: grooms,
    },
    {
      title: "Wedding Services",
      description:
        "Planners, decorators, caterers & more for a seamless wedding!",
      image: "/discover/wedding-services.png",
      subcategories: [
        { name: "Wedding Planners", image: "/weddingservices/planner.webp" },
        { name: "Decorators", image: "/weddingservices/decorator.jpg" },
      ],
    },
    {
      title: "Other Services",
      description:
        "Entertainment, transport, and extras for a flawless celebration!",
      image: "/discover/other.png",
      subcategories: [
        { name: "Live Bands", image: "/otherimages/band.webp" },
        { name: "Luxury Transport", image: "/otherimages/transport.jpeg" },
        { name: "Fireworks & Effects", image: "/otherimages/fireworks.jpeg" },
      ],
    },
  ];

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
    "name": "Wedding Services Categories",
    "description": "Explore comprehensive wedding services including venues, vendors, bridal services, groom essentials, and more.",
    "itemListElement": categories.map((category, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": category.title,
        "description": category.description,
        "image": `https://marriagevendors${category.image}`,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${category.title} Subcategories`,
          "itemListElement": category.subcategories.map((sub, subIndex) => ({
            "@type": "Offer",
            "name": sub.name,
            "image": `https://marriagevendors${sub.image}`
          }))
        }
      }
    }))
  };

  return (
    <div className="w-full flex items-center justify-center">

<Helmet>
        {/* Primary Meta Tags */}
        <title>Wedding Services & Vendors | Marriage Vendors</title>
        <meta name="title" content="Wedding Services & Vendors | Marriage Vendors" />
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
        <meta property="og:title" content="Wedding Services & Vendors | Marriage Vendors" />
        <meta
          property="og:description"
          content="Discover premium wedding services, venues, vendors, bridal & groom essentials. Plan your perfect wedding with trusted professionals and services."
        />
        <meta
          property="og:image"
          content="/"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="/" />
        <meta property="twitter:title" content="Wedding Services & Vendors | Marriage Vendors" />
        <meta
          property="twitter:description"
          content="Discover premium wedding services, venues, vendors, bridal & groom essentials. Plan your perfect wedding with trusted professionals and services."
        />
        <meta
          property="twitter:image"
          content="/"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 py-5 md:py-10">
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
              handleOnPlusBtn={handleOnPlusBtn}
              handleOnCategory={handleOnCategory}
            />

            {/* SubCategory Component Opens Just Below Active Card */}
            {isActive && title === category.title && (
              <div className="absolute left-0  w-full mt-4 bg-white z-10 px-5 md:px-20 ">
                {/* Display Subcategories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-4 py-5 border border-gray-200 rounded-lg shadow-lg">
                  {category.subcategories.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() =>
                        handleOnSubCategoryNavigate(category.title, sub.name)
                      }
                      className="  items-center bg-white rounded-lg p-4 "
                    >
                      <div className="relative w-full h-40 bg-gray-200 rounded-lg mb-3 flex justify-center items-center overflow-hidden cursor-pointer">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="object-cover w-full h-full rounded-lg "
                        />
                        <span className="bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground text-sm font-semibold  px-2 py-1 rounded">
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
