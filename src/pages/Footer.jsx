import "aos/dist/aos.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import brandlogo from "../../public/logo/brandlogo.png";
import { brides, grooms, weddingVendors, weddingVenues } from "../static/static";

export default function Footer() {
  // useEffect(() => {
  //   Aos.init({
  //     duration: 1000, // Duration of the animation
  //   });
  // }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Wedding Venues */}
          <div>
            <h2 className="text-lg font-semibold text-white">Wedding Venues</h2>
            <ul className="mt-4 space-y-2">
              {weddingVenues.map((item, index) => (
                <li key={index}>
                  <Link to={`/services?search=${item}&location=`} className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wedding Vendors */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-white">Wedding Vendors</h2>
            <ul className="mt-4 grid grid-cols-2 gap-4">
              {weddingVendors.map((item, index) => (
                <li key={index}>
                  <Link to={`/services?search=${item}&location=`} className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brides */}
          <div>
            <h2 className="text-lg font-semibold text-white">Brides</h2>
            <ul className="mt-4 space-y-2">
              {brides.map((item, index) => (
                <li key={index}>
                  <Link to={`/services?search=${item}&location=`} className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Grooms */}
          <div>
            <h2 className="text-lg font-semibold text-white">Grooms</h2>
            <ul className="mt-4 space-y-2">
              {grooms.map((item, index) => (
                <li key={index}>
                  <Link to={`/services?search=${item}&location=`} className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-10 w-50 mx-auto"></div>

      <div className="max-w-7xl mt-10 mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logo and Description */}
        {/* data-aos="fade-up" data-aos-delay="200" */}
        <div  className="space-y-3">
          <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
            <img src={brandlogo} alt="brandlogo" className="w-10 h-10" />
            <div className="flex flex-col justify-start">
              <span className="text-primary text-2xl">Marriage Vendors</span>
              <span className="text-primary text-xs">Wedding Organiser</span>
            </div>
          </NavLink>
          <p className="text-sm">
          Discover trusted wedding vendors for every need at Marriage Vendors! From stunning venues to photographers, caterers, and more, find everything to plan your perfect day. Compare services, read reviews, and book with confidence. Start creating your dream wedding today!
          </p>
          {/* Social Media Links */}
          <div className="flex gap-6 mt-4 text-xl text-gray-600">
            <a
              href="https://www.facebook.com/profile.php?id=61572736825039"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/MarriageVendors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/marriagevendors/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/channel/UCflLelgupPqW0kkKpJdACpA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/company/marriagevendors/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin"
            >
              <FaLinkedin />
            </a>
          </div>
          <div className="text-left mt-4">
        <span className="text-sm text-gray-500">
          Powered by  
          <a
            href="https://www.blurockionic.com/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 font-medium hover:underline ml-1 transition duration-200"
          >
            BluRock Ionic
          </a>
        </span>
      </div>
        </div>

        {/* Menu Links */}
        {/* data-aos="fade-up" data-aos-delay="400" */}
        <div >
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
              <Link to="/contactus" className="hover:text-gray-600">
                Contact us
              </Link>
            </li>
            <li>
            <a href="/privacypolicy.html" className="hover:text-gray-400">
              Privacy 
            </a>
          </li>
          <li>
            <a href="/terms.html" className="hover:text-gray-600">
              Terms
            </a>
          </li>
          </ul>
        </div>
        

        {/* Services Links */}
        {/* <div data-aos="fade-up" data-aos-delay="600">
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
        </div> */}

        {/* Google Maps Embed */}
        {/* data-aos="fade-up" data-aos-delay="800" */}
        <div >
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
