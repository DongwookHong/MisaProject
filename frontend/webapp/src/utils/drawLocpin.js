import locpin from "../asset/tool/locpin.png";

const escapeCssSelector = (id) => {
  return `#${CSS.escape(id)}`;
};

const getManualBoundingRectFromPath = (pathElement) => {
  const pathLength = pathElement.getTotalLength();
  const points = [];
  for (let i = 0; i < pathLength; i += pathLength / 10) {
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


export const drawLocpin = (svgDoc, ctx, selectedItem, floorData) => {
  const locpinImg = new Image();
  locpinImg.src = locpin;

  const locpinWidth = 50;
  const locpinHeight = 50;

  locpinImg.onload = () => {
    if (!selectedItem || !floorData) return;

    const selectedBlock = floorData.data.find(item => item.name === selectedItem);
    if (!selectedBlock) {
      console.log(`Selected item ${selectedItem} not found in floor data.`);
      return;
    }

    const targetElement = svgDoc.getElementById(selectedBlock.blockId);
    if (!targetElement) {
      console.log(`Element with ID: ${selectedBlock.blockId} not found in SVG.`);
      return;
    }

    let cx, cy;

    if (targetElement.tagName.toLowerCase() === 'path') {
      const rect = getManualBoundingRectFromPath(targetElement);
      cx = rect.x + rect.width / 2 - locpinWidth / 2;
      cy = rect.y + rect.height / 2 - locpinHeight / 2;
    } else {
      const x = parseFloat(targetElement.getAttribute("x")) || 0;
      const y = parseFloat(targetElement.getAttribute("y")) || 0;
      const width = parseFloat(targetElement.getAttribute("width"));
      const height = parseFloat(targetElement.getAttribute("height"));

      if (width === 0 || height === 0) {
        console.log(`Element with ID: ${selectedBlock.blockId} has invalid dimensions.`);
        return;
      }

      cx = x + width / 2 - locpinWidth / 2;
      cy = y + height / 2 - locpinHeight / 2;
    }

    ctx.drawImage(locpinImg, cx, cy, locpinWidth, locpinHeight);
  };

  locpinImg.onerror = () => {
    console.error("Failed to load the locpin image.");
  };
};