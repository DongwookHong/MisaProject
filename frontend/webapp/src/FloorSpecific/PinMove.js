// import React, { useState, useRef } from "react";
// import Guide_demo from "./Guide_demo";
// import FS_FloorSpecific from "./FS_FloorSpecific";

// function PinMove({ floorData, selectedFloorData }) {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const canvasRef = useRef(null);

//   const handleIconClick = (item) => {
//     console.log(`${item} 위치로 이동합니다.`);
//     setSelectedItem(item);
//   };

//   return (
//     <div>
//       <FS_FloorSpecific
//         canvasRef={canvasRef}
//         selectedItem={selectedItem}
//         selectedFloorData={selectedFloorData}
//       />
//       <GuideFloor
//         onIconClick={handleIconClick}
//         floorData={selectedFloorData ? [selectedFloorData] : floorData}
//       />
//     </div>
//   );
// }

// export default PinMove;