import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { BiPhone } from "react-icons/bi";
import { FaAddressBook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import StyledBtn from "../components/StyledBtn";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = React.useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Form Data:", data);
      setLoading(false);
      reset();
    }, 2000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description: "Contact us to book an appointment or reach out for more information.",
    url: "https://www.marriagevendors.com/contactus",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "6200932331",
      email: "support@blurockionic.com",
      contactType: "Customer Support",
      areaServed: "india",
      availableLanguage: ["English" ,"Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main St",
      addressLocality: "ludiyana",
      addressRegion: "Punjab",
      postalCode: "141001",
      addressCountry: "India",
    },
  };

  return (
    <>
      {/* Helmet for SEO and Metadata */}
      <Helmet>
        <title>Contact Us - Book an Appointment</title>
        <meta
          name="description"
          content="Contact us to book an appointment or reach out for more information. Get in touch today!"
        />
        <meta name="keywords" content="Contact us, get in touch, book an appointment, schedule a call, customer support contact, business contact information, email support, find our address, call us today, help center contact" />
        <meta name="author" content="Wedding Vendors" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us - Book an Appointment" />
        <meta property="og:description" content="Get in touch to book an appointment or ask a question." />
        <meta property="og:image" content="https://yourwebsite.com/preview-image.jpg" />
        <meta property="og:url" content="https://www.marriagevendors.com/contactus" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.marriagevendors.com/contactus" />
      </Helmet>

      <div
        className="flex flex-col md:flex-row gap-8 bg-muted p-6 md:py-32 md:px-40 relative"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        {/* Left Section */}
        <section className="flex flex-col" data-aos="fade-down" data-aos-delay="500">
          <h1 className="lg:text-4xl text-2xl font-bold mb-4 capitalize">
            Book For an Appointment
          </h1>
          <p className="mb-4 text-gray-600" data-aos="fade-up" data-aos-delay="700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
            Sed dapibus placerat velit. Donec in porttitor elit. Suspendisse
            accumsan iaculis tincidunt.
          </p>

          <h2 className="text-lg font-semibold mb-3">Our Info</h2>
          <address className="space-y-2 not-italic">
            <p data-aos="fade-up" data-aos-delay="900">
              <BiPhone className="inline mr-2" /> Phone:{" "}
              <a href="tel:1234567890" aria-label="Phone number">
                123-456-7890
              </a>
            </p>
            <p data-aos="fade-up" data-aos-delay="1100">
              <MdEmail className="inline mr-2" /> Email:{" "}
              <a href="mailto:info@example.com" aria-label="Email">
                info@example.com
              </a>
            </p>
            <p data-aos="fade-up" data-aos-delay="1300">
              <FaAddressBook className="inline mr-2" /> Address: 123 Main St,
              City, State, Zip
            </p>
          </address>
        </section>

        {/* Right Section: Form */}
        <section className="relative p-5 w-full mx-auto justify-center md:w-1/2">
          {/* Decorative Borders */}
          <div
            data-aos="fade-left"
            data-aos-delay="1000"
            className="absolute top-10 bottom-0 left-10 right-0 border-4 border-[#CF7745]"
          ></div>
          <div
            data-aos="fade-right"
            data-aos-delay="1000"
            className="border-4 top-0 bottom-10 left-0 right-10 border-black absolute inset-0"
          ></div>

          {/* Form Container */}
          <div
            data-aos="zoom-in"
            data-aos-delay="1000"
            className="bg-gray-100 w-full relative z-10 p-6 shadow-lg shadow-black h-fit items-center"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 w-full max-w-xl mx-auto"
              aria-labelledby="contact-form-title"
            >
              <h3 id="contact-form-title" className="text-2xl font-bold mb-4">
                Contact Us
              </h3>

              {/* Name Field */}
              <div className="w-full" data-aos="fade-up" data-aos-delay="1100">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border-b-2 border-black px-3 bg-transparent py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="w-full" data-aos="fade-up" data-aos-delay="1300">
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                  className="w-full border-b-2 border-black px-3 py-2 bg-transparent focus:outline-none focus:border-blue-500"
                  placeholder="Enter your phone number"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div data-aos="fade-up" data-aos-delay="1500">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[^@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full border-b-2 border-black px-3 py-2 bg-transparent focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div data-aos="fade-up" data-aos-delay="1700">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  className="w-full bg-transparent border-b-2 border-black px-3 py-2 focus:outline-none focus:border-blue-500 h-24"
                  placeholder="Write your message"
                  aria-invalid={!!errors.message}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div
                className="inline-block"
                data-aos="fade-up"
                data-aos-delay="1900"
              >
                <StyledBtn
                  title={loading ? "Submitting..." : "Submit"}
                  disabled={loading}
                  className={`${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  } transition-opacity`}
                />
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
