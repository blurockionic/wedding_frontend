import React from "react";
import { Handshake, TrendingUp, Briefcase, Megaphone, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: <TrendingUp className="text-indigo-600 w-6 h-6" />,
    title: "Earn Commission",
    description: "Get paid for every successful lead and event you manage in your city."
  },
  {
    icon: <Briefcase className="text-indigo-600 w-6 h-6" />,
    title: "Manage Local Events",
    description: "Take charge of planning and executing events with access to top vendors."
  },
  {
    icon: <Megaphone className="text-indigo-600 w-6 h-6" />,
    title: "Marketing Support",
    description: "Boost your local presence with promotional help and seasonal campaigns."
  },
  {
    icon: <BarChart3 className="text-indigo-600 w-6 h-6" />,
    title: "Dashboard Access",
    description: "Track leads, commissions, and performance with your city manager dashboard."
  },
  {
    icon: <Handshake className="text-indigo-600 w-6 h-6" />,
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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        👔 Become a  Partner
      </h1>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6 flex flex-col items-start gap-4 border border-gray-100 hover:shadow-md transition"
          >
            <div className="bg-indigo-100 rounded-full p-2">{benefit.icon}</div>
            <h3 className="text-xl font-semibold">{benefit.title}</h3>
            <p className="text-gray-600 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow">
          Apply to Become a City Manager
        </button>
      </div>

      {/* How It Works Section */}
      <h2 className="text-3xl font-bold text-center mt-16 mb-8">🛠️ How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {howItWorks.map((step, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 text-center border border-gray-100">
            <div className="text-4xl font-bold text-indigo-600 mb-2">Step {step.step}</div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Value for Managers & Platform */}
      <h2 className="text-3xl font-bold text-center mt-16 mb-8">🌍 Why Join?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-semibold mb-4">What You Get</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Commission on all successful bookings</li>
            <li>Access to verified vendors across categories</li>
            <li>City-based dashboard and lead manager</li>
            <li>Training, tools & ongoing support</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">What We Get</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>On-ground event leadership</li>
            <li>Better service delivery for users</li>
            <li>Expansion of platform reach</li>
            <li>Trust and engagement in local cities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CityManagerProgram;
