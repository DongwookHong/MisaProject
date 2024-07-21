import locpin from "../asset/tool/locpin.png";

const getBoundingBox = (element) => {
  if (element.tagName.toLowerCase() === "g") {
    // For group elements, calculate bounding box of all child elements
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    element.childNodes.forEach((child) => {
      if (child.getBBox) {
        const bbox = child.getBBox();
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
      }
    });
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  } else if (element.tagName.toLowerCase() === "path") {
    // For path elements, use manual calculation
    return getManualBoundingRectFromPath(element);
  } else {
    // For other elements, use getBBox
    return element.getBBox();
  }
};

const getManualBoundingRectFromPath = (pathElement) => {
  const pathLength = pathElement.getTotalLength();
  const points = [];
  for (let i = 0; i <= pathLength; i += pathLength / 100) {
    const point = pathElement.getPointAtLength(i);
    points.push(point);
  }
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin,
  };
};

export const FS_drawLocpin = (
  svgDoc,
  ctx,
  selectedBlockIds,
  floorData,
  isFacility
) => {
  const locpinImg = new Image();
  locpinImg.src = locpin;

  const locpinWidth = isFacility ? 30 : 50;
  const locpinHeight = isFacility ? 30 : 50;

  locpinImg.onload = () => {
    if (!selectedBlockIds || selectedBlockIds.length === 0 || !svgDoc) return;

    console.log(
      `Drawing ${isFacility ? "facility" : "store"} locpins for blockIds:`,
      selectedBlockIds
    );

    selectedBlockIds.forEach((blockId) => {
      const targetElement = svgDoc.getElementById(blockId);
      if (!targetElement) {
        console.log(`Element with ID: ${blockId} not found in SVG.`);
        return;
      }

      const bbox = getBoundingBox(targetElement);

      let cx = bbox.x + bbox.width / 2 - locpinWidth / 2;
      let cy = bbox.y + bbox.height / 2 - locpinHeight / 2;

      if (!isFacility) {
        const offsetY = locpinHeight / 2; // 핀 높이의 절반만큼 위로 이동
        cy -= offsetY;
      }

      ctx.drawImage(locpinImg, cx, cy, locpinWidth, locpinHeight);
      console.log(
        `Drew ${
          isFacility ? "facility" : "store"
        } locpin for blockId: ${blockId} at (${cx}, ${cy}) with size ${locpinWidth}x${locpinHeight}`
      );
    });
  };

  locpinImg.onerror = () => {
    console.error("Failed to load the locpin image.");
  };
};
