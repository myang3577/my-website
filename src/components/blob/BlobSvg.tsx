import "./Blob.scss";

import { motion } from "framer-motion";

import { BlobPart } from "./BlobPart";
import { AllBlobSvgValues } from "./BlobSvgValues";

// TODO: see if there is a way to only draw stroke on inside of SVG

export const BlobSvg = () => {
  const strokeWidth = 0.5;

  const draw = {
    hidden: (fillColor: string) => ({
      pathLength: 0,
      opacity: 0,
      fill: `${fillColor}00`,
      strokeWidth: 0.5,
    }),
    visible: (fillColor: string) => ({
      pathLength: 1,
      opacity: 1,
      fill: `${fillColor}ff`,
      strokeWidth: 0,
      transition: {
        pathLength: { delay: 1, type: "spring", duration: 10, bounce: 0 },
        opacity: { delay: 1, duration: 0.01 },
        fill: { delay: 0.5, duration: 2, ease: [1, 0, 0.8, 1] },
        strokeWidth: { delay: 2.5, duration: 0.01 },
      },
    }),
  };

  return (
    <>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="blob"
        initial="hidden"
        animate="visible"
        viewBox="0 0 299.86 299.86"
      >
        <motion.g transform="translate(182.32 -18.09)">
          {AllBlobSvgValues.map((blobSvgValues, i) => (
            <BlobPart
              key={i}
              variants={draw}
              blobSvgValues={blobSvgValues}
              strokeWidth={strokeWidth}
            />
          ))}
        </motion.g>
      </motion.svg>
    </>
  );
};
