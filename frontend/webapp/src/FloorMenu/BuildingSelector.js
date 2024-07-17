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

  // 사용자에게 보이는 이름과 내부적으로 처리되는 이름을 매핑
  const buildingMap = {
    "힐스테이트 A동": "힐스테이트 A동",
    "힐스테이트 B동": "힐스테이트 B동",
    롯데캐슬: "롯데캐슬 C동",
  };

  const handleBuildingSelect = async (displayName) => {
    const internalName = buildingMap[displayName];
    setSelectedBuilding(internalName);
    const [buildingName, buildingDong] = internalName.split(" ");

    try {
      const response = await axios.get(
        `/api/floorspecific/building/${buildingName}/${buildingDong.replace(
          "동",
          ""
        )}`
      );
      const parsedData = response.data.map((item) => JSON.parse(item));
      setFloorData(parsedData);
    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };

  const handleFloorSpecificClick = () => {
    if (selectedBuilding) {
      const [buildingName, buildingDong] = selectedBuilding.split(" ");
      const dongLetter = buildingDong.replace("동", "");
      navigate(`/floorspecific/${buildingName}/${dongLetter}`);
    } else {
      console.log("건물을 선택해주세요.");
    }
  };

  return (
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
      <button className="map_button" onClick={handleFloorSpecificClick}>
        <img
          src={mapImage} // 임포트한 이미지 사용
          alt="Icon"
          width="30"
          height="30"
        ></img>
        층별안내
      </button>
    </div>
  );
}

export default BuildingSelector;
