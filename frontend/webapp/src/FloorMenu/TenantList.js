import React, { useContext } from "react";
import { AppContext } from "./AppContext";

function TenantList() {
  const { selectedFloor, floorLists } = useContext(AppContext);

  return (
    <div className="tenant-container">
      {floorLists[selectedFloor].map((tenant, index) => (
        <div key={index} className="tenant">
          {tenant}
        </div>
      ))}
    </div>
  );
}

export default TenantList;
