import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GuideFloor.css";
import locpin from "../asset/tool/locpin.png";


function GuideFloor({ onIconClick, selectedFloorData }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [activeSection, setActiveSection] = useState("facility");
  const [facilityGroups, setFacilityGroups] = useState({});
  const [storeItems, setStoreItems] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

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
      setStoreItems(stores.sort((a, b) => a.name.localeCompare(b.name, "ko")));
    }
  }, [selectedFloorData]);

  const getGroupName = (facilityName) => {
    if (facilityName.includes("화장실")) return "화장실";
    if (facilityName.includes("에스컬레이터")) return "에스컬레이터";
    if (facilityName.includes("엘리베이터")) return "엘리베이터";
    return "기타";
  };

  const handleGroupClick = (groupName) => {
    if (selectedGroup === groupName) {
      // If the same group is clicked again, clear the selection
      setSelectedGroup(null);
      onIconClick([], true);
    } else {
      // Select the new group
      setSelectedGroup(groupName);
      const blockIds = facilityGroups[groupName].map((item) => item.blockId);
      onIconClick(blockIds, true);
    }
    scrollToTop();
  };

  const handleStoreIconClick = (blockId) => {
    setSelectedGroup(null);
    onIconClick([blockId], false);
    scrollToTop();
  };

  const sortedFacilityGroups = () => {
    const order = ["화장실", "에스컬레이터", "엘리베이터"];
    return Object.entries(facilityGroups).sort((a, b) => {
      const indexA = order.indexOf(a[0]);
      const indexB = order.indexOf(b[0]);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a[0].localeCompare(b[0], "ko");
    });
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
            facilityGroups={sortedFacilityGroups()}
            onGroupClick={handleGroupClick}
            selectedGroup={selectedGroup}
          />
        )}
        {activeSection === "guide" && (
          <StoreContent items={storeItems} onIconClick={handleStoreIconClick} />
        )}
      </div>
    </div>
  );
}

function FacilityContent({ facilityGroups, onGroupClick, selectedGroup }) {
  return (
    <div className="facility-content">
      {facilityGroups.map(([groupName, facilities]) => (
        <div 
          className={`facility-group ${selectedGroup === groupName ? 'selected' : ''}`}
          key={groupName}
          onClick={() => onGroupClick(groupName)}
        >
          <div className="facility-item">
            <span>{groupName}</span>
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
          <Link to={`/storeinfo/${encodeURIComponent(item.name)}`}>
            {item.name}
          </Link>
          <span className="logospace" onClick={() => onIconClick(item.blockId)}>
            <img src={locpin} alt="loc" width="30" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default GuideFloor;