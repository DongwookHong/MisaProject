import React, { useContext } from "react";
import { AppContext } from "./AppContext";

function FloorSelector() {
  const { selectedFloor, setSelectedFloor } = useContext(AppContext);

  return (
    <div className="floor-container bg-purple-100">
      {["3F", "2F", "1F", "B1", "B2"].map((floor) => (
        <div
          key={floor}
          className={`floor ${
            selectedFloor === floor
              ? "bg-purple-500 text-white"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedFloor(floor)}
        >
          {floor}
        </div>
      ))}
    </div>
  );
}

export default FloorSelector;
