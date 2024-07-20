import React from 'react';
import '../style/FindSpot/CurToDest.css';

function CurToDest({ currentStore, currentLocation }) {
  // 기본값 설정
  const defaultLocation = { buildingName: '', buildingDong: '', floorNumber: '' };
  const defaultStore = { storeName: '', buildingName: '', buildingDong: '', floorNumber: '' };

  // currentLocation과 currentStore가 존재하는지 확인
  const location = currentLocation || defaultLocation;
  const store = currentStore || defaultStore;

  return (
    <div className="curtodest-container">
      <div className="store-info">
        <div className="store-name">현재 위치</div>
        <div className="store-location">
          {location.buildingName}
          {location.buildingDong && ` ${location.buildingDong}동`}
          {location.floorNumber && ` ${location.floorNumber}층`}
        </div>
      </div>
      <div className="store-info">
        <div className="store-name">{store.storeName}</div>
        <div className="store-location">
          {store.buildingName}
          {store.buildingDong && ` ${store.buildingDong}동`}
          {store.floorNumber && ` ${store.floorNumber}층`}
        </div>
      </div>
    </div>
  );
}

export default CurToDest;