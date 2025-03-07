import React, { useState , useEffect} from 'react';
import { motion } from "framer-motion";
import { Flame, TrendingUp, Clock, Filter,Sparkles } from 'lucide-react';
import { FaSortAmountDown } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaFreeCodeCamp } from "react-icons/fa6";
import { MdPaid } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GiPartyPopper } from "react-icons/gi";
import CardSection from '../CardSection';
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";

function Card({ tag, pricing }) {
  return (

    <Link to="/preview_2">
    <motion.div
      className="p-4 bg-white shadow-md rounded-lg text-center h-[440px] cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-[340px] browse_image_card mt-4 relative group">
        {/* Premium Badge - Only show if pricing is not "Free" */}
        {pricing !== "Free" && (
          <div
            className="absolute flex items-center justify-start w-[40px] h-[40px] bg-blue-500 text-white 
                      rounded-lg overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[120px] px-2"
          >
            {/* Crown Icon */}
            <FaCrown className="text-white text-[24px] flex-shrink-0" />
            
            {/* Premium Text - Hidden until hover */}
            <span className="ml-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Premium
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-2">
        <div className="text-[20px] text-pink-600 font-bold">Lovique</div>
      </div>
    </motion.div>
  </Link>
  
  );
}

const initialTemplates = [
  { id: 1, pricing: "Free" },
  { id: 2, pricing: "Paid" },
  { id: 3, pricing: "Free" },
  { id: 4, pricing: "Paid" },
  { id: 5, pricing: "Free" },
  { id: 6, pricing: "Paid" },
];

const moreTemplates = [
  { id: 7, pricing: "Free" },
  { id: 8, pricing: "Paid" },
  { id: 9, pricing: "Free" },
  { id: 10, pricing: "Paid" },
  { id: 11, pricing: "Free" },
  { id: 12, pricing: "Paid" },
];

function Review() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [amountCategory, setAmountCategory] = useState('');
  const [category, setCategory] = useState('');
  const [templates, setTemplates] = useState(initialTemplates.slice(0, 3));
  const [loading, setLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(3);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      loadedCount < 12 
    ) {
      setLoading(true);
  
      setTimeout(() => {
        setTemplates((prevTemplates) => {
          const newTemplates = [...prevTemplates, ...moreTemplates.slice(0, 3)];
          return newTemplates.slice(0, 12); 
        });
        setLoadedCount((prevCount) => prevCount + 3);
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const categories = [
    { id: 'hot', name: 'Hot', icon: <Flame className="w-6 h-6" /> },
    { id: 'popular', name: 'Popular', icon: <TrendingUp className="w-6 h-6" /> },
    { id: 'latest', name: 'Latest', icon: <Clock className="w-6 h-6" /> },
  ];
  const amountCategories = [
    { id: 'free', name: 'Free', icon: <FaFreeCodeCamp className="w-6 h-6" /> },
    { id: 'paid', name: 'Paid', icon: <MdPaid className="w-6 h-6" /> },
  ];
  const eventCategories = [
    { id: 'birthday', name: 'Birthday', icon: <LiaBirthdayCakeSolid className="w-6 h-6" /> },
    { id: 'wedding', name: 'Wedding', icon: <TrendingUp className="w-6 h-6" /> },
    { id: 'party', name: 'Party', icon: <GiPartyPopper className="w-6 h-6" /> },
  ];

  
{/*````````````````````````````*/}
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-white ">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-2xl p-6  border-r-2 border-pink-200">
        <div className="space-y-10">
          {/* Filter Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-7 h-7 text-pink-600" />
              <h2 className="text-xl font-bold text-pink-600 tracking-wide">Filter</h2>
            </div>

            {/* All Category */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full text-left px-5 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === 'all'
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
            <div className="flex items-center gap-3 mb-6">
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
            <div className="flex items-center gap-3 mb-6">
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

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-white  shadow-2xl">
        
        {/* Hero Section (Unchanged Structure) */}
        <div className="h-[400px]  bg-gradient-to-r from-pink-100 to-purple-100  rounded-2xl shadow-xl gradient-background">
        <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-yellow-300 mr-2 mt-11" size={24} />
            <span className="text-yellow-300 font-medium mt-11">Premium Templates</span>
          </div>
          <div>
          <motion.div
          className="h-[120px] "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          
          <motion.h1
            className="h-[60px] text-5xl font-bold mb-4 flex justify-center items-end text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Find the Perfect Template for Your Next Event
          </motion.h1>
        </motion.div>
          </div>
          <div className='flex justify-center mt-[-30px]'>
          <p className="text-lg md:text-md text-white mt-0 max-w-4xl relative">
          Browse our collection of professionally designed templates for any occasion. From weddings to 
          </p>
          </div>
          <div className='flex justify-center'><p className="text-lg md:text-md text-white mt-3 max-w-4xl relative">birthdays, we've got you covered with both free and premium options. </p></div>
          <div className='h-[150px] w-[100%] flex justify-center items-center'>
          <div className="w-[40%]">
            <input
              type="text"
              placeholder="Search by category"
              className="w-full px-6 py-4 text-lg rounded-full border-0 bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300 shadow-lg transition-all duration-300 hover:shadow-xl placeholder-gray-400 relative"
            />
          </div>
          <button className="h-[60px] w-[12%] bg-pink-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 ms-6 relative">
            Search
          </button>
        </div>
        </div>
        {/* Placeholder Content */}
        <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-xl flex flex-col items-center py-8">
          <div className=" w-[90%] ">
          <CardSection cards={templates.map((temp) => <Card key={temp.id} pricing={temp.pricing} />)} />

          {loading && (
            <div className="flex flex-wrap justify-evenly py-8">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <motion.div
                    key={index}
                    className="w-[450px] h-[450px] bg-gray-200 animate-pulse rounded-lg shadow-md mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
            </div>
          )}
        </div>
        </div>
      </div>

    </div>
  );
}

export default Review;