import React from "react";
import { useGetPlansQuery } from "../../../redux/payment";

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
    <div className="container mx-auto py-8 max-w-7xl">
      <h2 className="text-3xl font-montserrat text-primary mb-6">
        Available Plans
      </h2>

      {data?.plan?.map((plan) => (
        <div
          key={plan.id}
          className="bg-card p-6 max-w-2xl rounded-lg shadow-custom mb-6"
        >
          <h3 className="text-2xl font-semibold text-primary-foreground mb-4">
            {plan.name}
          </h3>
          <p className="text-muted-foreground mb-4">{plan.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-muted-foreground">
              {`$${plan.price} / ${plan.duration}`}
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
              <li>{`Storage: ${plan.features.storage}`}</li>
              <li>{`Support: ${plan.features.support}`}</li>
              <li>{`Access: ${plan.features.access}`}</li>
              <li>{`Users: ${plan.features.users}`}</li>
            </ul>
          </div>

          <button
            onClick={() => displayRazorpay(plan.id)}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg mt-4 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Subscribe Now
          </button>
        </div>
      ))}
    </div>
  );
}
