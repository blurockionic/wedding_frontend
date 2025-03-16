import React from "react";
import { Link } from "react-router-dom";
import Quote from "../Quote";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import templateImage from "../../../public/template/templateImage.png"
function Template() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  
  const handleBuyClick = () => {
    if (isLoggedIn) {
      navigate("/payment");
    } else {
      navigate("/login", { state: { from: "/payment", isBuyClicked: true } }); 
    }
  };
  return (
    <div>
      <div className="">
        <div className="">
          <div className="line_temp"></div>
          <div className="container mx-auto px-8 py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Side - Content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
                <div className="space-y-3">
                  <span className="text-pink-600 font-semibold tracking-wider text-sm">
                    MARRIAGE VENDORS INVITATIONS
                  </span>
                  <h1 className="font-['Montserrat'] text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Create Beautiful Memories
                  </h1>

                  <h2 className="font-['Montserrat'] text-3xl lg:text-4xl text-gray-700 font-light">
                    One Invitation at a Time
                  </h2>

                  <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                    Discover exquisite designs crafted to make your special day
                    unforgettable. Each template tells a unique story.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link className="" to="/browse">
                  <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Browse Templates
                  </button>
                </Link>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      1000+
                    </div>
                    <div className="text-gray-600">Templates</div>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">24/7</div>
                    <div className="text-gray-600">Support</div>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">4.9</div>
                    <div className="text-gray-600">Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="w-full lg:w-1/2 relative flex justify-center p-8">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-3xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-rose-200/30 to-yellow-200/30 rounded-3xl transform -rotate-3"></div>

                {/* Blob animations */}
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 right-8 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                {/* Main image */}
                <div className="relative group">
                  <img
                    src={templateImage}
                    alt="Wedding Invitation"
                    className="relative rounded-2xl shadow-2xl w-full max-w-lg h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-105 rotate-[5deg]"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Decorative dots */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-dots-white opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-dots-white opacity-20"></div>
              </div>
            </div>
          </div>
          <Quote />
          <section className="bg-white py-[70px] ">
            <div className="mx-auto px-4 sm:container">
              <div className="border-l-[5px] border-[#ff2f7b] pl-5 ">
                <h2 className="font-['Montserrat'] mb-2 text-2xl font-semibold text-[#ff2f7b] ">
                  Choose Template
                </h2>
                <p className="text-sm font-medium text-body-color ">
                  Choose from a variety of beautiful designs and templates
                </p>
              </div>
            </div>
          </section>

          <div className="section_4">
            <div className="sec_4">
              <div className="sec_5">
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53">
                      <div className="h-[30px] w-[30%] popular_1"></div>
                    </div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[38%] text-black">₹100.00</div>
                      <div className="ms-[4%] text-yellow-500">⭐5</div>
                    </div>
                    <div className="sec_54">
                      <Link className="sec_55" to="/view">
                        <div className="">Preview</div>
                      </Link>
                      <Link className="sec_55" to="">
                        <div>
                        <button onClick={handleBuyClick}>
                          Buy
                        </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53_1">
                      <div className="h-[30px] w-[25%] popular"></div>
                    </div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name_1">
                      Aquamarine Peacock
                      <div className="ms-[25%] text-green-600 text-[15px] bg-slate-200 rounded p-3 flex justify-center items-center free_1">
                        FREE
                      </div>
                      <div className="ms-[4%] text-yellow-500">⭐5</div>
                    </div>
                    <div className="sec_54">
                      <Link className="sec_55" to="/view_1">
                        <div className="">Preview</div>
                      </Link>
                      <Link className="sec_55" to="/preview_1">
                        <div>
                          Edit
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53"></div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[53%] text-yellow-500">⭐4.9</div>
                    </div>
                    <div className="sec_54">
                      <div className="sec_55">Preview</div>
                      <Link className="sec_55" to="/payment">
                        <div className="">Buy</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sec_5">
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53"></div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[55%] text-yellow-500">⭐5</div>
                    </div>
                    <div className="sec_54">
                      <div className="sec_55">Preview</div>
                      <Link className="sec_55" to="/payment">
                        <div className="">Buy</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53"></div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[53%] text-yellow-500">⭐4.8</div>
                    </div>
                    <div className="sec_54">
                      <div className="sec_55">Preview</div>
                      <Link className="sec_55" to="/payment">
                        <div className="">Buy</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53"></div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[53%] text-yellow-500">⭐4.9</div>
                    </div>
                    <div className="sec_54">
                      <div className="sec_55">Preview</div>
                      <Link className="sec_55" to="/payment">
                        <div className="">Buy</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sec_5">
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53">
                      <div className="h-[30px] w-[30%] popular_1"></div>
                    </div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[38%] text-black">₹100.00</div>
                      <div className="ms-[4%] text-yellow-500">⭐5</div>
                    </div>
                    <div className="sec_54">
                      <Link className="sec_55" to="/view">
                        <div className="">Preview</div>
                      </Link>
                      <Link className="sec_55" to="">
                        <div>
                        <button onClick={handleBuyClick}>
                          Buy
                        </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53_1">
                      <div className="h-[30px] w-[25%] popular"></div>
                    </div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name_1">
                      Aquamarine Peacock
                      <div className="ms-[25%] text-green-600 text-[15px] bg-slate-200 rounded p-3 flex justify-center items-center free_1">
                        FREE
                      </div>
                      <div className="ms-[4%] text-yellow-500">⭐5</div>
                    </div>
                    <div className="sec_54">
                      <Link className="sec_55" to="/view_1">
                        <div className="">Preview</div>
                      </Link>
                      <Link className="sec_55" to="/preview_1">
                        <div>
                          Edit
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53"></div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[53%] text-yellow-500">⭐4.9</div>
                    </div>
                    <div className="sec_54">
                      <div className="sec_55">Preview</div>
                      <Link className="sec_55" to="/payment">
                        <div className="">Buy</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sec_5">
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53">
                      <div className="h-[30px] w-[30%] popular_1"></div>
                    </div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[38%] text-black">₹100.00</div>
                      <div className="ms-[4%] text-yellow-500">⭐5</div>
                    </div>
                    <div className="sec_54">
                      <Link className="sec_55" to="/view">
                        <div className="">Preview</div>
                      </Link>
                      <Link className="sec_55" to="">
                        <div>
                        <button onClick={handleBuyClick}>
                          Buy
                        </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53_1">
                      <div className="h-[30px] w-[25%] popular"></div>
                    </div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name_1">
                      Aquamarine Peacock
                      <div className="ms-[25%] text-green-600 text-[15px] bg-slate-200 rounded p-3 flex justify-center items-center free_1">
                        FREE
                      </div>
                      <div className="ms-[4%] text-yellow-500">⭐5</div>
                    </div>
                    <div className="sec_54">
                      <Link className="sec_55" to="/view_1">
                        <div className="">Preview</div>
                      </Link>
                      <Link className="sec_55" to="/preview_1">
                        <div>
                          Edit
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="sec_51">
                  <div className="sec_52">
                    <div className="sec_53"></div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex temp_name">
                      Bird of Charm
                      <div className="ms-[53%] text-yellow-500">⭐4.9</div>
                    </div>
                    <div className="sec_54">
                      <div className="sec_55">Preview</div>
                      <Link className="sec_55" to="/payment">
                        <div className="">Buy</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[120vh] w-[100%] another">
            <div className="sec_4">
              <div className="sec_5">
                <div className="another_sec_51">
                  <div className="sec_52">
                    <div className="sec_53"></div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex a_53">
                      Bird of Charm
                      <div className="md:ms-[55%] ms-[50%] text-yellow-500">
                        ⭐5
                      </div>
                    </div>
                    <div className="sec_54">
                      <Link className="sec_55" to="/view">
                        <div className="sec_55">Preview</div>
                      </Link>
                      <Link className="sec_55" to="/payment">
                        <div className="">Buy</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sec_5">
                <div className="another_sec_51">
                  <div className="sec_52">
                    <div className="sec_53"></div>
                    <div className="h-[30px] w-[100%] mt-4 text-lg font-bold flex a_53">
                      Bird of Charm
                      <div className="md:ms-[55%] ms-[50%] text-yellow-500">
                        ⭐5
                      </div>
                    </div>
                    <div className="sec_54">
                      <div className="sec_55">Preview</div>
                      <Link className="sec_55" to="/payment">
                        <div className="">Buy</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Template;
