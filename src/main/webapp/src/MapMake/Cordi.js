import React from 'react';
import hillstateImage from './img/hillstateA1.svg'; // 정확한 파일 이름을 사용합니다.
import 'src/style/MapMake/Cordi.css';

const MapWithMarker = ({ coordinates }) => {
  return (
    <div className="map-container">
      <img src={hillstateImage} alt="Map" className="map-image" />
      {coordinates.map((coord, index) => (
        <div
          key={index}
          className="marker"
          style={{
            left: `${coord.x}%`,
            top: `${coord.y}%`,
          }}>
          ●
        </div>
      ))}
    </div>
  );
};

export default MapWithMarker;
