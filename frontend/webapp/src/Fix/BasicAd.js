import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import '../style/Fix/BasicAd.css';
// import NaverMap from './NaverMap';

// Import images
const adImages = [
  { src: require('../img/91misa.jpeg'), alt: 'Ad Image 1', url: '/blog' },
  { src: require('../img/쥬씨.png'), alt: 'Ad Image 2', url: '/blog' },
  { src: require('../img/용용선생.png'), alt: 'Ad Image 3', url: '/blog' },
];

function Ad() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleImageClick = (url) => {
    history.push(url); // Navigate to the specific Blog component
  };

  return (
    <div>
      <Carousel
        className="carousel-containerAd"
        data-bs-theme="dark"
        activeIndex={currentAdIndex}
        onSelect={(selectedIndex) => setCurrentAdIndex(selectedIndex)}>
        {adImages.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-item-containerAd">
              <img
                className="d-block w-100 carousel-imageAd"
                src={image.src}
                alt={image.alt}
                onClick={() => handleImageClick(image.url)} // Add click handler with specific URL
                style={{ cursor: 'pointer' }} // Change cursor to pointer
              />
            </div>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Ad;
