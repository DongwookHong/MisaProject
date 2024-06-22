import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

// Import images

import '../style/BlogPage/BlogPage.css';

const adImages = [
  { src: `${process.env.PUBLIC_URL}/img/91misa.jpeg`, alt: 'First slide' },
  { src: `${process.env.PUBLIC_URL}/img/91misa1.jpeg`, alt: 'Second slide' },
  { src: `${process.env.PUBLIC_URL}/img/91misa2.jpeg`, alt: 'Third slide' },
];

function Carousels() {
  return (
    <Carousel className="carousel-container" data-bs-theme="dark">
      {adImages.map((image, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-item-container">
            <img
              className="d-block w-100 carousel-image"
              src={image.src}
              alt={image.alt}
            />
          </div>
          <Carousel.Caption>{/* Caption for the slide */}</Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carousels;
