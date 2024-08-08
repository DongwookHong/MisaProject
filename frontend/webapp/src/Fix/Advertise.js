import React from 'react';
import '../style/Fix/Advertise.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

function Advertise() {
  const bannerImage = ['/ban/ad1.png', '/ban/ad2.png'];
  const bannerLinks = ['/pocha', '/findad'];
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
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="banner-container" {...handlers}>
      <Banner imageUrl={bannerImage[curIdx]} linkTo={bannerLinks[curIdx]} />
      <div className="slide-indicator">
        {curIdx + 1} / {bannerImage.length}
      </div>
    </div>
  );
}

function Banner({ imageUrl, linkTo }) {
  return (
    <div className="main_ban">
      <div className="banner-content">
        <Link to={linkTo}>
          <img className="ban" src={imageUrl} alt="banner" />
        </Link>
      </div>
    </div>
  );
}

export default Advertise;