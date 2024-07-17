import locpin from "../asset/tool/locpin.png";
import qrLocpin from "../asset/tool/locpin.png"; // QR 위치용 이미지

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

export const drawLocpin = (svgDoc, ctx, item, floorData, isQrLocation = false) => {
  const img = new Image();
  img.src = isQrLocation ? qrLocpin : locpin;

  const width = isQrLocation ? 60 : 50;
  const height = isQrLocation ? 60 : 50;

  img.onload = () => {
    if (!item || !floorData) return;

    let targetElement;
    if (item.blockId) {
      targetElement = svgDoc.getElementById(item.blockId);
    } else {
      const block = floorData.data.find(dataItem => dataItem.name === item.name);
      if (block) {
        targetElement = svgDoc.getElementById(block.blockId);
      }
    }

    if (!targetElement) {
      console.log(`Element not found for item:`, item);
      return;
    }

    let cx, cy;

    if (targetElement.tagName.toLowerCase() === 'path') {
      const rect = getManualBoundingRectFromPath(targetElement);
      cx = rect.x + rect.width / 2 - width / 2;
      cy = rect.y + rect.height / 2 - height / 2;
    } else {
      const x = parseFloat(targetElement.getAttribute("x")) || 0;
      const y = parseFloat(targetElement.getAttribute("y")) || 0;
      const elementWidth = parseFloat(targetElement.getAttribute("width"));
      const elementHeight = parseFloat(targetElement.getAttribute("height"));

      if (elementWidth === 0 || elementHeight === 0) {
        console.log(`Element has invalid dimensions:`, targetElement);
        return;
      }

      cx = x + elementWidth / 2 - width / 2;
      cy = y + elementHeight / 2 - height / 2;
    }

    // 현재 위치 표시 (QR 위치)
    if (isQrLocation) {
      ctx.beginPath();
      ctx.arc(cx + width / 2, cy + height / 2, width / 2 + 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.fill();
    }

    ctx.drawImage(img, cx, cy, width, height);

    // 디버깅을 위한 로그
    console.log(`Drawing locpin for element:`, targetElement);
    console.log(`Locpin position: (${cx}, ${cy}), size: ${width}x${height}`);
    console.log(`Is QR Location: ${isQrLocation}`);
  };

  img.onerror = () => {
    console.error("Failed to load the locpin image.");
  };
};