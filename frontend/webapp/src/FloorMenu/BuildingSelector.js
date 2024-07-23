import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/FloorMenu/FloorMenu.css";
import mapImage from "../asset/tool/mapimage.png";

function BuildingSelector() {
  const { selectedBuilding, setSelectedBuilding, setFloorData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const buildingMap = {
    "힐스테이트 12BL": "힐스테이트 A동",
    "힐스테이트 11BL": "힐스테이트 B동",
    롯데캐슬: "롯데캐슬",
  };

  const handleBuildingSelect = async (displayName) => {
    const internalName = buildingMap[displayName];
    setSelectedBuilding(internalName);

    let buildingName, buildingDong;
    if (internalName === "롯데캐슬") {
      buildingName = "롯데캐슬";
      buildingDong = "C";
    } else {
      [buildingName, buildingDong] = internalName.split(" ");
      buildingDong = buildingDong.replace("동", "");
    }

    try {
      const response = await axios.get(
        `/api/building/${buildingName}/${buildingDong}`
      );

      const parsedData = response.data.map((item) => JSON.parse(item));
      setFloorData(parsedData);
    } catch (error) {
      console.error("Error fetching building data:", error);
    }

    navigate(`/floormenu?building=${internalName}&floor=1`);
  };

  const handleFloorSpecificClick = () => {
    if (selectedBuilding) {
      let buildingName, buildingDong;
      if (selectedBuilding === "롯데캐슬") {
        buildingName = "롯데캐슬";
        buildingDong = "C";
      } else {
        [buildingName, buildingDong] = selectedBuilding.split(" ");
        buildingDong = buildingDong.replace("동", "");
      }
      navigate(`/${buildingName}/${buildingDong}`);
    } else {
      console.log("건물을 선택해주세요.");
    }
  };

  const getDisplayName = (internalName) => {
    return (
      Object.entries(buildingMap).find(
        ([key, value]) => value === internalName
      )?.[0] || internalName
    );
  };

  return (
    <div className="dong-container">
      <div className="flex-dong justify-center mb-4 space-x-4">
        {Object.keys(buildingMap).map((displayName) => (
          <button
            key={displayName}
            className={`button ${
              selectedBuilding === buildingMap[displayName]
                ? "button-selected"
                : "button-unselected"
            }`}
            onClick={() => handleBuildingSelect(displayName)}
          >
            {displayName}
          </button>
        ))}
      </div>
      <div className="map_button-container">
        <button className="map_button" onClick={handleFloorSpecificClick}>
          <img
            src={mapImage}
            alt="Icon"
            width="25"
            height="25"
            style={{ padding: "5px" }}
          />
          층별안내 {"   "}
        </button>
      </div>
    </div>
  );
}

export default BuildingSelector;
