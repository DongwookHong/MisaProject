import Card_tmp from './Card_tmp';
import MainHeader from '../Fix/MainHeader.js';
import MainFooter from '../Fix/MainFooter.js';
import Arcade from './Arcade.js';

import Ad from '../Fix/Advertise.js';

function Main() {
  return (
    <>
      <MainHeader />
      <Ad />
      {/* <Card_tmp /> */}
      <Arcade />
      <MainFooter />
    </>
  );
}

export default Main;
