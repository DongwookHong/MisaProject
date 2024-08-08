import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

function base64Encode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialBuilding = searchParams.get("building") || "힐스테이트 A동";
  const initialFloor = searchParams.get("floor") || "1";

  const [selectedBuilding, setSelectedBuilding] = useState(initialBuilding);
  const [selectedFloor, setSelectedFloor] = useState(initialFloor + "F");
  const [floorData, setFloorData] = useState(null);

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        let buildingName, buildingDong;
        if (selectedBuilding === "롯데캐슬") {
          buildingName = "롯데캐슬";
          buildingDong = "C";
        } else {
          [buildingName, buildingDong] = selectedBuilding.split(" ");
          buildingDong = buildingDong.replace("동", "");
        }
        // const response = await axios.get(
        //   `https://api.misarodeo.com/api/building/${buildingName}/${buildingDong}`
        // );
        const encodedBuildingName = base64Encode(buildingName);
        

        const response = await axios.get(
          `https://apig.misarodeo.com/api/building/${encodedBuildingName}/${buildingDong}`, {
            headers: {
              accept: "*/*",
              "x-api-key": API_KEY,
            },
          }
        );
        const parsedData = response.data.map((item) => JSON.parse(item));
        setFloorData(parsedData);
      } catch (error) {
        console.error("Error fetching building data:", error);
      }
    };

    fetchBuildingData();
  }, [selectedBuilding]);

  return (
    <AppContext.Provider
      value={{
        selectedBuilding,
        setSelectedBuilding,
        selectedFloor,
        setSelectedFloor,
        floorData,
        setFloorData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
