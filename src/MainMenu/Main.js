import React, { useState } from 'react';
import CardMenu from './CardMenu';
import MainHeader from '../Fix/MainHeader.js';
import MainFooter from '../Fix/MainFooter.js';

import Ad from '../Fix/Advertise.js';

function Main() {
  return (
    <>
      <MainHeader />
      <Ad />
      <CardMenu />
      <MainFooter />
    </>
  );
}

export default Main;
