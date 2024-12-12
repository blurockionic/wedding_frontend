import React from "react";
import { useParams } from "react-router-dom";

function ServiceDetail() {
  const { id } = useParams(); 
 
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Service Detail for ID: {id}</h1>
     
    </div>
  );
}

export default ServiceDetail;
