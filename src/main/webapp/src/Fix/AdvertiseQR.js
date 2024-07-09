/* eslint-disable */
import React from 'react';
import '../style/Fix/AdvertiseQR.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

function AdvertiseQR() {
  const bannerImage = ['/ban/ad1.png', '/ban/ad2.png'];
  const [curIdx, setCurIdx] = useState(0);

  const nextImage = () => {
    setCurIdx((prevIndex) =>
      prevIndex === bannerImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurIdx((prevIndex) =>
      prevIndex === 0 ? bannerImage.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // 5초마다 전환
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 제거
  }, []); // 빈 배열로 변경하여 nextImage 함수만 사용

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="banner-container" {...handlers}>
      <Banner imageUrl={bannerImage[curIdx]} />
      <div className="slide-indicator">
        {curIdx + 1} / {bannerImage.length}
      </div>
    </div>
  );
}

function Banner({ imageUrl }) {
  return (
    <div className="main_ban_qr">
      <div className="banner-content">
        <Link to="/store0">
          <img className="ban" src={imageUrl} alt="banner" />
        </Link>
      </div>
    </div>
  );
}

export default AdvertiseQR;
