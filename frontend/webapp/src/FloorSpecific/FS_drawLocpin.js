import locpin from "../asset/tool/locpin.png";
import elev from "../asset/tool/elevator.svg";

const getBoundingBox = (element) => {
  if (element.tagName.toLowerCase() === "g") {
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
    return getManualBoundingRectFromPath(element);
  } else {
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

  const elevImg = new Image();
  elevImg.src = elev;

  const locpinWidth = isFacility ? 40 : 60;
  const locpinHeight = isFacility ? 40 : 60;

  const drawImages = () => {
    if (!selectedBlockIds || selectedBlockIds.length === 0 || !svgDoc) return;

    console.log(
      `Drawing ${isFacility ? "facility" : "store"} icons for blockIds:`,
      selectedBlockIds
    );

    selectedBlockIds.forEach((blockId) => {
      const targetElement = svgDoc.getElementById(blockId);
      if (!targetElement) {
        console.log(`Element with ID: ${blockId} not found in SVG.`);
        return;
      }

      const bbox = getBoundingBox(targetElement);

      let cx = bbox.x + bbox.width / 2;
      let cy = bbox.y + bbox.height / 2;

      const isElevator =
        isFacility &&
        (targetElement.id.toLowerCase().includes("elevator") ||
          targetElement.id.toLowerCase().includes("엘리베이터") ||
          (floorData.data.find((item) => item.blockId === blockId)?.name || "")
            .toLowerCase()
            .includes("엘리베이터"));

      console.log(
        `Checking element ${blockId}: isFacility=${isFacility}, isElevator=${isElevator}`
      );

      if (isElevator) {
        console.log(`Drawing elevator icon for ${blockId}`);
        // 엘리베이터 이미지를 원본 크기로 그립니다.
        ctx.drawImage(elevImg, cx - elevImg.width / 2, cy - elevImg.height / 2);
        console.log(
          `Drew elevator icon at (${cx - elevImg.width / 2}, ${
            cy - elevImg.height / 2
          }) with size ${elevImg.width}x${elevImg.height}`
        );
      } else {
        console.log(`Drawing locpin for ${blockId}`);
        let pinX = cx - locpinWidth / 2;
        let pinY = cy - locpinHeight / 2;

        if (!isFacility) {
          const offsetY = locpinHeight / 2;
          pinY -= offsetY;
        }

        ctx.drawImage(locpinImg, pinX, pinY, locpinWidth, locpinHeight);
        console.log(
          `Drew locpin at (${pinX}, ${pinY}) with size ${locpinWidth}x${locpinHeight}`
        );
      }
    });
  };

  let loadedImages = 0;
  const onImageLoad = () => {
    loadedImages++;
    if (loadedImages === 2) {
      drawImages();
    }
  };

  locpinImg.onload = onImageLoad;
  elevImg.onload = onImageLoad;

  locpinImg.onerror = () => {
    console.error("Failed to load the locpin image.");
    loadedImages++;
  };

  elevImg.onerror = () => {
    console.error("Failed to load the elevator image.");
    loadedImages++;
  };
};
