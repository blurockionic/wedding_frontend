import React from 'react'
import { FaCrown } from 'react-icons/fa'

const WatchHistoryCard = ({ template, onClick }) => {
  return (
    <div
       className="border shadow-md cursor-pointer hover:shadow-lg transition-shadow relative group rounded-lg h-[70%] overflow-hidden"
       onClick={() => onClick(template)}
     >
       {template.categoryByAmount === "PAID" && (
         <div className="absolute flex items-center justify-start w-[22px] h-[20px] bg-primary text-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[100px] px-1 top-2 left-2 z-10">
           <FaCrown className="text-white text-[14px] flex-shrink-0" />
           <span className="ml-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             Premium
           </span>
         </div>
       )}
   
       <img
         src={template.thumbnailUrl}
         alt={template.name || "Template Thumbnail"}
         loading="lazy"
         className="w-full h-[300px] object-fill"
       />
   
       {/* Overlay with black background and white text */}
       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-800  text-white p-4 rounded-b-lg">
         <h3 className="font-semibold text-xs">{template.name}</h3>
         <p className="text-md">₹{template.price || "Free"}</p>
       </div>
     </div>
  )
}

export default WatchHistoryCard
