import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useGetPartnersQuery, useUpdatePartnerStatusMutation } from "../../redux/partnerFormSlice";


export default function Partnerdetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const partner = location.state?.partnerDetail;
  const [partnerupdate,{ isLoading, error, isSuccess }] = useUpdatePartnerStatusMutation();
  const { refetch } = useGetPartnersQuery();

  // API call to fetch partner details

  const fetchPartnerDetails = async (status) => {
    try {
      const response = await partnerupdate({
        id: partner.id,
        data: { status },
      });
      if (response.error) {
        console.error("Error fetching partner details:", response.error);
      } else {
        console.log("Partner details fetched successfully:", response.data);
        refetch()
      }
    } catch (error) {
      console.error("Error fetching partner details:", error);
    }
  };

  //

  if (!partner)
    return <div className=" text-gray-600">No partner data available.</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6  bg-gray-50 min-h-screen">
      {/* Left Panel - Partner Details */}
      <div className="md:w-2/3 rounded-2xl ">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Partner Profile
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-700">
          <Detail label="Full Name" value={partner.fullName} />
          <Detail label="Email" value={partner.email} />
          <Detail label="Phone" value={partner.phoneNumber} />
          <Detail label="City" value={partner.cityRegion} />
          <Detail label="State" value={partner.state} />
          <Detail
            label="Application Status"
            value={formatStatus(partner.applicationStatus)}
          />
          <Detail label="Availability" value={partner.availability} />
          <Detail label="Experience" value={partner.experienceYears} />
          <Detail label="Preferred Model" value={partner.preferredModel} />
          <Detail label="Role" value={partner.role} />
          <Detail
            label="Worked on Weddings"
            value={partner.workedOnWeddings ? "Yes" : "No"}
          />
          <Detail
            label="Created At"
            value={new Date(partner.createdAt).toLocaleDateString()}
          />
          <Detail
            label="Agreed to NDA"
            value={booleanText(partner.agreedToNDA)}
          />
          <Detail
            label="Lead Leakage Allowed?"
            value={booleanText(partner.agreedNoLeadLeakage)}
          />
          <Detail
            label="Platform Deals Agreed?"
            value={booleanText(partner.agreedPlatformDeals)}
          />
        </div>

        {partner.governmentIdUrl && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              Government ID(s)
            </h3>
            <div className="flex gap-4 overflow-x-auto py-2">
              {(Array.isArray(partner.governmentIdUrl)
                ? partner.governmentIdUrl
                : [partner.governmentIdUrl]
              ).map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Gov ID ${idx + 1}`}
                  className="w-72 rounded border shadow-sm flex-shrink-0"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Sticky Action Buttons */}
      <div className="md:w-1/3 space-y-6 md:sticky top-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Actions</h3>

          <button
            // disabled={partner.applicationStatus === "SHORTLISTED"}
            onClick={() => fetchPartnerDetails("SHORTLISTED")}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl w-full transition ${
              partner.applicationStatus === "APPROVED"
                ? "bg-green-200 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <ThumbsUp className="w-5 h-5" /> Approve
          </button>

          <button
            onClick={() => fetchPartnerDetails("REJECTED")}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl w-full mt-3 transition"
          >
            <ThumbsDown className="w-5 h-5" /> Reject
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl w-full mt-3 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800">{value || "—"}</p>
    </div>
  );
}

function booleanText(val) {
  return val ? (
    <span className="inline-flex items-center gap-1 text-green-600 font-medium">
      <CheckCircle className="w-4 h-4" /> Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-red-500 font-medium">
      <XCircle className="w-4 h-4" /> No
    </span>
  );
}

function formatStatus(status) {
  switch (status) {
    case "PENDING":
      return <span className="text-yellow-600 font-semibold">Pending</span>;
    case "APPROVED":
      return <span className="text-green-600 font-semibold">Approved</span>;
    case "REJECTED":
      return <span className="text-red-600 font-semibold">Rejected</span>;
    default:
      return <span className="text-gray-600">{status}</span>;
  }
}
