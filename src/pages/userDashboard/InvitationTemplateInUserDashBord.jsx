import React from "react";
import { useGetTemplateWatchHistoryQuery } from "../../redux/TemplateSlice";
import { TemplateCard } from "../EditTemplate/TemplateList";
import { useNavigate } from "react-router-dom";

export default function InvitationTemplateInUserDashBord() {
  const { data: watchTemplateData, isLoading: watchLoading } =
    useGetTemplateWatchHistoryQuery();

  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recently Watched Templates</h2>

      {watchLoading ? (
        <p className="text-center text-gray-500">Loading templates...</p>
      ) : watchTemplateData?.watchHistory?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchTemplateData.watchHistory.map((item) => (
            <TemplateCard
              key={item.id}
              template={item.template}
              onClick={() =>
                navigate("/update_editor", {
                  state: { template: item.template },
                })
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No templates available in your watch history.</p>
        </div>
      )}
    </div>
  );
}
