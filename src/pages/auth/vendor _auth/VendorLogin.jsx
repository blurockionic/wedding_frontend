import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoMail, GoLock } from "react-icons/go";
import { useVendorLoginMutation } from "../../../redux/vendorSlice";
import { login } from "../../../redux/authSlice";
import CustomText from "../../../components/global/text/CustomText";
import { InputField } from "../../../components/global/inputfield/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../../../components/global/inputfield/PasswordField";
import useProtectAfterLogin from "../../../hooks/useProtectAfterLogin";
import Footer from "../../Footer";
import ServiceTypeCard from "../../../components/global/card/ServiceTypeCard";
import { MdEventAvailable, MdOutlinePersonAddAlt } from "react-icons/md";
import { Helmet } from "react-helmet";
import {
  FaEnvelope,
  FaFemale,
  FaHeadset,
  FaMale,
  FaMapMarkerAlt,
  FaPhone,
  FaStore,
} from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BiAnalyse } from "react-icons/bi";
import signup_bg from "../../../../public/signup/sign-bg.webp";
import brandlogo from "../../../../public/logo/brandlogo.png";
import { Loader2 } from "lucide-react";

const vendorLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export default function VendorLogin() {
  useProtectAfterLogin(["vendor"], "/VendorDashboard");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [vendorLoginMutation] = useVendorLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" }, zodResolver(vendorLoginSchema));

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const result = await vendorLoginMutation({ email, password }).unwrap();

      if (result.vendor) {
        dispatch(login(result.vendor));
        reset();
        toast.success("Vendor login successful!");
        navigate("/vendorDashboard", { replace: true });
      }
    } catch (error) {
      toast.error(error.data?.message || "An unexpected error occurred.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>
          Vendor Login - Marriage Vendors | Manage Your Wedding Services
        </title>
        <meta
          name="description"
          content="Login to your Marriage Vendors account to showcase your wedding services, connect with engaged couples, and grow your business effortlessly."
        />
        <meta
          name="keywords"
          content="vendor login, wedding vendor login, marriage vendors, wedding business, book more weddings, vendor dashboard"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vendor Login - Marriage Vendors" />
        <meta
          property="og:description"
          content="Login to showcase your wedding services and connect with engaged couples."
        />
        <meta
          property="og:image"
          content="https://www.marriagevendors.com/assets/login-DWbP2E5R.jpg"
        />
        <meta
          property="og:url"
          content="https://www.marriagevendors.com/vendorLogin"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Marriage Vendors",
            url: "https://www.marriagevendors.com/vendorLogin",
            logo: "https://www.marriagevendors.com/assets/login-DWbP2E5R.jpg",
            description:
              "Marriage Vendors helps wedding professionals connect with engaged couples and grow their businesses.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-6200932331",
              contactType: "customer support",
            },
          })}
        </script>
      </Helmet>

      <div className="h-screen bg-gradient-to-b from-yellow-100  to-pink-100">
        <div className="flex justify-center items-center cusrsor-pointer py-4 ">
          <NavLink
            to="/"
            className="flex flex-col items-center gap-3 cursor-pointer mt-10"
          >
            <img src={brandlogo} alt="brandlogo" className="w-16 h-16" />
            <div className="flex flex-col justify-start">
              <span className="text-primary text-3xl">Marriage Vendors</span>
              {/* <span className="text-primary text-xs">Wedding Organiser</span> */}
            </div>
          </NavLink>
        </div>
        <div className="min-h-1/2  grid grid-cols-1 md:grid-cols-2 px-5 sm:px-10 md:px-16 lg:px-20 py-10 gap-10 ">
          <div className="space-y-12 md:space-y-24">
            <div className="space-y-5">
              <h1
                className="text-primary 
        text-3xl md:text-5xl lg:text-6xl
        font-thin
        "
              >
                Discover the smarter way to connect with couples
              </h1>
              <ul className="space-y-2 texl-md sm:text-lg md:text-xl">
                <li className="flex items-center justify-start">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="font-thin">
                    Showcase your <strong>services</strong> on our site!
                  </span>
                </li>
                <li className="flex items-center justify-start">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="font-thin">
                    Connect with Local Couples <strong>Ready to Book</strong>
                  </span>
                </li>
                <li className="flex items-center justify-start">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="font-thin">
                    Join a Network of Over <strong>+100</strong> Trusted
                    Professionals
                  </span>
                </li>
              </ul>
            </div>

            {/* <Link to="/services" className="mt-4 block">
          <CustomButton
            text="Create your free service"
            className="border border-ring px-5 py-3 text-primary"
          />
        </Link> */}
          </div>
          {/* vendor login  */}
          <div className="flex items-center justify-center md:mt-3">
            <div
              className="w-full 
      sm:w-96 sm:bg-card bg-transparent
       sm:shadow-custom 
      rounded-lg sm:px-8 px-4 py-10 
      space-y-6"
            >
              <div>
                <CustomText
                  variant="heading"
                  className="text-3xl font-semibold mb-1  text-primary-foreground"
                >
                  Vendor Login
                </CustomText>
                {/* <CustomText
                  variant="paragraph"
                  className="text-sm text-muted-foreground"
                >
                  Enter your credentials to access the vendor portal
                </CustomText> */}
              </div>

              <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                <InputField
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  icon={<GoMail size={19} className="text-primary" />}
                  register={() => register("email", { required: "Email is required" })} 
                  id="email"
                  error={errors.email}
                />

                <PasswordField
                  icon={<GoLock size={19} className="text-primary" />}
                  type={isShowPassword ? "text" : "password"}
                  isShow={isShowPassword}
                  setIsShow={setIsShowPassword}
                  id="password"
                  register={() => register("password", { required: "Password is required" })} 
                  label="Enter your password"
                  error={errors.password}
                />

                <Link
                  to="/vendor-forgot-password"
                  className="text-sm text-muted-foreground hover:underline block text-end"
                >
                  Forgot Password?
                </Link>

                <button
                  type="submit"
                  disabled={loading || !isValid}
                  className={`w-full ${
                    loading ? "bg-muted" : "bg-primary text-white"
                  } disabled:cursor-not-allowed cursor-pointer flex  items-center justify-center w-full disabled:bg-muted border-2 border-ring hover:bg-dustyRose text-accent-foreground font-bold py-2  rounded focus:outline-none  focus:ring-ring transition`}
                >
                  {loading ? <Loader2 className="animate-spin text-primary"/> : (<><span className="text-white">Login</span></>)}
                </button>
              </form>
              <div className="text-center">
                <CustomText variant="paragraph" className="text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/vendorSignup"
                    className="font-bold text-primary hover:underline"
                  >
                    Sign Up
                  </Link>
                </CustomText>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 md:px-16 py-10 mb-10">
        <ServiceTypeCard
          icon={FiUsers}
          title="Reach engaged couples"
          description="Couples can find your Storefront and request information about your business."
          cardStyle="bg-white hover:shadow-xl transition-shadow duration-300"
          iconStyle="text-blue-500"
          titleStyle="text-blue-800"
          descriptionStyle="text-gray-700"
        />

        <ServiceTypeCard
          icon={MdOutlinePersonAddAlt}
          title="Get more leads"
          description="Call directly to potential clients via email or your account Dashboard."
          cardStyle="bg-white hover:shadow-xl transition-shadow duration-300"
          iconStyle="text-pink-500"
          titleStyle="text-pink-800"
          descriptionStyle="text-gray-700"
        />

        <ServiceTypeCard
          icon={MdEventAvailable}
          title="Book more weddings"
          description="Advertise on Wedd to drive more bookings and grow your business."
          cardStyle="bg-white hover:shadow-xl transition-shadow duration-300"
          iconStyle="text-purple-500"
          titleStyle="text-purple-800"
          descriptionStyle="text-gray-700"
        />
        <ServiceTypeCard
          icon={BiAnalyse}
          title="Dedicated Analytics"
          description="Analysis your leads and grow your business effortlessly."
          cardStyle="bg-white hover:shadow-xl transition-shadow duration-300"
          iconStyle="text-green-500"
          titleStyle="text-green-800"
          descriptionStyle="text-gray-700"
        />

        <ServiceTypeCard
          icon={FaMapMarkerAlt}
          title="Wedding Venues"
          description="Showcase your venue to couples searching for their dream wedding destination."
          cardStyle="bg-white hover:shadow-xl transition-shadow duration-300"
          iconStyle="text-purple-500"
          titleStyle="text-purple-800"
          descriptionStyle="text-gray-700"
        />
        <ServiceTypeCard
          icon={FaStore}
          title="Wedding Vendors"
          description="Connect with engaged couples and grow your business effortlessly."
          cardStyle="bg-white hover:shadow-xl transition-shadow duration-300"
          iconStyle="text-green-500"
          titleStyle="text-green-800"
          descriptionStyle="text-gray-700"
        />
        <ServiceTypeCard
          icon={FaFemale}
          title="Brides"
          description="Promote your services directly to brides planning their big day."
          cardStyle="bg-white hover:shadow-xl transition-shadow duration-300"
          iconStyle="text-pink-500"
          titleStyle="text-pink-800"
          descriptionStyle="text-gray-700"
        />
        <ServiceTypeCard
          icon={FaMale}
          title="Grooms"
          description="Offer your expertise to grooms preparing for their wedding journey."
          cardStyle="bg-white hover:shadow-xl transition-shadow duration-300"
          iconStyle="text-blue-500"
          titleStyle="text-blue-800"
          descriptionStyle="text-gray-700"
        />

        {/* //dashboard  */}
      </div>

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
            Join Us Today!
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Sign up now to connect with engaged couples and grow your business.
          </p>
          <button
            onClick={() => {
              navigate("/vendorSignup");
            }}
            className="bg-primary hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* vendor support  */}
      <div className="bg-gradient-to-br from-white via-pink-50 to-pink-100 py-12 px-5 md:px-16">
        {/* Overlay with backdrop blur */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Dedicated Vendor Support
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
                Reach us at support@blurockionic.com for detailed inquiries
              </p>
            </div>

            {/* Support Option 3 */}
            <div className="flex flex-col items-center border border-ring p-6 rounded-lg shadow-lg">
              <FaPhone className="text-purple-500 text-4xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600">
                Get direct support at +91-6200932331..
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* //footer  */}
      <Footer />
    </>
  );
}
