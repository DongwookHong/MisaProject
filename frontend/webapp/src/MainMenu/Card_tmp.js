import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/MainMenu/Card_tmp.css";

const buildings = [
  { id: 1, name: "HillState B동" },
  { id: 2, name: "HillState A동" },
  { id: 3, name: "Lottecastle" },
];

const Card_tmp = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const handleSelectBuilding = (building) => {
    setSelectedBuilding(building);
  };

  return (
    <Link to="/qrpage">
      <div className="card-container">
        {buildings.map((building) => (
          <div
            key={building.id}
            className={`card ${
              selectedBuilding === building ? "selected" : ""
            }`}
            onClick={() => handleSelectBuilding(building)}
          >
            <h5>{building.name}</h5>
          </div>
        ))}
        {selectedBuilding && <div className="selected-info"></div>}
      </div>
    </Link>
  );
};

export default Card_tmp;
