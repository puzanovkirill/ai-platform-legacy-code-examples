import { Box } from '@chakra-ui/react';

type SkeletonKeypoints = {
  objectKeypoints: [number, number];
};

function SkeletonKeypoints({ objectKeypoints }: SkeletonKeypoints) {
  return (
    <Box
      as="circle"
      r={1.5}
      cx={objectKeypoints[0]}
      cy={objectKeypoints[1]}
      fill="red"
    />
  );
}

export default SkeletonKeypoints;
