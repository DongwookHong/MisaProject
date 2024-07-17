import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FS_FloorSpecific from "./FS_FloorSpecific";
import GuideFloor from "./GuideFloor";
import MainFooter from "../Fix/MainFooter";

function MainComponent() {
  const { building, wing } = useParams();
  const canvasRef = useRef(null);
  const [floorData, setFloorData] = useState([]);
  const [selectedFloorData, setSelectedFloorData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFloorData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/api/building/${encodeURIComponent(building)}/${encodeURIComponent(
            wing
          )}`,
          {
            headers: {
              accept: "*/*",
              "x-api-key": "testapikey",
            },
          }
        );

        const rawData = response.data;
        const parsedData = rawData.map((item) => JSON.parse(item));
        setFloorData(parsedData);
        setSelectedFloorData(parsedData[0]); // Set the first floor as default
      } catch (error) {
        console.error("Error fetching floor data:", error);
        setError("Failed to load floor data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFloorData();
  }, [building, wing]);

  const handleFloorChange = (floorNumber) => {
    const newSelectedFloorData = floorData.find(
      (floor) => floor.floorNumber === floorNumber
    );
    setSelectedFloorData(newSelectedFloorData);
    setSelectedItems([]);
  };

  const handleIconClick = (blockId) => {
    console.log("Clicked blockId:", blockId); // 디버깅을 위한 로그
    setSelectedItems([blockId]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <FS_FloorSpecific
        canvasRef={canvasRef}
        selectedItems={selectedItems}
        selectedFloorData={selectedFloorData}
        floorData={floorData}
        onFloorChange={handleFloorChange}
      />
      <GuideFloor
        selectedFloorData={selectedFloorData}
        onIconClick={handleIconClick}
      />
      <MainFooter />
    </div>
  );
}

export default MainComponent;
