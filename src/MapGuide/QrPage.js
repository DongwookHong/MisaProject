import React from 'react';
import LocSearch from './LocSearch';
import Advertise_qr from '../Fix/Advertise_qr';
import DropDown from './Dropdown';
import MapLocation from './MapLocation';
import Guide from './Guide';

function QrPage() {
  return (
    <div>
      <LocSearch />
      <Advertise_qr />
      <DropDown />
      <MapLocation />
      <Guide />
    </div>
  );
}

export default QrPage;
