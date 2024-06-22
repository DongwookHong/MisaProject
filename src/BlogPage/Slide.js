import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Slide.css';

function CarouselDemo() {
  const images = [
    require('../asset/temp/91misa.jpeg'),
    require('../asset/temp/91misa1.jpg'),
    require('../asset/temp/91misa2.jpg'),
    // 추가 이미지 URL을 여기 추가하세요
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={30000}>
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="carousel-controls">
        <button
          onClick={() => setIndex((index + images.length - 1) % images.length)}>
          &lt;
        </button>
        <span>
          {index + 1} / {images.length}
        </span>
        <button onClick={() => setIndex((index + 1) % images.length)}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default CarouselDemo;
