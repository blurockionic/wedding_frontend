import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import brandlogo from "../../public/logo/brandlogo.png";

export default function Footer() {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Duration of the animation
    });
  }, []);

  return (
    <footer className="bg-gray-100 p-8 text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div data-aos="fade-up" data-aos-delay="200" className="space-y-3">
          <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
            <img src={brandlogo} alt="brandlogo" className="w-10 h-10" />
            <div className="flex flex-col justify-start">
              <span className="text-primary text-2xl">Marriage Vendors</span>
              <span className="text-primary text-xs">Wedding Orgniser</span>
            </div>
          </NavLink>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus
            placerat velit.
          </p>
          {/* Social Media Links */}
          <div className="flex gap-6 mt-4 text-xl text-gray-600">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Menu Links */}
        <div data-aos="fade-up" data-aos-delay="400">
          <h3 className="font-bold text-lg mb-4">Menu</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-600">
                About us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-600">
                Services
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-gray-600">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div data-aos="fade-up" data-aos-delay="600">
          <h3 className="font-bold text-lg mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/wedding-plan" className="hover:text-gray-600">
                Wedding Plan
              </Link>
            </li>
            <li>
              <Link to="/photography" className="hover:text-gray-600">
                Photography
              </Link>
            </li>
            <li>
              <Link to="/decoration" className="hover:text-gray-600">
                Decoration
              </Link>
            </li>
            <li>
              <Link to="/invitation" className="hover:text-gray-600">
                Invitation
              </Link>
            </li>
            <li>
              <Link to="/catering" className="hover:text-gray-600">
                Catering
              </Link>
            </li>
          </ul>
        </div>

        {/* Google Maps Embed */}
        <div data-aos="fade-up" data-aos-delay="800">
          <div className="w-full h-full overflow-hidden shadow">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.90639475212!2d75.81029097521295!3d30.917240474495827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a810423f72b61%3A0x6dc83aeace8a2e30!2zQmx1Um9jayDCru-4jyBXZWFsdGg!5e0!3m2!1sen!2sin!4v1733809148236!5m2!1sen!2sin"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
}
