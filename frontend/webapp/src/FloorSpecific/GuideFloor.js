import React, { useState, useEffect } from "react";
import "./GuideFloor.css";
import locpin from "../asset/tool/locpin.png";

function GuideFloor({ onIconClick, selectedFloorData }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };

  const [activeSection, setActiveSection] = useState("facility");
  const [facilityGroups, setFacilityGroups] = useState({});
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    if (selectedFloorData) {
      const facilities = selectedFloorData.data.filter(
        (item) => item.type === "facility"
      );
      const stores = selectedFloorData.data.filter(
        (item) => item.type === "store"
      );

      // Group facilities
      const groups = facilities.reduce((acc, facility) => {
        const groupName = getGroupName(facility.name);
        if (!acc[groupName]) {
          acc[groupName] = [];
        }
        acc[groupName].push(facility);
        return acc;
      }, {});

      setFacilityGroups(groups);
      setStoreItems(stores);
    }
  }, [selectedFloorData]);

  const getGroupName = (facilityName) => {
    if (facilityName.includes("화장실")) return "화장실";
    if (facilityName.includes("에스컬레이터")) return "에스컬레이터";
    if (facilityName.includes("엘리베이터")) return "엘리베이터";
    return "기타";
  };

  const handleGroupClick = (groupName) => {
    const blockIds = facilityGroups[groupName].map((item) => item.blockId);
    console.log(`Clicked group: ${groupName}, blockIds:`, blockIds);
    onIconClick(blockIds, true); // true indicates it's a facility
    scrollToTop();
  };

  const handleStoreClick = (blockId) => {
    onIconClick([blockId], false);
    scrollToTop(); // 스크롤을 상단으로 이동
  };

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
            facilityGroups={facilityGroups}
            onGroupClick={handleGroupClick}
          />
        )}
        {activeSection === "guide" && (
          <StoreContent items={storeItems} onIconClick={handleStoreClick} />
        )}
      </div>
    </div>
  );
}

function FacilityContent({ facilityGroups, onGroupClick }) {
  return (
    <div className="facility-content">
      {Object.entries(facilityGroups).map(([groupName, facilities]) => (
        <div className="facility-group" key={groupName}>
          <div
            className="facility-item"
            onClick={() => onGroupClick(groupName)}
          >
            {groupName}
            <span className="logospace">
              <img src={locpin} alt="loc" width="30" height="20" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StoreContent({ items, onIconClick }) {
  return (
    <div className="facility-content">
      {items.map((item, index) => (
        <div className="facility-item" key={index}>
          {item.name}
          <span className="logospace" onClick={() => onIconClick(item.blockId)}>
            <img src={locpin} alt="loc" width="30" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default GuideFloor;
