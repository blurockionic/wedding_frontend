import React from 'react'
import Footer from '../Footer';
import { FaEnvelope, FaHeadset, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import signup_bg from "../../../public/signup/sign-bg.jpg";

const ContactUs = () => {
    const navigate = useNavigate()

  return (
    <div>
      {/* sign up  */}
            <div
              className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${signup_bg})` }}
            >
              {/* Overlay with backdrop blur */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
              {/* Content on top of the image */}
              <div className="relative z-10 text-center text-white px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Get in touch
                </h2>
                <p className="text-lg md:text-xl mb-6">
                Want to get in touch? We&apos;d love to hear from you. Here&apos;s how you can reach us.
                </p>
                {/* <button
                  onClick={() => {
                    navigate("/vendorSignup");
                  }}
                  className="bg-primary hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300"
                >
                  Sign Up
                </button> */}
              </div>
            </div>
      
            {/* vendor support  */}
            <div className="bg-gradient-to-br from-white via-yellow-50 to-pink-100 py-12 px-16">
              {/* Overlay with backdrop blur */}
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Dedicated Customer Support
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We&apos;re here to assist you at every step of your journey. Connect
                  with us for personalized support and solutions.
                </p>
      
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 ">
                  {/* Support Option 1 */}
                  <div
                    className="flex flex-col items-center 
                bg-transparent backdrop-blur-lg
                border border-ring p-6 rounded-lg shadow-lg"
                  >
                    <FaHeadset className="text-blue-500 text-4xl mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800">Live Chat</h3>
                    <p className="text-gray-600">
                      Chat with our support team for instant help.
                    </p>
                  </div>
      
                  {/* Support Option 2 */}
                  <div className="flex flex-col items-center border border-ring p-6 rounded-lg shadow-lg">
                    <FaEnvelope className="text-green-500 text-4xl mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Email Support
                    </h3>
                    <p className="text-gray-600">
                      Reach us at support@blurockionic.com for detailed inquiries.
                    </p>
                  </div>
      
                  {/* Support Option 3 */}
                  <div className="flex flex-col items-center border border-ring p-6 rounded-lg shadow-lg">
                    <FaPhone className="text-purple-500 text-4xl mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">
                      Get direct support at +91-6200932331.
                    </p>
                  </div>
                </div>
      
                {/* Contact Support Button */}
                <button className="border border-ring hover:bg-pink-600 text-foreground hover:text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300">
                  Contact Support
                </button>
              </div>
            </div>
      
            {/* //footer  */}
            <Footer />
    </div>
  )
}

export default ContactUs
