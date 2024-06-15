import React, { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';

function FloorImage() {
  const { showImage, setShowImage, canvasRef } = useContext(AppContext);

  useEffect(() => {
    if (showImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = `${process.env.PUBLIC_URL}/img/H_A_1.svg`;
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [showImage, canvasRef]);

  return (
    <>
      <button className="map_button" onClick={() => setShowImage(!showImage)}>
        <img
          src={`${process.env.PUBLIC_URL}/mapimage.png`}
          alt="Icon"
          width="16"
          height="16"
        />
        층별 안내
      </button>
      {showImage && (
        <canvas
          ref={canvasRef}
          className="centered-image"
          width="380"
          height="280"
        />
      )}
    </>
  );
}

export default FloorImage;
