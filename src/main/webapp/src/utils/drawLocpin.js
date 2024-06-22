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

export const drawLocpin = (svgDoc, ctx) => {
  const rectIds = ["misa", "용용"];
  const locpinImg = new Image();
  locpinImg.src = locpin; // 절대 경로 사용

  const locpinWidth = 50; // 핀 이미지의 너비 조정
  const locpinHeight = 50; // 핀 이미지의 높이 조정

  locpinImg.onload = () => {
    rectIds.forEach((id) => {
      const targetElement = svgDoc.querySelector(escapeCssSelector(id));
      if (targetElement) {
        const x = parseFloat(targetElement.getAttribute("x")) || 0;
        const y = parseFloat(targetElement.getAttribute("y")) || 0;
        const width = parseFloat(targetElement.getAttribute("width"));
        const height = parseFloat(targetElement.getAttribute("height"));

        if (width === 0 || height === 0) {
          console.log(`Element with ID: ${id} has invalid dimensions.`);
        } else {
          const cx = x + width / 2 - locpinWidth / 2;
          const cy = y + height / 2 - locpinHeight / 2;
          ctx.drawImage(locpinImg, cx, cy, locpinWidth, locpinHeight);
        }
      } else {
        console.log(`Element with ID: ${id} not found.`);
      }
    });

    const pathIds = ["la", "re"];
    pathIds.forEach((id) => {
      const targetElement = svgDoc.querySelector(escapeCssSelector(id));
      if (targetElement) {
        const rect = getManualBoundingRectFromPath(targetElement);
        const cx = rect.x + rect.width / 2 - locpinWidth / 2;
        const cy = rect.y + rect.height / 2 - locpinHeight / 2;

        ctx.drawImage(locpinImg, cx, cy, locpinWidth, locpinHeight);
      } else {
        console.log(`Path with ID: ${id} not found.`);
      }
    });
  };

  locpinImg.onerror = () => {
    console.error("Failed to load the locpin image.");
  };
};
