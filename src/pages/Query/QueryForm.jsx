import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { IoIosSend } from "react-icons/io";

const QueryForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className='max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
        <div className= "text-center mb-8 transform transition-all duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-[#f9006c]" />
          </div>
          <h1 className="text-3xl font-bold text-[#f9006c] mb-4">Submit Your Query</h1>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            We're here to help! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-700 border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className='flex justify-between items-center'>
              <div className='w-[40%]'>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 mt-3"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="w-[40%]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500/20 placeholder-gray-400 mt-3"
                  placeholder="Enter Phone No."
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Query <span className="text-red-500">*</span></label>
              <textarea
                value={query}
                onChange={handleQueryChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 h-44 mt-3"
                placeholder="Describe your query in detail..."
                maxLength={500}
                required
              ></textarea>
              <div className="text-right text-gray-500 text-sm">{charCount}/500 Characters</div>
            </div>
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 bg-[#f9006c] hover:scale-[1.02] active:scale-[0.98]"
            >
              <IoIosSend className='text-[26px]'/> Submit Query
            </button>
          </form>
          <div className='flex justify-center items-center p-6 mt-2'>
            <p className="text-gray-500 text-sm w-fit mx-auto text-center">
              All fields marked with <span className="text-red-500">*</span> are required.
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
        </div>
    </div>
  );
};

export default QueryForm;