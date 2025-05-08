import { TrendingUp, Briefcase, Megaphone, BarChart3, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: <TrendingUp className="text-pink-500 w-6 h-6" />,
    title: "Earn Commission",
    description: "Get paid for every successful lead and event you manage in your city."
  },
  {
    icon: <Briefcase className="text-pink-500 w-6 h-6" />,
    title: "Manage Local Events",
    description: "Take charge of planning and executing events with access to top vendors."
  },
  {
    icon: <Megaphone className="text-pink-500 w-6 h-6" />,
    title: "Marketing Support",
    description: "Boost your local presence with promotional help and seasonal campaigns."
  },
  {
    icon: <BarChart3 className="text-pink-500 w-6 h-6" />,
    title: "Dashboard Access",
    description: "Track leads, commissions, and performance with your city manager dashboard."
  },
  {
    icon: <Handshake className="text-pink-500 w-6 h-6" />,
    title: "Onboarding & Training",
    description: "Learn how to manage leads, events, and vendors with expert guidance."
  }
];

const howItWorks = [
  {
    step: 1,
    title: "Apply & Get Approved",
    desc: "Fill out a quick form to express interest and get verified by our team."
  },
  {
    step: 2,
    title: "Get Onboarded",
    desc: "Receive training on tools, vendors, and lead management."
  },
  {
    step: 3,
    title: "Start Managing Events",
    desc: "Coordinate with vendors and plan events in your city."
  },
  {
    step: 4,
    title: "Earn Commission",
    desc: "Receive payouts for every successful booking you manage."
  }
];

const CityManagerProgram = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-pink-600">
        Become a Partner
      </h1>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-100 shadow p-6"
          >
            <div className="text-pink-500 mb-2">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-1">{benefit.title}</h3>
            <p className="text-gray-600 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mb-12">
        <Link to={"form"} className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-3 rounded-md">
          Apply to become a City Manager
        </Link>
      </div>

      {/* How It Works Section */}
      <h2 className="text-4xl font-bold text-center my-12 text-pink-600">
        How it works?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {howItWorks.map((step, i) => {
          const bgColors = [
            "bg-amber-100", // Step 1 - beige
            "bg-green-100", // Step 2 - light green
            "bg-purple-100", // Step 3 - light purple
            "bg-pink-100" // Step 4 - light pink
          ];
          
          return (
            <div key={i} className={`${bgColors[i]} rounded-lg shadow p-6 text-center`}>
              <div className="font-bold mb-2">Step {step.step}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700 text-sm">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Why Join Section */}
      <h2 className="text-4xl font-bold text-center mb-12 text-pink-600">
        Why to join?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-semibold mb-4">What You Get?</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span>Commission on all successful bookings.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span>Access to verified vendors across categories.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span>City-based dashboard and lead manager.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span>Training, tools & ongoing support.</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">What We Get?</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span>On-ground event leadership.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span>Better service delivery for users.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span>Expansion of platform reach.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span>Trust and engagement in local cities.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CityManagerProgram;