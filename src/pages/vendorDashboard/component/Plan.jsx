import React from "react";
import { useGetPlansQuery } from "../../../redux/payment";
import { formatPrice } from "../../../static/helper";

export default function Plan({ displayRazorpay }) {
  const { data, isLoading, isError, error } = useGetPlansQuery();

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;

  if (isError)
    return (
      <div className="text-center text-red-500">
        {error?.message || "An error occurred while fetching plans"}
      </div>
    );

  return (
    <div className="mx-auto flex justify-center items-center flex-col p-4">
      <h2 className="text-3xl text-center font-montserrat text-primary mb-6">
        Available Plans
      </h2>

      <div className="flex justify-center items-center">
        {data?.plan?.map((plan) => (
          <div
            key={plan.id}
            className="bg-card p-6 lg:w-1/2 md:w-1/2 max-w-1/2 py-10 rounded-lg shadow-custom shadow-pink-400 mb-6"
          >
            <h3 className="text-2xl text-center font-bold text-primary-foreground mb-4">
              {plan.name}
            </h3>
            <p className="text-muted-foreground   mb-4">{plan.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-muted-foreground">
                {`${formatPrice(plan.price)} / ${plan.duration}`}
              </span>
              <span className="text-muted-foreground text-sm">
                Trial: {plan.trial_period} days
              </span>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-primary-foreground">
                Features
              </h4>
              <ul className="list-disc pl-6 text-muted-foreground">
                {Object.entries(plan.features).map(([key, value]) => (
                  <li key={key}>{`${
                    key.charAt(0).toUpperCase() + key.slice(1)
                  }: ${value}`}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => displayRazorpay(plan.id)}
              className="w-full hover:bg-primary text-primary-foreground py-2 rounded-lg mt-4 bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
