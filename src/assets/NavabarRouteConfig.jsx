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
