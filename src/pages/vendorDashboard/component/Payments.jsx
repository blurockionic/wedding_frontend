import { useGetPaymentHistoryQuery } from "../../../redux/payment";

export default function Payments() {
  const { data, isLoading, isError, error } = useGetPaymentHistoryQuery();

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  
  if (isError) {
    return <div className="text-center text-red-500">{error?.message || 'Failed to load payment history.'}</div>;
  }

  return (
    <div className="mx-auto bg-white rounded-xl p-6 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment History</h2>
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
        <table className="w-full text-sm text-left text-gray-600 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Amount (₹)</th>
              <th className="py-2 px-4 border">Currency</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Payment Method</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.payments?.length > 0 ? (
              data.payments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className="text-center border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border font-medium">₹{payment.amount}</td>
                  <td className="py-2 px-4 border uppercase">{payment.currency}</td>
                  <td
                    className={`py-2 px-4 border font-semibold ${
                      payment.status === "SUCCESS" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="py-2 px-4 border">{payment.payment_method || "N/A"}</td>
                  <td className="py-2 px-4 border text-sm text-gray-500">
                    {new Date(payment.created_at).toLocaleString()} {/* Format date and time */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
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
