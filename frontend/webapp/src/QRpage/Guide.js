import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../style/QRpage/Guide_demo.css";
import locpin from "../asset/tool/locpin.png";

function base64EncodeForAPI(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}
function Guide_demo({
  onIconClick,
  floorData,
  selectedFacility,
  selectedStore,
}) {
  const [activeSection, setActiveSection] = useState("facility");
  const navigate = useNavigate();

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

  const handleItemClick = (item, type) => {
    if (type === "store") {
      navigate(`/storeinfo/${base64EncodeForAPI(item)}`);
    } else if (
      type === "facility" &&
      ["화장실", "에스컬레이터", "엘리베이터"].includes(item)
    ) {
      handleIconClick(item, type);
    }
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

    const priorityOrder = ["화장실", "에스컬레이터", "엘리베이터"];
    const sortedFacilities = [...new Set(facilities)].sort((a, b) => {
      const indexA = priorityOrder.indexOf(a);
      const indexB = priorityOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b, "ko");
    });

    return {
      facilityItems: sortedFacilities,
      storeItems: [...new Set(stores)].sort((a, b) => a.localeCompare(b, "ko")),
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
            onItemClick={(item) => handleItemClick(item, "facility")}
            selectedItem={selectedFacility}
            type="facility"
          />
        )}
        {activeSection === "guide" && (
          <FacilityContent
            items={storeItems}
            onIconClick={(item) => handleIconClick(item, "store")}
            onItemClick={(item) => handleItemClick(item, "store")}
            selectedItem={selectedStore}
            type="store"
          />
        )}
      </div>
    </div>
  );
}

function FacilityContent({
  items,
  onIconClick,
  onItemClick,
  selectedItem,
  type,
}) {
  const navigate = useNavigate();

  return (
    <div className="facility-content">
      {items.map((item, index) => (
        <div
          className={`facility-item ${item === selectedItem ? "selected" : ""}`}
          key={index}
          onClick={() =>
            type === "facility" &&
            ["화장실", "에스컬레이터", "엘리베이터"].includes(item)
              ? onItemClick(item, type)
              : null
          }
          style={{
            cursor:
              type === "facility" &&
              ["화장실", "에스컬레이터", "엘리베이터"].includes(item)
                ? "pointer"
                : "default",
          }}
        >
          <span
            className="item-name"
            onClick={(e) => {
              e.stopPropagation();
              if (type === "store") {
                navigate(`/storeinfo/${item}`);
              }
            }}
            style={{ cursor: type === "store" ? "pointer" : "default" }}
          >
            {item}
          </span>
          <span
            className="logospace"
            onClick={(e) => {
              e.stopPropagation();
              onIconClick(item, type);
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={locpin} alt="loc" width="30" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default Guide_demo;
