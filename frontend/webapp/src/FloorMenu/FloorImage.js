import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";

function FloorImage() {
  const { showImage, setShowImage, canvasRef } = useContext(AppContext);

  useEffect(() => {
    if (showImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
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
      <button className="map_button">
        <Link to={"/floorspecific"}>
          <img
            src={`${process.env.PUBLIC_URL}/mapimage.png`}
            alt="Icon"
            width="16"
            height="16"
          />
          층별 안내
        </Link>
      </button>
    </>
  );
}

export default FloorImage;
