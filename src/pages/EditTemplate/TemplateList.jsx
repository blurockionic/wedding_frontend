import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentApi } from "../../redux/payment";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddOrUpdateWatchHistoryMutation,
  useGetTemplateWatchHistoryQuery,
} from "../../redux/TemplateSlice";
import { FaCrown } from "react-icons/fa";

export const TemplateCard = React.memo(({ template, onClick }) => (
  <div
    className="bg-white cursor-pointer hover:shadow-lg transition-shadow relative group rounded-lg h-[344px] w-full max-w-fit mx-auto overflow-hidden border border-black"
    onClick={() => onClick(template)}
  >
    {/*update premium tag*/}
    <div className="relative w-fit h-[325px] m-2">
      <img
        src={template.thumbnailUrl}
        alt={template.name || "Template Thumbnail"}
        loading="lazy"
        className="w-full h-full rounded-md border border-black"
      />
      {template.categoryByAmount === "PAID" && (
        <div className="absolute -top-[97%] left-2 z-10 bg-primary text-white w-[33px] h-[33px] rounded-lg flex items-center justify-start overflow-hidden px-2 transition-all duration-300 ease-in-out group-hover:w-[120px]">
          <FaCrown className="text-white text-[20px] flex-shrink-0 -ms-[1px]" />
          <span className="ml-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Premium
          </span>
        </div>
      )}
    </div>
  </div>
));

const TemplateList = ({ data, handleWatchHitory }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    categoryByMood: "",
    categoryByAmount: "",
    categoryByRequirement: "",
    page: 1,
    limit: 50,
  });

  const loggedInUser = useSelector((state) => state?.auth?.user);
  const { data: watchHistory, refetch: refetchWatchHistory } =
    useGetTemplateWatchHistoryQuery();
  const [addOrUpdateWatchHistory] = useAddOrUpdateWatchHistoryMutation();

  useEffect(() => {
    refetchWatchHistory();
  }, []);

  const handleOnNavigate = async (template) => {
    // handleWatchHitory()
    if (!loggedInUser) {
      navigate("/login", { state: { from: "/browse" } });
      return;
    }

    addOrUpdateWatchHistory(template.id);

    if (template.categoryByAmount === "FREE") {
      navigate("/update_editor", { state: { template } });
      return;
    }

    if (template.categoryByAmount === "PAID") {
      try {
        const paymentData = await dispatch(
          paymentApi.endpoints.getTemplatePaymentHistory.initiate(
            { tempId: template.id },
            { forceRefetch: true }
          )
        ).unwrap();

        if (paymentData?.paymentStatus === "paid") {
          navigate("/update_editor", { state: { template } });
          return;
        }

        navigate("/payment", { state: { amount: template.price, template } });
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    }
  };

  return (
    <div className="p-1">
      <h2 className="text-xl font-bold mb-4">Templates</h2>
      {data?.data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 auto-rows-fr">
          {data.data.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={handleOnNavigate}
            />
          ))}
        </div>
      ) : (
        <p>No templates available.</p>
      )}
    </div>
  );
};

export default TemplateList;
