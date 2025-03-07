import React from "react";
import { useGetPlansQuery } from "../../../redux/payment";
import { formatPrice } from "../../../static/helper";
import checkSvg from "../../../../public/plan/Check.svg"

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
          data?.plan?.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {data?.plan?.map((plan) => (
          <div className="flex justify-center items-center">
            <div
              key={plan.id}
              className="bg-card p-6 max-w-xs  h-fit py-10 rounded-lg border border-primary mb-6"
            >
              <h3 className="text-2xl text-center font-bold text-primary-foreground mb-4">
                {plan.name}
              </h3>
              {/* <p className="text-muted-foreground   mb-4">{plan.description}</p> */}
              <div className="flex justify-center items-center mb-4">
                <span className="text-xl font-bold text-primary">
                  {`${formatPrice(plan.price)} / ${plan.duration}`}
                </span>
                {/* <span className="text-muted-foreground text-sm">
                  Trial: {plan.trial_period} days
                </span> */}
              </div>
              <hr className="border-primary border-t-1 mt-5" />

              <div className="mb-4">
                <h4 className="text-lg pt-5 text-primary-foreground font-thin">
                  Includes:
                </h4>

                {plan.features && Object.keys(plan.features).length > 0 && (
                  <ul className="text-muted-foreground flex flex-col gap-3 mt-5">
                    {Object.entries(plan.features).map(([key, value]) => (
                      <li key={key} className="flex gap-2 text-sm"><img src={checkSvg} alt="check"/>{`${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }: ${value}`}</li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => displayRazorpay(plan.id)}
                className="w-full bg-primary  text-background py-2 rounded-lg mt-4  focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
