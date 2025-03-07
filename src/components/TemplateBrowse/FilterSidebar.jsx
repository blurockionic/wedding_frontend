import React from "react";

import { Filter, TrendingUp, Flame, Clock } from "lucide-react";
import { FaSortAmountDown, FaFreeCodeCamp, FaRupeeSign } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { GiBigDiamondRing, GiPartyPopper } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

function FilterSidebar({ setActiveCategory, setAmountCategory, setCategory, activeCategory, amountCategory, category }) {
  

  const categories = [
      { id: 'hot', name: 'Hot', icon: <Flame className="w-6 h-6" /> },
      { id: 'popular', name: 'Popular', icon: <TrendingUp className="w-6 h-6" /> },
      { id: 'latest', name: 'Latest', icon: <Clock className="w-6 h-6" /> },
    ];
    const amountCategories = [
      { id: 'free', name: 'Free', icon: <FaFreeCodeCamp className="w-6 h-6" /> },
      { id: 'paid', name: 'Paid', icon: <FaRupeeSign className="w-5 h-5" /> },
    ];
    const eventCategories = [
      { id: 'birthday', name: 'Birthday', icon: <LiaBirthdayCakeSolid className="w-6 h-6" /> },
      { id: 'wedding', name: 'Wedding', icon: <GiBigDiamondRing className="w-6 h-6" /> },
      { id: 'party', name: 'Party', icon: <GiPartyPopper className="w-6 h-6" /> },
    ];

  return (
    <div className="lg:w-72 bg-white shadow-2xl p-6 border-r-2 border-pink-200 flex lg:flex-col overflow-x-auto lg:overflow-visible">
            <div className="hidden lg:flex-col space-x-4 lg:space-x-0 lg:block">
            
              {/* Filter Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Filter className="w-7 h-7 text-pink-600" />
                  <h2 className="text-xl font-bold text-pink-600 tracking-wide ">Filter</h2>
                </div>
    
                {/* All Category */}
                <button
                  onClick={() => setAmountCategory('')}
                  className={`w-full text-left px-5 py-3 rounded-full font-semibold transition-all duration-300 ${
                      setAmountCategory=== ''
                      ? 'bg-pink-100 text-pink-700 shadow-lg'
                      : 'text-gray-800 hover:bg-pink-50 hover:shadow-md'
                  }`}
                >
                  All
                </button>
                {/* Category List */}
                <div className="space-y-3 mt-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-4 px-5 py-3 rounded-full font-semibold transition-all duration-300 ${
                        activeCategory === cat.id
                          ? 'bg-pink-100 text-pink-700 shadow-lg'
                          : 'text-gray-800 hover:bg-pink-50 hover:shadow-md'
                      }`}
                    >
                      <span className="text-pink-600">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Amount Section */}
              <div>
                <div className="flex items-center gap-3 mb-6 mt-6">
                  <FaSortAmountDown className="w-7 h-7 text-pink-600" />
                  <h2 className="text-xl font-bold text-pink-600 tracking-wide">Amount</h2>
                </div>
                <div className="space-y-3">
                  {amountCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setAmountCategory(cat.id)}
                      className={`w-full flex items-center gap-4 px-5 py-3 rounded-full font-semibold transition-all duration-300 ${
                        amountCategory === cat.id
                          ? 'bg-pink-100 text-pink-700 shadow-lg'
                          : 'text-gray-800 hover:bg-pink-50 hover:shadow-md'
                      }`}
                    >
                      <span className="text-pink-600">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Event Category Section */}
              <div>
                <div className="flex items-center gap-3 mb-6 mt-6">
                  <BiCategory className="w-7 h-7 text-pink-600" />
                  <h2 className="text-xl font-bold text-pink-600 tracking-wide">Category</h2>
                </div>
                <div className="space-y-3">
                  {eventCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`w-full flex items-center gap-4 px-5 py-3 rounded-full font-semibold transition-all duration-300 ${
                        category === cat.id
                          ? 'bg-pink-100 text-pink-700 shadow-lg'
                          : 'text-gray-800 hover:bg-pink-50 hover:shadow-md'
                      }`}
                    >
                      <span className="text-pink-600">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
          </div>
          </div>
  );
}

export default FilterSidebar;
