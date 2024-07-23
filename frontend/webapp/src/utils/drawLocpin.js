import locpin from "../asset/tool/locpin.png";
import qrLocpin from "../asset/tool/locpin.png"; // QR 위치용 이미지
import toilet  from "../asset/tool/toilet.svg"
import elev  from "../asset/tool/elevator.svg"
import escal  from "../asset/tool/escal.svg"

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

const isFacility = (item) => {
  if (!item) return false;
  const facilityTypes = ['화장실', '에스컬레이터', '엘리베이터', 'facility'];
  return facilityTypes.some(type => 
    (item.name && item.name.includes(type)) || item.type === type
  );
};

export const drawLocpin = (svgDoc, ctx, item, floorData, isQrLocation = false) => {
  let imgSrc;
  if (isQrLocation) {
    imgSrc = qrLocpin;
  } else if (isFacility(item)) {
    if (item.name.includes('엘리베이터') || item.type === '엘리베이터') {
      imgSrc = elev;
    } else {
      imgSrc = locpin; // 화장실과 에스컬레이터를 포함한 다른 모든 시설물에 대해 locpin 사용
    }
  } else {
    imgSrc = locpin;
  }

  const img = new Image();
  img.src = imgSrc;

  let width, height;
  if (isQrLocation) {
    width = height = 70;
  } else if (isFacility(item)) {
    width = height = 40; // 편의시설 핀 크기를 30x30으로 설정
  } else {
    width = height = 60; // 기타 핀 크기는 그대로 50x50
  }

  img.onload = () => {
    if (!item || !floorData) {
      console.log("Item or floorData is missing:", { item, floorData });
      return;
    }

    console.log("Drawing locpin for item:", item);

    let targetElement;
    if (item.blockId) {
      targetElement = svgDoc.getElementById(item.blockId);
      console.log("Searching by blockId:", item.blockId);
    } else {
      console.log("Searching for item by name:", item.name);
      const block = floorData.data.find(dataItem => dataItem.name === item.name);
      console.log("Found block:", block);
      if (block) {
        targetElement = svgDoc.getElementById(block.blockId);
        console.log("Searching by found blockId:", block.blockId);
      }
    }

    if (!targetElement) {
      console.log("Element not found. Trying alternative search...");
      // 대체 검색 방법: data-name 속성으로 검색
      targetElement = svgDoc.querySelector(`[data-name="${item.name}"]`);
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

    if (!isFacility(item) && !isQrLocation) {
      const offsetY = height / 2; // 핀 높이의 절반만큼 위로 이동
      cy -= offsetY;
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
    console.error("Failed to load the image:", imgSrc);
  };
};