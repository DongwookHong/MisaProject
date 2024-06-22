import React from 'react';
import LocSearch from './LocSearch';
// import AdvertiseQR from "../Fix/AdvertiseQR";
import AdvertiseQR from '../Fix/Advertise_demo';

import DropDown from './Dropdown';
import MapLocation from './MapLocation';
import Guide from './Guide';
import Guide_demo from './Guide_demo';
import PinMove from './PinMove';

function QrPage() {
  return (
    <div>
      <LocSearch />
      <AdvertiseQR />
      <DropDown />
      {/* <MapLocation /> /<Guide_demo /> */}
      <PinMove />
    </div>
  );
}

export default QrPage;
