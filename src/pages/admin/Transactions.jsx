import { useGetTransactionsQuery } from "../../redux/adminApiSlice";


export default function Transactions() {
  const { data: transactions, isLoading, error } = useGetTransactionsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.data.message}</p>;

  console.log(transactions);
  return (
    <div>
      {transactions ? (
        <div>
          <h2 className="text-2xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full">Transactions</h2>
          <div>
          {transactions.data.vendorTransactions.length > 0 && (
            <table className="min-w-full bg-white text-xs">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Vendor Id</th>
                  <th className="py-2 px-4 border-b">Subscription Id</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Payment Method</th>
                  <th className="py-2 px-4 border-b">Razorpay Order Id</th>
                  <th className="py-2 px-4 border-b">Razorpay Payment Id</th>
                </tr>
              </thead>
              <tbody>
                {transactions.data.vendorTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-2 px-4 border-b">{transaction.vendorId || "Not Available"}</td>
                    <td className="py-2 px-4 border-b">{transaction.subscriptionId || "Not Available"}</td>
                    <td className="py-2 px-4 border-b">
                      {transaction.currency + transaction.amount || "Not Available"}
                    </td>
                    <td className="py-2 px-4 border-b">{transaction.status || "Not Available"}</td>
                    <td className="py-2 px-4 border-b">{transaction.payment_method || "Not Available"}</td>
                    <td className="py-2 px-4 border-b">{transaction.razorpay_order_id || "Not Available"}</td>
                    <td className="py-2 px-4 border-b">{transaction.razorpay_payment_id || "Not Available"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
          {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}