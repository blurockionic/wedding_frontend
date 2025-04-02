import React from 'react';
import { useGetSubscriptionQuery } from '../../redux/payment';
import {dateFormats} from "../../static/helper.js"

export default function ActiveSubscription() {
  const { data, isLoading: subLoading, isError, error } = useGetSubscriptionQuery();

  if (subLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        {error?.data?.message || 'Failed to load subscription details.'}
      </div>
    );
  }

  const subscriptions = data?.subscriptions;

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No active subscriptions found.
      </div>
    );
  }

  const statuscolor = (status )=>{
    status = status.toLowerCase();
    
    if(status === 'active'){
      return 'text-green-500';
    }else if(status === 'expired'){
      return 'text-red-500';
    }else{
      return 'text-yellow-500';
    }
  }

  return (
    <div className=" mx-auto bg-white rounded-xl py-6 ">
      
      <div className="overflow-x-auto  p-4 bg-[#FFF6FE]">
      <table className="w-full text-sm text-left text-gray-600 border-collapse">
        <thead>
          <tr className="bg-white text-gray-800">
            <th className="py-2 px-4 border bg-white">Plan Name</th>
            <th className="py-2 px-4 border bg-white">Price (₹)</th>
            <th className="py-2 px-4 border bg-white">Start Date</th>
            <th className="py-2 px-4 border bg-white">End Date</th>
            <th className="py-2 px-4 border bg-white">Auto Renew</th>
            <th className="py-2 px-4 border bg-white">Status</th>
          </tr>
          <tr className="border-none">
              <td colSpan="6" className="py-2  "></td>
            </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border bg-white">{subscription.plan?.name || 'N/A'}</td>
              <td className="py-2 px-4 border bg-white">{subscription.plan?.price || 'N/A'}</td>
              <td className="py-2 px-4 border bg-white">{dateFormats(subscription.start_date)}</td>
              <td className="py-2 px-4 border bg-white">
                {subscription.end_date ? dateFormats(subscription.end_date) : 'N/A'}
              </td>
              <td className="py-2 px-4 border bg-white">{subscription.auto_renew ? 'Yes' : 'No'}</td>
              <td className={`py-2 font-bold px-4 border bg-white ${statuscolor(subscription.status)}`}>{subscription.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
