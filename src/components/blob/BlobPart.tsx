import { motion, Variants } from "framer-motion";

import { BlobSvgValues } from "./BlobSvgValues";

export interface BlobPartProps {
  variants: Variants;
  blobSvgValues: BlobSvgValues;
  strokeWidth: number;
}

export const BlobPart = (props: BlobPartProps) => {
  return (
    <motion.path
      variants={props.variants}
      d={props.blobSvgValues.d}
      custom={props.blobSvgValues.color}
      stroke={props.blobSvgValues.color}
      strokeWidth={props.strokeWidth}
    />
  );
};
