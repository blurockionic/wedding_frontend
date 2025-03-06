import LandingPage from "../pages/LandingPage";

const NavbarRoutesConfig = [
  { name: "Home", path: "/", component: LandingPage },
];

export default NavbarRoutesConfig;
export const serviceTypes = [
  { value: "photography", label: "Photo" },
  { value: "florist", label: "Florist" },
  { value: "music", label: "Music" },
  { value: "decor", label: "Decoration" },
  { value: "catering", label: "Catering" },
];
