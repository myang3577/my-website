import "./Refresh.scss";

import { motion } from "framer-motion";
import { useState } from "react";

import { Slider } from "@mui/material";

import {
  BlobPart1,
  BlobPart2,
  BlobPart3,
  BlobPart4,
  BlobPart5,
  BlobPart6,
  BlobPart7
} from "./BlobSvgValues";

export const Blob = () => {
  const [pathLength, setPathLength] = useState<number>(0);
  const strokeWidth = 2;

  const draw = {
    hidden: (color: string) => {
      console.log(color);
      return { pathLength: 0, opacity: 0, fill: `${color}00` };
    },
    visible: (color: string) => {
      return {
        pathLength: 1,
        opacity: 1,
        fill: `${color}0`,
        transition: {
          pathLength: { delay: 1, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay: 1, duration: 0.01 },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] },
        },
      };
    },
  };

  return (
    <>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="blob"
        initial="hidden"
        animate="visible"
        viewBox="0 0 142.88 142.88"
      >
        <motion.g transform="translate(205.04 41.94)">
          <motion.path
            variants={draw}
            d={BlobPart1.d}
            custom={BlobPart1.color}
            stroke={BlobPart1.color}
            strokeWidth={strokeWidth}
          />
          <motion.path
            variants={draw}
            d={BlobPart2.d}
            custom={BlobPart2.color}
            strokeWidth={strokeWidth}
          />
          <motion.path
            variants={draw}
            d={BlobPart3.d}
            custom={BlobPart3.color}
            strokeWidth={strokeWidth}
          />
          <motion.path
            variants={draw}
            d={BlobPart4.d}
            custom={BlobPart4.color}
            strokeWidth={strokeWidth}
          />
          <motion.path
            variants={draw}
            d={BlobPart5.d}
            custom={BlobPart5.color}
            strokeWidth={strokeWidth}
          />
          <motion.path
            variants={draw}
            d={BlobPart6.d}
            custom={BlobPart6.color}
            strokeWidth={strokeWidth}
          />
          <motion.path
            variants={draw}
            d={BlobPart7.d}
            custom={BlobPart7.color}
            strokeWidth={strokeWidth}
          />
        </motion.g>
      </motion.svg>
    </>
  );
};
