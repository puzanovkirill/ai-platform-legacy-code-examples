import { Text } from '@chakra-ui/react';
import {
  useAppSelector,
  useGetSelectedFileId,
  useGetSequence,
} from '../../../../hooks';
import { selectCurrentTime } from '../../../../stores/ai-player/ai-player.slice';

function FrameCount() {
  const { fileId } = useGetSelectedFileId();
  const meta = useGetSequence(fileId).data?.meta ?? { fps: 25 };
  const timestamp = useAppSelector(selectCurrentTime);

  return (
    <Text fontWeight="bold">
      {`( Frame: ${Math.floor(timestamp * meta.fps)} )`}
    </Text>
  );
}

export default FrameCount;
