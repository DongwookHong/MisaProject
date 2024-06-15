import React from 'react';
import { Link } from 'react-router-dom';
import '../style/SearchShop/SearchShop.css';
import MainHeader from '../Fix/MainHeader.js';
import MainFooter from '../Fix/MainFooter.js';
import Banner from '../Fix/MenuOpen.js';
import Ad from '../Fix/Advertise.js';

function SearchShop() {
  return (
    <div>
      <MainHeader />
      <Banner />
      <Ad />
      <div className="Changefont">
        <p>현재 계신곳은 힐스테이트 A동 1층입니다.</p>
        <p>91MiSA 는 힐스테이트 B동 1층에 있습니다.</p>
      </div>
      <div className="ImageContainer">
        <img
          src={`${process.env.PUBLIC_URL}/mapcollect/misa1.svg`}
          alt="Hillstate"
        />
      </div>
      <div className="BlogLink">
        <Link to="/store0" className="HomepageLink">
          <img
            src={`${process.env.PUBLIC_URL}/img/blog.png`}
            alt="Blog"
            className="HomepageIcon"
          />
          <span className="BlogText">블로그 바로가기</span>
        </Link>
      </div>
      <MainFooter />
    </div>
  );
}

export default SearchShop;
