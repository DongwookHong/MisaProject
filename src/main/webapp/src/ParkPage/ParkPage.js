import React from 'react';

import Ad from '../Fix/Advertise.js';
import NaverMap from './NaverMap.js';
import ParkingDetail from './ParkingDetail.js';
import MainHeader from '../Fix/MainHeader.js';
import MainFooter from '../Fix/MainFooter.js';
function Parking() {
  return (
    <div>
      {/* console.log('Naver Client ID:', process.env.REACT_APP_NAVER_CLIENT_ID); */}
      <MainHeader />
      <Ad />
      <NaverMap latitude={37.5637} longitude={127.19113} />
      <ParkingDetail />
      <MainFooter />
    </div>
  );
}

export default Parking;
