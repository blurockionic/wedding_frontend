import LandingPage from "../pages/LandingPage";
import WeedingVenues from "../pages/section/WeedingVenues";

import ServicesPage from "../pages/ServicePage";

import PlanningTools from "../pages/section/PlanningTools";
import WeddingVendors from "../pages/section/WeddingVendors";

import Bride from "../pages/section/Bride";
import Blogs from "../pages/section/Blogs";
import Grooms from "../pages/section/Grooms";

const NavbarRoutesConfig = [
  { name: "Home", path: "/", component: LandingPage },
  { name: "WeddingVenues", path: "/wedding-venues", component: WeedingVenues },

  { name: "Services", path: "/services", component: ServicesPage },

  {
    name: "WeddingVendors",
    path: "/wedding-vendors",
    component: WeddingVendors,
  },
  { name: "Brides", path: "/brides", component: Bride },
  { name: "Grooms", path: "/grooms", component: Grooms },
  { name: "Tools", path: "/planning-tools", component: PlanningTools },
  { name: "Blogs", path: "/blogs", component: Blogs },
];

export default NavbarRoutesConfig;


export const serviceTypes = [
  { value: "photography", label: "Photo" },
  { value: "florist", label: "Florist" },
  { value: "music", label: "Music" },
  { value: "decor", label: "Decoration" },
  { value: "catering", label: "Catering" },

];
