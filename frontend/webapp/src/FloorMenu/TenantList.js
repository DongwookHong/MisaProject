import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

function TenantList() {
  const { selectedBuilding, selectedFloor } = useContext(AppContext);
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFloorData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Check if the selected floor is a parking lot
        if (isParkingLot(selectedBuilding, selectedFloor)) {
          setTenants(["주차장"]);
          setIsLoading(false);
          return;
        }

        const response = await axios.get("https://api.misarodeo.com/api/floor", {
          // const response = await axios.get("/api/floor", {
          headers: {
            accept: "*/*",
            "x-api-key": "testapikey",
          },
        });

        const floorData = response.data;
        const parsedData = floorData.map((item) => JSON.parse(item));

        const selectedBuildingData = parsedData.find((item) => {
          const buildingName = selectedBuilding.split(" ")[0];
          const buildingDong =
            selectedBuilding.split(" ")[1]?.replace("동", "") || "";
          const floorNumber = convertFloorNumber(selectedFloor);

          return (
            item.buildingName === buildingName &&
            item.buildingDong === buildingDong &&
            item.floorNumber === floorNumber
          );
        });

        if (selectedBuildingData) {
          setTenants(selectedBuildingData.storeName);
        } else {
          setTenants([]);
        }
      } catch (error) {
        console.error("Error fetching floor data:", error);
        setError("Failed to load tenant data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFloorData();
  }, [selectedBuilding, selectedFloor]);

  // Helper function to check if the selected floor is a parking lot
  const isParkingLot = (building, floor) => {
    if (building === "힐스테이트 A동" && ["B2", "B3", "B4"].includes(floor)) {
      return true;
    }
    if (
      (building === "힐스테이트 B동" || building === "롯데캐슬 C동") &&
      ["B1", "B2", "B3", "B4"].includes(floor)
    ) {
      return true;
    }
    return false;
  };

  // Helper function to convert floor notation
  const convertFloorNumber = (floor) => {
    if (floor === "B1") return "0";
    if (floor.startsWith("B")) return `-${floor.slice(1)}`;
    return floor.replace("F", "");
  };

  if (isLoading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="tenant-container">
      {tenants.length > 0 ? (
        tenants.map((tenant, index) => (
          <div key={index} className="tenant">
            {tenant}
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TenantList;
