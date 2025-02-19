
import { MdDesignServices, MdOutlineAnalytics, MdOutlinePayment } from "react-icons/md";

import { FcServices } from "react-icons/fc";

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
