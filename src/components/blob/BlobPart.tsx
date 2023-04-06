import { AnimationControls, m } from "framer-motion";

import { BlobSvgValues } from "./BlobSvgValues";

export interface BlobPartProps {
  blobSvgValues: BlobSvgValues;
  index: number;
  animate: AnimationControls;
}

export interface BlobPartCustom {
  color: string;
  index: number;
}

export const BlobPart = (props: BlobPartProps) => {
  const blobPartCustom: BlobPartCustom = {
    color: props.blobSvgValues.color,
    index: props.index,
  };

  return (
    <m.path
      d={props.blobSvgValues.d}
      custom={blobPartCustom}
      animate={props.animate}
      stroke={props.blobSvgValues.color}
    />
  );
};
