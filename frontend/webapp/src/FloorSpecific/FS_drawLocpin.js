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

export const FS_drawLocpin = (svgDoc, ctx, selectedBlockId, floorData) => {
  const locpinImg = new Image();
  locpinImg.src = locpin;

  const locpinWidth = 50;
  const locpinHeight = 50;

  locpinImg.onload = () => {
    if (!selectedBlockId || !svgDoc) return;

    const targetElement = svgDoc.getElementById(selectedBlockId);
    if (!targetElement) {
      console.log(`Element with ID: ${selectedBlockId} not found in SVG.`);
      return;
    }

    const bbox = getBoundingBox(targetElement);

    const cx = bbox.x + bbox.width / 2 - locpinWidth / 2;
    const cy = bbox.y + bbox.height / 2 - locpinHeight / 2;

    ctx.drawImage(locpinImg, cx, cy, locpinWidth, locpinHeight);
  };

  locpinImg.onerror = () => {
    console.error("Failed to load the locpin image.");
  };
};
