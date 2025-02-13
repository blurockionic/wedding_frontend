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
    <div className=" mx-auto bg-white rounded-xl p-6 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 ">Active Subscriptions</h2>
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
      <table className="w-full text-sm text-left text-gray-600 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th className="py-2 px-4 border">Plan Name</th>
            <th className="py-2 px-4 border">Price (₹)</th>
            <th className="py-2 px-4 border">Start Date</th>
            <th className="py-2 px-4 border">End Date</th>
            <th className="py-2 px-4 border">Auto Renew</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{subscription.plan?.name || 'N/A'}</td>
              <td className="py-2 px-4 border">{subscription.plan?.price || 'N/A'}</td>
              <td className="py-2 px-4 border">{dateFormats(subscription.start_date)}</td>
              <td className="py-2 px-4 border">
                {subscription.end_date ? dateFormats(subscription.end_date) : 'N/A'}
              </td>
              <td className="py-2 px-4 border">{subscription.auto_renew ? 'Yes' : 'No'}</td>
              <td className={`py-2 font-bold px-4 border ${statuscolor(subscription.status)}`}>{subscription.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
