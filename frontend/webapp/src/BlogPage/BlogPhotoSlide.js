import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/BlogPage/Slide.css';

function CarouselDemo({ imageUrls }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={true}
        indicators={true}
        interval={null}>
        {imageUrls.map((imageUrl, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={imageUrl}
              alt={`Slide ${idx}`}
              style={{ objectFit: 'cover', height: '400px' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="carousel-controls">
        <button
          onClick={() => setIndex((index + imageUrls.length - 1) % imageUrls.length)}>
          &lt;
        </button>
        <span>
          {index + 1} / {imageUrls.length}
        </span>
        <button onClick={() => setIndex((index + 1) % imageUrls.length)}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default CarouselDemo;