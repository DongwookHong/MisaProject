import React from 'react';
import '../style/FindSpot/CurToDest.css';

function CurToDest({ currentStore, currentLocation }) {
  // 기본값 설정
  const defaultLocation = {
    buildingName: '',
    buildingDong: '',
    floorNumber: '',
  };
  const defaultStore = {
    storeName: '',
    buildingName: '',
    buildingDong: '',
    floorNumber: '',
  };

  // currentLocation과 currentStore가 존재하는지 확인
  const location = currentLocation || defaultLocation;
  const store = currentStore || defaultStore;

  const renderFloor = (floorNumber) => {
    return floorNumber === '0' ? 'B1층' : `${floorNumber}층`;
  };

  const renderBuildingName = (buildingName, buildingDong) => {
    if (buildingName === "롯데캐슬") return "롯데캐슬";
    if (buildingName === "힐스테이트" && buildingDong === "A") return "힐스테이트 12BL";
    if (buildingName === "힐스테이트" && buildingDong === "B") return "힐스테이트 11BL";
    return `${buildingName} ${buildingDong}동`;
  };

  return (
    <div className="curtodest-container">
      <div className="store-info">
        <div className="store-name">현재 위치</div>
        <div className="store-location">
          {renderBuildingName(location.buildingName, location.buildingDong)}
          {location.floorNumber && ` ${renderFloor(location.floorNumber)}`}
        </div>
      </div>
      <div className="store-info">
        <div className="store-name">{store.storeName}</div>
        <div className="store-location">
          {renderBuildingName(store.buildingName, store.buildingDong)}
          {store.floorNumber && ` ${renderFloor(store.floorNumber)}`}
        </div>
      </div>
    </div>
  );
}

export default CurToDest;