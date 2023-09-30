import { Fragment } from 'react';
import { TCvatSampleInfo } from '../../../_const';
import SkeletonKeypoints from './skeleton-keypoints.component';
import SkeletonRibs from './skeleton-ribs.component';

type TSampleSkeleton = {
  sampleObject: TCvatSampleInfo;
  width: number;
  height: number;
};

function SampleSkeleton({ sampleObject, width, height }: TSampleSkeleton) {
  return (
    <svg style={{ position: 'absolute' }} height={height} width={width}>
      {Object.keys(sampleObject.keypoints).map((keypoint) => (
        <Fragment
          key={`${sampleObject.id}${keypoint}${sampleObject.keypoints[keypoint].proj[0]}${sampleObject.keypoints[keypoint].proj[1]}`}
        >
          <SkeletonRibs
            width={width}
            height={height}
            sampleObject={sampleObject}
          />
          <SkeletonKeypoints
            objectKeypoints={[
              sampleObject.keypoints[keypoint].proj[0] * width,
              sampleObject.keypoints[keypoint].proj[1] * height,
            ]}
          />
        </Fragment>
      ))}
    </svg>
  );
}

export default SampleSkeleton;
