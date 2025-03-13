import React from "react";
import { useGetGeneralAnalyticsQuery } from "../../redux/adminApiSlice";

export default function Admin() {
  const { data: analytics, isLoading, error } = useGetGeneralAnalyticsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {analytics ? (
        <div>
          <h2>General Analytics</h2>
          <pre>{JSON.stringify(analytics, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
