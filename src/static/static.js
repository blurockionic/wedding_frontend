
import { MdDesignServices, MdOutlineAnalytics, MdOutlinePayment } from "react-icons/md";
import img1 from "../../public/heroSection/c1.jpeg"
import img2 from "../../public/heroSection/c2.jpeg"
import img3 from "../../public/heroSection/c3.jpeg"
import img4 from "../../public/heroSection/c4.jpeg"
import img5 from "../../public/heroSection/c5.jpeg"
import img6 from "../../public/heroSection/c6.jpeg"



export const sectorTypes = [
  "Wedding Venue",
  "Wedding Vendor",
  "Bride",
  "Groom",
];

export const weddingVenues = [
  "Wedding Lawns Farmhouse",
  "Hotel",
  "Banquet Halls",
  "Marriage Garden",
  "Wedding Halls",
  "Wedding Resorts",
];

export const weddingVendors = [
  "Caterers",
  "Wedding Invitation",
  "Wedding Decor",
  "Wedding Gift",
  "Wedding Photographers",
  "Wedding Coordinators",
  "Wedding Music",
  "Wedding Videographers",
  "Wedding Transportation",
  "Wedding House",
  "Tent House",
  "Wedding Entertainment",
  "Florists",
  "Wedding Planner",
  "Wedding Decoration",
  "Wedding Cakes",
  "Wedding Agencies",
  "Wedding DJ",
  "Pandit",
  "Photobooth",
  "Astrologers",
  "Invitation"
];
export const brides = [
  "Bridal Lahenga",
  "Bridal Jewellery",
  "Bridal Makeup Artist",
  "Mehndi Artist",
  "Makeup Salon",
];
export const grooms = ["Sherwani", "Men's Grooming", "Men's Accessories"];

export const links = [
  { label: "Dashboard", href: "analytics", icon: MdOutlineAnalytics },
  { label: "Services", href: "", icon:  MdDesignServices },
  { label: "Payment", href: "bookings", icon:MdOutlinePayment },
];



export const servicesUnit = {
  "Wedding Lawns Farmhouse": ["Per Day", "Per Event"],
  "Hotel": ["Per Day", "Per Room", "Per Booking"],
  "Banquet Halls": ["Per Event", "Per Hour"],
  "Marriage Garden": ["Per Day", "Per Event"],
  "Wedding Halls": ["Per Day", "Per Booking"],
  "Wedding Resorts": ["Per Day", "Per Room", "Per Package"],

  "Caterers": ["Per Plate", "Per Guest", "Package Pricing"],
  "Wedding Invitation": ["Per Design", "Per Order"],
  "Wedding Decor": ["Per Event", "Custom Quote"],
  "Wedding Gift": ["Per Item", "Bulk Order Pricing"],
  "Wedding Photographers": ["Per Day", "Per Hour", "Full Package"],
  "Wedding Coordinators": ["Per Event", "Fixed Fee"],
  "Wedding Music": ["Per Hour", "Per Event"],
  "Wedding Videographers": ["Per Day", "Per Hour", "Package Pricing"],
  "Wedding Transportation": ["Per Hour", "Per Day", "Per Trip"],
  "Wedding House": ["Per Day", "Per Booking"],
  "Tent House": ["Per Event", "Per Square Foot"],
  "Wedding Entertainment": ["Per Hour", "Per Event"],
  "Florists": ["Per Arrangement", "Per Event"],
  "Wedding Planner": ["Fixed Fee", "Percentage of Budget"],
  "Wedding Decoration": ["Per Event", "Custom Quote"],
  "Wedding Cakes": ["Per Kg", "Per Cake"],
  "Wedding Agencies": ["Per Event", "Fixed Fee"],
  "Wedding DJ": ["Per Hour", "Per Event"],
  "Pandit": ["Per Ceremony", "Per Hour"],
  "Photobooth": ["Per Hour", "Per Event"],
  "Astrologers": ["Per Consultation", "Per Package"],

  "Bridal Lahenga": ["Per Outfit", "Per Rental Period"],
  "Bridal Jewellery": ["Per Set", "Per Day (Rental)"],
  "Bridal Makeup Artist": ["Per Person", "Bridal Package"],
  "Mehndi Artist": ["Per Hand", "Per Hour"],
  "Makeup Salon": ["Per Session", "Bridal Package"],

  "Sherwani": ["Per Outfit", "Per Rental Period"],
  "Men's Grooming": ["Per Session", "Groom Package"],
  "Men's Accessories": ["Per Item", "Per Set"],
};


export const allCategories = {
  "Wedding Venue": (weddingVenues || []).map((venue) => venue?.name || venue),
  "Wedding Vendor": (weddingVendors || []).map((vendor) => vendor?.name || vendor),
  "Bride": (brides || []).map((bride) => bride?.name || bride),
  "Groom":(grooms || []).map((groom) => groom?.name || groom),
};




// ===========================================================================================================



 export const weddingVenuesWithImage = [
  { name: "Wedding Lawns Farmhouse", image: "/weddingvenue/weddingfarm.webp" },
  { name: "Hotel", image: "/weddingvenue/hotel.jpg" },
  { name: "Banquet Halls", image: "/weddingvenue/banquet.jpg" },
  { name: "Marriage Garden", image: "/weddingvenue/gardenn.jpg" },
  { name: "Wedding Halls", image: "/weddingvenue/hall.avif" },
  { name: "Wedding Resorts", image: "/weddingvenue/resort.jpg" },
];

export const weddingVendorsWithImage = [
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

export const bridesWithImage = [
  { name: "Bridal Lahenga", image: "/bride/bridal_lengha.png" },
  { name: "Bridal Jewellery", image: "/bride/bridal_jewellery.png" },
  { name: "Bridal Makeup Artist", image: "/bride/bridal_makeup_artists.png" },
  { name: "Mehndi Artist", image: "/bride/mehdi_artist.jpg" },
  { name: "Makeup Salon", image: "/bride/bridal_makeup_salon.png" },
];

export const groomsWithImage = [
  { name: "Sherwani", image: "/groom/Sherwani.avif" },
  { name: "Men's Grooming", image: "/groom/groom.webp" },
  { name: "Men's Accessories", image: "/groom/aceeroes.jpg" },
];


export const categories = [
    {
      title: "Wedding Venues",
      description: "Find stunning venues, from grand resorts to cozy gardens!",
      image: "/discover/wedding-venues.png",
      subcategories: weddingVenuesWithImage,
    },
    {
      title: "Wedding Vendors",
      description:
        "Top-rated professionals to bring your wedding vision to life!",
      image: "/discover/wedding-vendor.png",
      subcategories: weddingVendorsWithImage,
    },
    {
      title: "Bride",
      description:
        "Bridal wear, beauty, and essentials for your perfect wedding look!",
      image: "/discover/bride.png",
      subcategories: bridesWithImage,
    },
    {
      title: "Groom",
      description:
        "Stylish suits, grooming, and accessories for the modern groom!",
      image: "/discover/groom.png",
      subcategories: groomsWithImage,
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

  export {img1,img2,img3,img4,img5,img6}