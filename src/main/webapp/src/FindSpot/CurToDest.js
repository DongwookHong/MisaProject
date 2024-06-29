import React from 'react';
import '../style/FindSpot/CurToDest.css';

function CurToDest({ currentStore }) {
  return (
    <div className="curtodest-container">
      <div className="store-info">
        <div className="store-name">현재 위치</div>
        <div className="store-location">힐스테이트 B동 2층</div>
      </div>
      <div className="store-info">
        <div className="store-name">{currentStore.store_name}</div>
        <div className="store-location">
          {currentStore.building_name} {currentStore.building_dong}{' '}
          {currentStore.floor_number}층
        </div>
      </div>
    </div>
  );
}

export default CurToDest;
