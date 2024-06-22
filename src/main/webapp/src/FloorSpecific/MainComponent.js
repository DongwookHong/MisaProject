import React, { useState, useRef } from "react";
import GuideFloor from "./GuideFloor";
import FloorSpecific from "./FloorSpecific";
import Guide from "../MapGuide/Guide_demo";
import MainFooter from "../Fix/MainFooter";

function MainComponent() {
  const [shouldDrawDot, setShouldDrawDot] = useState(false);
  const canvasRef = useRef(null);

  const handleIconClick = (item) => {
    console.log(`${item} 위치로 이동합니다.`);
    setShouldDrawDot(true);
  };

  return (
    <div>
      <FloorSpecific canvasRef={canvasRef} />
      {/* <GuideFloor onIconClick={handleIconClick} /> */}
      <Guide onIconClick={handleIconClick} />
      <MainFooter />
    </div>
  );
}

export default MainComponent;
