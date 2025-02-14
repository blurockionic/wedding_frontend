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

      <div
        className={`grid gap-5 grid-cols-1 md:grid-cols-2 ustify-center"  ${
          data?.plan.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {data?.plan?.map((plan) => (
          <div className="flex justify-center items-center">
            <div
              key={plan.id}
              className="bg-card p-6 max-w-xs  h-fit py-10 rounded-lg shadow-custom shadow-pink-400 mb-6"
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

                {plan.features && Object.keys(plan.features).length > 0 && (
                  <ul className="list-disc pl-6 text-muted-foreground">
                    {Object.entries(plan.features).map(([key, value]) => (
                      <li key={key}>{`${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }: ${value}`}</li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => displayRazorpay(plan.id)}
                className="w-full hover:bg-primary text-primary-foreground py-2 rounded-lg mt-4 bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
