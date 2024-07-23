import React, { useState, useMemo } from "react";
import "../style/QRpage/Guide_demo.css";
import locpin from "../asset/tool/locpin.png";

function Guide_demo({
  onIconClick,
  floorData,
  selectedFacility,
  selectedStore,
}) {
  const [activeSection, setActiveSection] = useState("facility");

  const scrollToTop = () => {
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };

  const handleIconClick = (item, type) => {
    onIconClick(item, type);
    scrollToTop();
  };

  const { facilityItems, storeItems } = useMemo(() => {
    const facilities = floorData.flatMap((floor) =>
      floor.data
        .filter((item) => item.type === "facility")
        .map((item) => item.name)
    );
    const stores = floorData.flatMap((floor) =>
      floor.data
        .filter((item) => item.type === "store")
        .map((item) => item.name)
    );
    return {
      facilityItems: [...new Set(facilities)].sort((a, b) => a.localeCompare(b, 'ko')),
      storeItems: [...new Set(stores)].sort((a, b) => a.localeCompare(b, 'ko')),
    };
  }, [floorData]);

  return (
    <div className="guide-container">
      <div className="title-row">
        <div
          className={`facility-title ${
            activeSection === "facility" ? "active" : "inactive"
          }`}
          onClick={() => setActiveSection("facility")}
        >
          편의시설
        </div>
        <div
          className={`guide-title ${
            activeSection === "guide" ? "active" : "inactive"
          }`}
          onClick={() => setActiveSection("guide")}
        >
          매장안내
        </div>
      </div>
      <div className="content-row">
        {activeSection === "facility" && (
          <FacilityContent
            items={facilityItems}
            onIconClick={(item) => handleIconClick(item, "facility")}
            selectedItem={selectedFacility}
          />
        )}
        {activeSection === "guide" && (
          <FacilityContent
            items={storeItems}
            onIconClick={(item) => handleIconClick(item, "store")}
            selectedItem={selectedStore}
          />
        )}
      </div>
    </div>
  );
}

function FacilityContent({ items, onIconClick, selectedItem }) {
  return (
    <div className="facility-content">
      {items.map((item, index) => (
        <div
          className={`facility-item ${item === selectedItem ? "selected" : ""}`}
          key={index}
        >
          {item}
          <span className="logospace" onClick={() => onIconClick(item)}>
            <img src={locpin} alt="loc" width="30" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default Guide_demo;