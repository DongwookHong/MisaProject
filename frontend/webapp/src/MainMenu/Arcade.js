import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/MainMenu/Arcade.css';
import hillstateImg from '../asset/logo/Ar1.png'; // 실제 이미지 경로로 교체
import lotteCastleImg from '../asset/logo/Ar2.png';
function Arcade() {
  return (
    <div
      className="arcade-container"
      // style={{ backgroundImage: `url(${build})` }}
    >
      <div
        className="arcade-item"
        // style={{ backgroundImage: `url(${hillstateImg})` }}
        style={{ backgroundImage: `url(${hillstateImg})` }}>
        <div className="overlay">
          <div className="text">힐스테이트</div>
          <div className="arcade-fragment">
            <Link
              to="/floormenu?building=힐스테이트 A동&floor=1"
              className="arcade-direction">
              12BL 바로가기 &gt;
            </Link>
            <Link
              to="/floormenu?building=힐스테이트 B동&floor=1"
              className="arcade-direction">
              11BL 바로가기 &gt;
            </Link>
          </div>
        </div>
      </div>
      <div
        className="arcade-item"
        style={{ backgroundImage: `url(${lotteCastleImg})` }}>
        <div className="overlay">
          <div className="text">롯데 캐슬</div>
          <div className="arcade-fragment">
            <Link
              to="/floormenu?building=롯데캐슬&floor=1"
              className="arcade-direction">
              바로가기 &gt;
            </Link>
            <Link to="/" className="arcade-direction">
              LotteCastle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Arcade;
