import React from "react";
import {
  Diamond,
  Users,
  Camera,
  Utensils,
  Building2,
  Brush,
  Music,
  Gift,
  ScrollText,
  Car,
  PartyPopper,
  Hand,
} from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";
import CompleteSolution from "../ads/CompleteSolution";

const weddingCategories = [
//   { name: "Bridal Wear", icon: <Diamond size={24} /> },
//   { name: "Groom Wear", icon: <Users size={24} /> },
{ name: "Caterering services", icon: <Utensils size={24} />, link: "/all/Wedding Vendor/caterers"},
  { name: "Wedding Photographers", icon: <Camera size={24}/>, link: "/all/Wedding Vendor/Wedding Photographers" },
//   { name: "Venues & Banquets", icon: <Building2 size={24} /> },
  { name: "Makeup & Hair", icon: <Brush size={24} />, link: "/all/bride/Makeup Salon"},
  { name: "Entertainment & DJs", icon: <Music size={24} />, link: "/all/Wedding vendor/Wedding Entertainment" },
  { name: "Gifts & Favors", icon: <Gift size={24} /> ,link: "/all/Wedding vendor/Wedding Gift" },
  { name: "Wedding Invitations", icon: <ScrollText size={24} />,link: "/all/Wedding vendor/Wedding Invitation" },
  { name: "Transportation Services", icon: <Car size={24} /> ,link: "/all/Wedding vendor/Wedding Entertainment" },
  { name: "Wedding Planners", icon: <PartyPopper size={24} /> ,link: "/all/Wedding vendor/Wedding planner"},
  { name: "Mehendi Artists", icon: <Hand size={24} />,link: "/all/bride/Mehndi Artist" },
];

const BrowseSuggestion = () => {
    const navigate = useNavigate()

    // handle to navigate 
    const handleNavigate = (link)=>{
        navigate(`${link}`)
    }
  return (
    <div className="py-10 px-4 md:px-16 mb-10">
      <h2 className="capitalize text-2xl md:text-3xl font-semibold text-gray-800 text-start mb-6 px-5 ">
        Popular search 
      </h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide  p-4  md:mx-4">
          {weddingCategories.map((category, index) => (
            <div
              key={index + 1}
              onClick={()=>handleNavigate(category.link)}
              className="flex flex-col items-center justify-center min-w-[200px] p-4 bg-white rounded-lg  hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer border "
            >
              <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                {category.icon}
              </div>
              <p className="mt-2 text-gray-700 font-medium text-sm text-center">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseSuggestion;
