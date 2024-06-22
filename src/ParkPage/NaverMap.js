import React, { useEffect } from 'react';
import '../style/ParkPage/NaverMap.css';

function NaverMap({ latitude, longitude }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=xxx`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(latitude, longitude),
        zoom: 15,
        zoomControl: true, // 줌 컨트롤러 활성화
        zoomControlOptions: {
          position: window.naver.maps.Position.RIGHT_CENTER,
        },
      };
      const map = new window.naver.maps.Map('map', mapOptions);

      const contentString = `
        <div style="position: relative; background: white; border: 0px solid black; padding: 5px;">
          <div style="font-weight: bold; text-align: center;">MISA RoDeo</div>
          <div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid black;"></div>
        </div>
      `;

      const infowindow = new window.naver.maps.InfoWindow({
        content: contentString,
        disableAnchor: true,
        pixelOffset: new window.naver.maps.Point(0, -20),
      });

      infowindow.open(map, new window.naver.maps.LatLng(latitude, longitude));
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return (
    <div>
      <div
        id="map"
        style={{
          marginTop: '20px',
          width: '95%',
          height: '400px',
          borderRadius: '10px',
          marginLeft: '2.5%',
        }}></div>
    </div>
  );
}

export default NaverMap;
