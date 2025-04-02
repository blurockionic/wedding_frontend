import { useGetPaymentHistoryQuery } from "../../../redux/payment";
import { dateFormats } from "../../../static/helper";

export default function Payments() {
  const { data, isLoading, isError, error } = useGetPaymentHistoryQuery();

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        {error?.message || "Failed to load payment history."}
      </div>
    );

  return (
    <div className="mx-auto  py-6">
     
      <div className="overflow-x-auto  p-4 bg-[#FFF6FE]">
        <table className="w-full text-sm text-center border capitalize border-gray-300">
          <thead>
            <tr className="bg-white">
              <th className="py-2 px-4 border bg-white">#</th>
              <th className="py-2 px-4 border bg-white">Date (₹)</th>
            
              <th className="py-2 px-4 border bg-white">Amount</th>
              <th className="py-2 px-4 border bg-white">Status</th>
              <th className="py-2 px-4 border bg-white">Payment Method</th>
            </tr>
            <tr className="border-none">
              <td colSpan="6" className="py-2  "></td>
            </tr>
          </thead>
          <tbody>
            {data?.payments?.length > 0 ? (
              data.payments.map((payment, index) => (
                <tr key={payment.id} className="border bg-white">
                  <td className="py-2 px-4 border bg-white">{index + 1}</td>
                  <td className="py-2 px-4 border bg-white text-gray-600">
                    {dateFormats(payment.created_at)}
                  </td>
                  <td className="py-2 px-4 border bg-white">
                    ₹{payment.amount}
                  </td>
                  
                  <td className="py-2 px-4 border bg-white">
                  <span className="bg-green-300/40 text-green-700 rounded-xl  px-4 py-1">  {payment.status==="SUCCESS"?"paid":payment.status}</span>
                  </td>
                  <td className="py-2 px-4 border bg-white">
                    {payment.payment_method || "N/A"}
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan="6" className="text-center py-4 border bg-white">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
