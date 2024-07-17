import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/MainMenu/Arcade.css';

// import hillstateA from '../asset/logo/HillstateA.png';
// import hillstateB from '../asset/logo/HillstateB.png';
// import lotteCastle from '../asset/logo/LotteCastle.png';

import hillstateA from '../asset/logo/hillA.png';
import hillstateB from '../asset/logo/hillB.png';
import lotteCastle from '../asset/logo/hLotte.png';

import hillstateImg from '../asset/logo/Ar1.png'; // 실제 이미지 경로로 교체
import lotteCastleImg from '../asset/logo/Ar2.png';
function Arcade() {
  return (
    <div className="arcade-container">
      <div className="arcade-item" style={{ backgroundImage: `url(${hillstateImg})` }}>
        <div className="overlay">
          <div className="text">힐스테이트</div>
          <div className="arcade-fragment">
            <Link to="/floormenu?building=힐스테이트 A동&floor=1" className="arcade-direction">
              A동 바로가기 &gt;
            </Link>
            <Link to="/floormenu?building=힐스테이트 B동&floor=1" className="arcade-direction">
              B동 바로가기 &gt;
            </Link>
          </div>
        </div>
      </div>
      <div className="arcade-item" style={{ backgroundImage: `url(${lotteCastleImg})` }}>
        <div className="overlay">
          <div className="text">롯데 캐슬</div>
          <div className="arcade-fragment">
            <Link to="/floormenu?building=롯데캐슬&floor=1" className="arcade-direction">
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
