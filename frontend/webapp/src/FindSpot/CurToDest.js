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

  return (
    <div className="curtodest-container">
      <div className="store-info">
        <div className="store-name">현재 위치</div>
        <div className="store-location">
          {location.buildingName}
          {location.buildingDong && ` ${location.buildingDong}동`}
          {location.floorNumber && ` ${renderFloor(location.floorNumber)}`}
        </div>
      </div>
      <div className="store-info">
        <div className="store-name">{store.storeName}</div>
        <div className="store-location">
          {store.buildingName}
          {store.buildingDong && ` ${store.buildingDong}동`}
          {store.floorNumber && ` ${renderFloor(store.floorNumber)}`}
        </div>
      </div>
    </div>
  );
}

export default CurToDest;
