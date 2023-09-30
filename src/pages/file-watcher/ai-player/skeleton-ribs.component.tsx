import { Box } from '@chakra-ui/react';
import { TCvatSampleInfo } from '../../../_const';

type TSkeletonLine = {
  sampleObject: TCvatSampleInfo;
  width: number;
  height: number;
};

function SkeletonRibs({ sampleObject, width, height }: TSkeletonLine) {
  return (
    <>
      {sampleObject.keypoints.right_eye && sampleObject.keypoints.right_ear ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.right_eye.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.right_eye.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.right_ear.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.right_ear.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.left_eye && sampleObject.keypoints.left_ear ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.left_eye.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.left_eye.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.left_ear.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.left_ear.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}

      {sampleObject.keypoints.nose && sampleObject.keypoints.right_eye ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.nose.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.nose.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.right_eye.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.right_eye.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.nose && sampleObject.keypoints.left_eye ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.nose.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.nose.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.left_eye.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.left_eye.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}

      {sampleObject.keypoints.neck && sampleObject.keypoints.nose ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.neck.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.neck.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.nose.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.nose.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}

      {sampleObject.keypoints.neck &&
      sampleObject.keypoints.left_shoulder &&
      sampleObject.keypoints.right_shoulder ? (
        <>
          <Box
            as="line"
            x1={(sampleObject.keypoints.left_shoulder.proj[0] ?? 0) * width}
            y1={(sampleObject.keypoints.left_shoulder.proj[1] ?? 0) * height}
            x2={(sampleObject.keypoints.neck.proj[0] ?? 0) * width}
            y2={(sampleObject.keypoints.neck.proj[1] ?? 0) * height}
            style={{ stroke: 'red', strokeWidth: 0.5 }}
          />
          <Box
            as="line"
            x1={(sampleObject.keypoints.right_shoulder.proj[0] ?? 0) * width}
            y1={(sampleObject.keypoints.right_shoulder.proj[1] ?? 0) * height}
            x2={(sampleObject.keypoints.neck.proj[0] ?? 0) * width}
            y2={(sampleObject.keypoints.neck.proj[1] ?? 0) * height}
            style={{ stroke: 'red', strokeWidth: 0.5 }}
          />
        </>
      ) : null}

      {sampleObject.keypoints.left_shoulder &&
      sampleObject.keypoints.right_shoulder &&
      !sampleObject.keypoints.neck ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.left_shoulder.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.left_shoulder.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.right_shoulder.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.right_shoulder.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}

      {sampleObject.keypoints.left_shoulder &&
      sampleObject.keypoints.left_elbow ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.left_shoulder.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.left_shoulder.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.left_elbow.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.left_elbow.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.right_shoulder &&
      sampleObject.keypoints.right_elbow ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.right_shoulder.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.right_shoulder.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.right_elbow.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.right_elbow.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}

      {sampleObject.keypoints.left_elbow &&
      sampleObject.keypoints.left_wrist ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.left_elbow.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.left_elbow.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.left_wrist.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.left_wrist.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.right_elbow &&
      sampleObject.keypoints.right_wrist ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.right_elbow.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.right_elbow.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.right_wrist.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.right_wrist.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.left_hip &&
      sampleObject.keypoints.left_shoulder ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.left_hip.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.left_hip.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.left_shoulder.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.left_shoulder.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.right_hip &&
      sampleObject.keypoints.right_shoulder ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.right_hip.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.right_hip.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.right_shoulder.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.right_shoulder.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.left_hip && sampleObject.keypoints.right_hip ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.left_hip.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.left_hip.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.right_hip.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.right_hip.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}

      {sampleObject.keypoints.left_knee && sampleObject.keypoints.left_hip ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.left_knee.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.left_knee.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.left_hip.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.left_hip.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.right_knee && sampleObject.keypoints.right_hip ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.right_knee.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.right_knee.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.right_hip.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.right_hip.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}

      {sampleObject.keypoints.left_ankle && sampleObject.keypoints.left_knee ? (
        <Box
          as="line"
          x1={(sampleObject.keypoints.left_ankle.proj[0] ?? 0) * width}
          y1={(sampleObject.keypoints.left_ankle.proj[1] ?? 0) * height}
          x2={(sampleObject.keypoints.left_knee.proj[0] ?? 0) * width}
          y2={(sampleObject.keypoints.left_knee.proj[1] ?? 0) * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
      {sampleObject.keypoints.right_ankle &&
      sampleObject.keypoints.right_knee ? (
        <Box
          as="line"
          x1={sampleObject.keypoints.right_ankle.proj[0] * width}
          y1={sampleObject.keypoints.right_ankle.proj[1] * height}
          x2={sampleObject.keypoints.right_knee.proj[0] * width}
          y2={sampleObject.keypoints.right_knee.proj[1] * height}
          style={{ stroke: 'red', strokeWidth: 0.5 }}
        />
      ) : null}
    </>
  );
}

export default SkeletonRibs;
