import React from 'react';
import LocSearch from './LocSearch';
import AdvertiseQR from '../Fix/AdvertiseQR';

import DropDown from './Dropdown';
import MapLocation from './MapLocation';
import Guide from './Guide';
import Guide_demo from './Guide_demo';
import PinMove from './PinMove';
import MainFooter from '../Fix/MainFooter';

function QrPage() {
  return (
    <div>
      <LocSearch />
      <AdvertiseQR />
      <DropDown />
      {/* <MapLocation /> */}
      {/* <Guide_demo /> */}
      <PinMove />
      <MainFooter />
    </div>
  );
}

export default QrPage;
