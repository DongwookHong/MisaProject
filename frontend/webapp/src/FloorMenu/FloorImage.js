import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";

function FloorImage() {
  const { showImage, canvasRef } = useContext(AppContext);

  useEffect(() => {
    if (showImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const image = new Image();
      image.src = `/img/H_A_1.svg`;
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [showImage, canvasRef]);

  return <></>;
}

export default FloorImage;
