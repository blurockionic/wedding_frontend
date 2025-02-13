import { useState } from "react";
import ServiceCategoriesCard from "../../components/servicecatogories/ServiceCatogoriesCard";
// import SubCategory from "../../components/sub-category/SubCategory";
import { useNavigate } from "react-router-dom";
import ServiceList from "../../components/ServiceList";

const weddingVenues = [
  { name: "Wedding Lawns Farmhouse", image: "/images/wedding-lawns.png" },
  { name: "Hotel", image: "/images/hotel.png" },
  { name: "Banquet Halls", image: "/images/banquet-halls.png" },
  { name: "Marriage Garden", image: "/images/marriage-garden.png" },
  { name: "Wedding Halls", image: "/images/wedding-halls.png" },
  { name: "Wedding Resorts", image: "/images/wedding-resorts.png" },
];

const weddingVendors = [
  { name: "Caterers", image: "/images/caterers.png" },
  { name: "Wedding Invitation", image: "/images/wedding-invitation.png" },
  { name: "Wedding Decor", image: "/images/wedding-decor.png" },
  { name: "Wedding Gift", image: "/images/wedding-gift.png" },
  { name: "Wedding Photographers", image: "/images/wedding-photographers.png" },
  { name: "Wedding Coordinators", image: "/images/wedding-coordinators.png" },
  { name: "Wedding Music", image: "/images/wedding-music.png" },
  { name: "Wedding Videographers", image: "/images/wedding-videographers.png" },
  {
    name: "Wedding Transportation",
    image: "/images/wedding-transportation.png",
  },
  { name: "Wedding House", image: "/images/wedding-house.png" },
  { name: "Tent House", image: "/images/tent-house.png" },
  { name: "Wedding Entertainment", image: "/images/wedding-entertainment.png" },
  { name: "Florists", image: "/images/florists.png" },
  { name: "Wedding Planner", image: "/images/wedding-planner.png" },
  { name: "Wedding Decoration", image: "/images/wedding-decoration.png" },
  { name: "Wedding Cakes", image: "/images/wedding-cakes.png" },
  { name: "Wedding Agencies", image: "/images/wedding-agencies.png" },
  { name: "Wedding DJ", image: "/images/wedding-dj.png" },
  { name: "Pandit", image: "/images/pandit.png" },
  { name: "Photobooth", image: "/images/photobooth.png" },
  { name: "Astrologers", image: "/images/astrologers.png" },
];

const brides = [
  { name: "Bridal Lahenga", image: "/images/bridal-lahenga.png" },
  { name: "Bridal Jewellery", image: "/images/bridal-jewellery.png" },
  { name: "Bridal Makeup Artist", image: "/images/bridal-makeup.png" },
  { name: "Mehndi Artist", image: "/images/mehndi-artist.png" },
  { name: "Makeup Salon", image: "/images/makeup-salon.png" },
];

const grooms = [
  { name: "Sherwani", image: "/images/sherwani.png" },
  { name: "Men's Grooming", image: "/images/mens-grooming.png" },
  { name: "Men's Accessories", image: "/images/mens-accessories.png" },
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
        { name: "Wedding Planners", image: "/images/wedding-planners.png" },
        { name: "Decorators", image: "/images/decorators.png" },
        { name: "Caterers", image: "/images/caterers.png" },
      ],
    },
    {
      title: "Other Services",
      description:
        "Entertainment, transport, and extras for a flawless celebration!",
      image: "/discover/other.png",
      subcategories: [
        { name: "Live Bands", image: "/images/live-bands.png" },
        { name: "Luxury Transport", image: "/images/luxury-transport.png" },
        { name: "Fireworks & Effects", image: "/images/fireworks.png" },
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

  return (
    <div className="w-full flex items-center justify-center">
    
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 px-4 py-5 border border-gray-200 rounded-lg shadow-lg">
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
                          className="object-cover w-full h-full rounded-lg blur-sm"
                        />
                        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground text-sm font-semibold  px-2 py-1 rounded">
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
