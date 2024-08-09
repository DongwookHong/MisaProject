import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdvertiseQR from "../Fix/AdvertiseQR";
import DropDownMenu from "./DropDownMenu";
import PinMove from "./PinMoveA";
import MainFooter from "../Fix/MainFooter";
import MainHeader from "../Fix/MainHeader";

const API_KEY = process.env.REACT_APP_API_KEY;

function EnterArcade() {
  const { id } = useParams();
  const [floorData, setFloorData] = useState([]);
  const [selectedFloorData, setSelectedFloorData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [building, setBuilding] = useState("힐스테이트 A");
  const [floor, setFloor] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "/api/qr-page",
          // const response = await axios.get(
          // "https://apig.misarodeo.com/api/qr-page",
          "/api/qr-page",
          {
            headers: {
              accept: "*/*",
              "x-api-key": API_KEY,
            },
          }
        );
        const parsedData = response.data.map((item) => JSON.parse(item));
        setFloorData(parsedData);
        setIsLoading(false);

        let buildingName, buildingDong, floorNumber;

        if (id) {
          buildingDong =
            id.charAt(0) === "1" ? "A" : id.charAt(0) === "2" ? "B" : "C";
          buildingName = id.charAt(0) === "3" ? "롯데캐슬" : "힐스테이트";
          floorNumber = id.charAt(1);
        } else {
          // 기본값: 힐스테이트 A동 1층
          buildingName = "힐스테이트";
          buildingDong = "A";
          floorNumber = "1";
        }

        setBuilding(`${buildingName} ${buildingDong}`);
        setFloor(floorNumber);

        const relevantFloorData = parsedData.find(
          (data) =>
            data.buildingName === buildingName &&
            data.buildingDong === buildingDong &&
            data.floorNumber === floorNumber
        );

        if (relevantFloorData) {
          setSelectedFloorData(relevantFloorData);
          setCurrentLocation(id ? { blockId: id } : null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("데이터를 불러오는 데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFloorSelect = (floorData) => {
    setSelectedFloorData(floorData);
    setBuilding(`${floorData.buildingName} ${floorData.buildingDong}`);
    setFloor(floorData.floorNumber);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <MainHeader />
      <div style={{ padding: "100px 0" }}>
        <AdvertiseQR />
        <DropDownMenu
          floorData={floorData}
          onFloorSelect={handleFloorSelect}
          setBuilding={setBuilding}
          setFloor={setFloor}
          initialBuilding={building}
          initialFloor={floor}
        />
        <PinMove
          floorData={floorData}
          selectedFloorData={selectedFloorData}
          currentLocation={currentLocation}
        />
      </div>
      <MainFooter />
    </div>
  );
}

export default EnterArcade;
