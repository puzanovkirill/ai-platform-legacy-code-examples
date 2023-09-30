import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks';
import { selectCurrentProcessId } from '../../../stores/processes/processes.slice';

type TPredictBoxProps = {
  predictBox: [number, number, number, number];
  color?: string;
  objectId: string;
};

function PredictBox({
  predictBox,
  color = 'red',
  objectId,
}: TPredictBoxProps): JSX.Element {
  const currentProcessId = useAppSelector(selectCurrentProcessId);

  return (
    <Box
      pos="absolute"
      bgColor="inherit"
      borderRadius={2.5}
      zIndex={100}
      w={`${predictBox[2] - predictBox[0]}px`}
      h={`${predictBox[3] - predictBox[1]}px`}
      left={`${predictBox[0]}px`}
      top={`${predictBox[1]}px`}
      border={`${objectId === currentProcessId ? '3' : '1'}px solid`}
      borderColor={objectId === currentProcessId ? 'red' : color}
      overflow="visible"
      color={color}
    />
  );
}

export default PredictBox;
