import { useGetPaymentHistoryQuery } from "../../../redux/payment";

export default function Payments() {
  const { data, isLoading, isError, error } = useGetPaymentHistoryQuery();

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (isError) return <p className="text-center py-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="md:p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Currency</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Payment Method</th>
              <th className="py-2 px-4 border">Razorpay Payment ID</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Contact</th>
              <th className="py-2 px-4 border">Subscription ID</th>
              <th className="py-2 px-4 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data?.payments?.length > 0 ? (
              data.payments.map((payment, index) => (
                <tr key={payment.id} className="text-center border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{payment.amount}</td>
                  <td className="py-2 px-4">{payment.currency}</td>
                  <td className={`py-2 px-4 font-semibold 
                    ${payment.status === "SUCCESS" ? "text-green-600" : "text-red-600"}`}>
                    {payment.status}
                  </td>
                  <td className="py-2 px-4">{payment.payment_method || "N/A"}</td>
                  <td className="py-2 px-4">{payment.razorpay_payment_id || "N/A"}</td>
                  <td className="py-2 px-4">{payment.email || "N/A"}</td>
                  <td className="py-2 px-4">{payment.contact || "N/A"}</td>
                  <td className="py-2 px-4">{payment.subscriptionId || "N/A"}</td>
                  <td className="py-2 px-4">{new Date(payment.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">No payment history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}