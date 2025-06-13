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
          <h2 className="text-2xl font-semibold text-[#f20574] mb-3 break-words whitespace-normal w-full">Transactions</h2>
          <div className="border border-gray-200 rounded p-4">
          {transactions.data.vendorTransactions.length > 0 && (
            <table className="min-w-full text-xs bg-white">
              <thead>
                <tr>
                  <th className="py-4 px-4 border-b pb-4 font-semibold">
                    <div className="flex">S.No.</div>
                  </th>
                  <th className="py-4 px-4 border-b pb-4 font-semibold">
                    <div className="flex">Vendor Id</div>
                  </th>
                  <th className="py-4 px-4 border-b pb-4 font-semibold">
                    <div className="flex">Subscription Id</div>
                  </th>
                  <th className="py-4 px-4 border-b pb-4 font-semibold">
                    <div className="flex">Amount</div>
                  </th>
                  <th className="py-4 px-4 border-b pb-4 font-semibold">
                    <div className="flex">Status</div>
                  </th>
                  <th className="py-4 px-4 border-b pb-4 font-semibold">
                    <div className="flex">Payment Method</div>
                  </th>
                  <th className="py-4 px-4 border-b pb-4 font-semibold">
                    <div className="flex">Razorpay Order Id</div>
                  </th>
                  <th className="py-4 px-4 border-b pb-4 font-semibold">
                    <div className="flex">Razorpay Payment Id</div>
                  </th>   
                </tr>
              </thead>
              <tbody>
                {transactions.data.vendorTransactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{transaction.vendorId || "Not Available"}</td>
                    <td className="py-2 px-4 border-b">{transaction.subscriptionId || "Not Available"}</td>
                    <td className="py-2 px-4 border-b">
                      {transaction.currency + transaction.amount || "Not Available"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span 
                        className={`px-2 py-1 rounded-full text-black text-[10px] ${
                          transaction.status === "PENDING" ? "bg-[#f5ef9e]" :
                          transaction.status === "SUCCESS" ? "bg-[#b8f59e]" :
                          transaction.status === "FAILED" ? "bg-[#f59e9e]" : "bg-gray-500"
                        }`}
                      >
                        {transaction.status || "Not Available"}
                      </span>
                    </td>
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