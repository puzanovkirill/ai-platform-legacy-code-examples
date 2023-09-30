import { Box } from '@chakra-ui/react';
import { memo } from 'react';
import useGetSample from './use-get-sample.hook';
import PredictBox from './predict-box.element';
import SampleSkeleton from './sample-skeleton.component';
import { TMarkupSettings } from '../control-panel/markup-settings';

type TSPredictArea = {
  width: number;
  height: number;
};

type TPredictArea = TSPredictArea & {
  frame: number | null;
  markupSettings: TMarkupSettings;
};

function PredictArea({
  width,
  height,
  frame,
  markupSettings,
}: TPredictArea): JSX.Element | null {
  const { samples, error, isValidating, cvatSamples } = useGetSample();

  if (error || isValidating || !frame) return null;

  return (
    <Box w={width} h={height} pos="absolute">
      <Box w={width} h={height} pos="relative">
        {markupSettings.traces &&
          samples &&
          samples
            .find((sample) => sample.frame_index === frame)
            ?.objects.map((object) => (
              <PredictBox
                key={object.id}
                objectId={object.id}
                predictBox={[
                  object.bbox[0] * width,
                  object.bbox[1] * height,
                  object.bbox[2] * width,
                  object.bbox[3] * height,
                ]}
                color="blue.300"
              />
            ))}
        {markupSettings.gt &&
          cvatSamples &&
          cvatSamples
            .find((sample) => sample.frame_index === frame)
            ?.objects.map((object) =>
              object?.bbox ? (
                <PredictBox
                  key={object.id}
                  objectId={object.id}
                  predictBox={[
                    object.bbox[0] * width,
                    object.bbox[1] * height,
                    object.bbox[2] * width,
                    object.bbox[3] * height,
                  ]}
                  color="green.500"
                />
              ) : null
            )}
        {markupSettings.skeleton &&
          cvatSamples &&
          cvatSamples
            .find((sample) => sample.frame_index === frame)
            ?.objects.map((object) =>
              object?.keypoints ? (
                <SampleSkeleton
                  height={height}
                  width={width}
                  sampleObject={object}
                  key={`${object.id}${object.class}skeleton`}
                />
              ) : null
            )}
      </Box>
    </Box>
  );
}

export default memo(PredictArea);
