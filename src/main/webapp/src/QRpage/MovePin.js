import React, { useState, useRef } from 'react';
import Guide_demo from './Guide_demo';

function MovePin() {
  const [shouldDrawDot, setShouldDrawDot] = useState(false);
  const canvasRef = useRef(null);

  const handleIconClick = (item) => {
    console.log(`${item} 위치로 이동합니다.`);
    setShouldDrawDot(true);
  };

  return (
    <div>
      {/* <FloorSpecific canvasRef={canvasRef} /> */}
      <Guide_demo onIconClick={handleIconClick} />
    </div>
  );
}

export default MovePin;
