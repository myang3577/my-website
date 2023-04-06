import { Easing, m, TargetAndTransition, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

import blobStyles from "./Blob.module.scss";
import { BlobPart, BlobPartCustom } from "./BlobPart";
import { AllBlobSvgValues } from "./BlobSvgValues";

export const BlobSvg = () => {
  const [screenSize, setDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimensionCallback = () => {
    setDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimensionCallback);

    return () => {
      window.removeEventListener("resize", setDimensionCallback);
    };
  }, [screenSize]);

  const drawBlobAnimationControls = useAnimation();
  const drawDuration = 0.75;

  const drawBlob = async () => {
    await drawBlobAnimationControls.start(
      (blobPartCustom: BlobPartCustom): TargetAndTransition => ({
        pathLength: 0,
        opacity: 0,
        fill: `${blobPartCustom.color}00`,
        strokeWidth: 0.5,
      })
    );

    await drawBlobAnimationControls.start((blobPartCustom: BlobPartCustom): TargetAndTransition => {
      return {
        pathLength: 1,
        opacity: 1,
        fill: `${blobPartCustom.color}ff`,
        strokeWidth: 0,
        transition: {
          pathLength: {
            type: "tween",
            duration: drawDuration,
            bounce: 0,
          },
          opacity: { duration: 0.01 },
          fill: {
            duration: drawDuration,
            ease: "easeIn",
          },
          strokeWidth: { delay: drawDuration, duration: 0.01 },
        },
      };
    });
  };
  const [dx, setDx] = useState<number>(0);
  const [dy, setDy] = useState<number>(0);

  const targetXPos = 10;
  const targetYPos = 10;
  const dScale = 0.5;

  const updateBlobPositionAnimation = () => {
    // Calculations from the .scss styling on the blob.
    const blobHeight = Math.min(300, Math.min(screenSize.dynamicHeight / 2, screenSize.dynamicWidth / 2));

    // `targetYPos - screenSize.dynamicHeight / 2` - Moves the center of the blob to the top of screen.
    // `+ (blobHeight / 2) * dScale` - Adds back half of the blob height to bring it back onto the screen. Take into account the change in scale for the animation as well.
    let newDx = targetXPos - screenSize.dynamicWidth / 2 + (blobHeight / 2) * dScale;
    let newDy = targetYPos - screenSize.dynamicHeight / 2 + (blobHeight / 2) * dScale;

    // When the drag ends, the dx and dy don't change which prevents it from animating so force a tiny change if they are the same to cause an animation.
    if (newDx === dx) {
      newDx += 0.01;
    } else if (newDy === dy) {
      newDy += 0.01;
    }

    setDx(newDx);
    setDy(newDy);
  };

  useEffect(() => {
    updateBlobPositionAnimation();
  }, [screenSize]);

  const [ease, setEase] = useState<Easing>("backInOut");
  const [svgAnimateDelay, setSvgAnimateDelay] = useState<number>(drawDuration);

  useEffect(() => {
    const draw = async () => {
      await drawBlob();

      setEase("backOut");
      setSvgAnimateDelay(0);
    };

    draw();
  }, []);

  return (
    <>
      <div className={blobStyles.blob_container}>
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          className={blobStyles.blob_circle}
          viewBox="0 0 299.86 299.86"
          animate={{
            x: dx,
            y: dy,
            scale: dScale,
            transition: { duration: 1.5, type: "tween", ease: ease, delay: svgAnimateDelay },
          }}
          drag
          onDragEnd={() => updateBlobPositionAnimation()}
          onClick={() => updateBlobPositionAnimation()}
        >
          <m.g transform="translate(182.32 -18.09)">
            {AllBlobSvgValues.map((blobSvgValues, i) => (
              <BlobPart key={i} blobSvgValues={blobSvgValues} index={i} animate={drawBlobAnimationControls} />
            ))}
          </m.g>
        </m.svg>
      </div>
    </>
  );
};
