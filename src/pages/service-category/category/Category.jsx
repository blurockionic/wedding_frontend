import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../../Footer";
import ServiceCard from "../component/ServiceCard";
import { brides, grooms, weddingVendors, weddingVenues } from "../../../static/static";

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();

 

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







  // Sample top venues by state
  const topVenues = {
    jharkhand: [
      "Ranchi Lawn",
      "Hazaribagh Farmhouse",
      "Jamshedpur Banquet Hall",
    ],
    maharashtra: [
      "Mumbai Grand Hotel",
      "Pune Club Lawn",
      "Nagpur Wedding Resort",
    ],
    delhi: ["Taj Delhi", "Leela Palace", "The Imperial Banquet"],
    karnataka: [
      "Bangalore Garden Lawn",
      "Mysore Wedding Hall",
      "Coorg Farmhouse",
    ],
  };

  // Handle state selection
  const handleStateClick = (state) => {
    navigate(
      `/all/${category}/${state}`
    );
  };

  // key_id = rzp_live_xNk4evjTjQGwAn

  // secret_id=gWO3zY8HcMw1sQrtAVklYBt0

  // filter the data according to the selected category and location
  const filteredData = categories.filter((item) => item.title === category)[0];
  console.log(filteredData)
  return (
    <>
      {/* navigation */}
      <span className="px-16 text-sm"><Link to={`/all`}>Wedding</Link> &gt; <Link to={`/all/${category}`}>{category}</Link>  </span>
      <h1 className="px-16 text-2xl font-semibold">{category}</h1>
     
      {/* Horizontal Scroll for States */}
      <div className="px-16 py-4">
        <h2 className="text-xl font-semibold">{`Select ${category} by category `}</h2>
      </div>

      <div className="px-16  mt-4 overflow-x-auto whitespace-nowrap flex gap-4 py-2 scrollbar-hide">
        {filteredData.subcategories.map((subCategory) => (
          <>
            <div className="flex flex-col items-center gap-2">
              <span className="w-40 h-40 bg-gray-50 rounded-full shadow-md"></span>
              <p
                key={subCategory}
                onClick={() => handleStateClick(subCategory)}
                // className={`px-4 py-2 rounded-full transition ${
                //   selectedCategory
                //     ? "bg-gray-200 hover:bg-blue-500 hover:text-white"
                //     : "bg-gray-300 cursor-not-allowed"
                // }`}
                className={`px-4 py-2 text-md rounded-full transition cursor-pointer`}
                // disabled={!selectedCategory}
              >
                {subCategory}
              </p>
              <span className="text-xs">{`1223 ${category}`}</span>
            </div>
          </>
        ))}
      </div>

      {/* Top Venues by Selected State */}

      <div className="mt-6 px-16 py-4">
        <h2 className="text-xl font-semibold">{`Top ${category} in Delhi`}</h2>
        <ul className="mt-2 space-y-2 flex items-center gap-2">
          {topVenues.delhi.map((venue, index) => (
            <li key={index} className=" p-2 rounded-lg">
              
              <ServiceCard image={""} title={venue} rate={"20002"} rating={2.5}/>
              
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 px-16 py-4">
        <h2 className="text-xl font-semibold">{`Top ${category} in Karnataka`}</h2>
        <ul className="mt-2 space-y-2 flex itesm-center gap-2">
          {topVenues.maharashtra.map((venue, index) => (
            <li key={index} className=" p-2 rounded-lg">
              <ServiceCard image={""} title={venue} rate={"20002"} rating={2.5}/>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 px-16 py-4">
        <h2 className="text-xl font-semibold">{`Top ${category} in Tamilnadu`}</h2>
        <ul className="mt-2 space-y-2 flex items-center gap-2">
          {topVenues.karnataka.map((venue, index) => (
            <li key={index} className=" p-2 rounded-lg">
              <ServiceCard image={""} title={venue} rate={"20002"} rating={2.5}/>
            </li>
          ))}
        </ul>
      </div>

      <Footer/>
    </>
  );
};

export default Category;
