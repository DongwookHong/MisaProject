/* eslint-disable */

import React from 'react';
import '../style/Fix/Advertise.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Advertise() {
  const bannerImage = ['/ban/ad1.png', '/ban/ad2.png'];
  const [curIdx, setcurIdx] = useState(0);

  const nextImage = () => {
    setcurIdx((prevIndex) =>
      prevIndex === bannerImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // 6초마다 전환
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 제거
  }, [nextImage]); // nextImage를 의존성 배열에 포함

  return (
    <>
      <Banner imageUrl={bannerImage[curIdx]} />
    </>
  );
}

function Banner({ imageUrl }) {
  return (
    <div className="main_ban">
      <div className="banner-content">
        <Link to="/store0">
          <img className="ban" src={imageUrl} alt="banner" />
        </Link>
      </div>
    </div>
  );
}

export default Advertise;
