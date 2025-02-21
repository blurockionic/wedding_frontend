import { useState } from "react";
import ServiceCategoriesCard from "../../components/servicecatogories/ServiceCatogoriesCard";
// import SubCategory from "../../components/sub-category/SubCategory";
import { useNavigate } from "react-router-dom";
import ServiceList from "../../components/ServiceList";

const weddingVenues = [
  { name: "Wedding Lawns Farmhouse", image: "/public/weddingvenue/weddingfarm.webp" },
  { name: "Hotel", image: "/public/weddingvenue/hotel.jpg" },
  { name: "Banquet Halls", image: "/public/weddingvenue/banquet.jpg" },
  { name: "Marriage Garden", image: "/public/weddingvenue/gardenn.jpg" },
  { name: "Wedding Halls", image: "/public/weddingvenue/hall.avif" },
  { name: "Wedding Resorts", image: "/public/weddingvenue/resort.jpg" },
];

const weddingVendors = [
  { name: "Caterers", image: "/public/weddingvendors/cateres.jpg" },
  { name: "Wedding Invitation", image: "/public/weddingvendors/inviation.jpg" },
  { name: "Wedding Decor", image: "/public/weddingvendors/decoration.jpg" },
  { name: "Wedding Gift", image: "/public/weddingvendors/gift.webp" },
  { name: "Wedding Photographers", image: "/public/weddingvendors/photo.jpg" },
  { name: "Wedding Coordinators", image: "/public/weddingvendors/cordinator.jpg" },
  { name: "Wedding Music", image: "/public/weddingvendors/band.jpeg" },
  { name: "Wedding Videographers", image: "/public/weddingvendors/cateres.jpg" },
  {
    name: "Wedding Transportation",
    image: "/public/weddingvendors/transportt.avif",
  },
  { name: "Wedding House", image: "/public/weddingvendors/house.jpg" },
  { name: "Tent House", image: "/public/weddingvendors/tent.jpeg" },
  { name: "Wedding Entertainment", image: "/public/weddingvendors/game.jpeg" },
  { name: "Florists", image: "/public/weddingvendors/florist.jpeg" },
  { name: "Wedding Planner", image: "/public/weddingvendors/planner.jpeg" },
  { name: "Wedding Decoration", image: "/public/weddingvendors/decoration.jpg" },
  { name: "Wedding Cakes", image: "/public/weddingvendors/cake.jpg" },
  { name: "Wedding Agencies", image: "/public/weddingvendors/cordinator.jpg" },
  { name: "Wedding DJ", image: "/public/weddingvendors/dj.jpg" },
  { name: "Pandit", image: "/public/weddingvendors/pandit.jpeg" },
  { name: "Photobooth", image: "/public/weddingvendors/photobooth.jpg" },
  { name: "Astrologers", image: "/public/weddingvendors/astro.jpg" },
];

const brides = [
  { name: "Bridal Lahenga", image: "/bride/bridal_lengha.png" },
  { name: "Bridal Jewellery", image: "/bride/bridal_jewellery.png" },
  { name: "Bridal Makeup Artist", image: "/bride/bridal_makeup_artists.png" },
  { name: "Mehndi Artist", image: "/bride/mehdi_artist.jpg" },
  { name: "Makeup Salon", image: "/bride/bridal_makeup_salon.png" },
];

const grooms = [
  { name: "Sherwani", image: "/public/groom/Sherwani.avif" },
  { name: "Men's Grooming", image: "/public/groom/groom.webp" },
  { name: "Men's Accessories", image: "/public/groom/Aceeroes.jpg" },
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
        { name: "Wedding Planners", image: "/public/weddingservices/planner.webp" },
        { name: "Decorators", image: "/public/weddingservices/decorator.jpg" },
        { name: "Caterers", image: "/public/weddingservices/caterers.jpg"},
      ],
    },
    {
      title: "Other Services",
      description:
        "Entertainment, transport, and extras for a flawless celebration!",
      image: "/discover/other.png",
      subcategories: [
        { name: "Live Bands", image: "/public/otherimages/band.webp" },
        { name: "Luxury Transport", image: "/public/otherimages/transport.jpeg" },
        { name: "Fireworks & Effects", image: "/public/otherimages/fireworks.jpeg" },
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
