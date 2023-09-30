import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { memo, MouseEventHandler, useCallback, useRef } from 'react';
import {
  useAppSelector,
  useGetSelectedFileId,
  useGetSequence,
} from '../../../../hooks';
import { selectLoadingVideoStatus } from '../../../../stores/ai-player/ai-player.slice';
import { Status } from '../../../../_const/types';
import { useGetTimeInfo, useHandlerTimestampChange } from '../../hooks';
import ControlButtons from './control-buttons.widgets';
import FrameCount from './frame-count.component';

type TPlayerTimeline = {
  isPlayerPlacement?: boolean;
};

function PlayerTimeline({ isPlayerPlacement = true }: TPlayerTimeline) {
  const { fileId } = useGetSelectedFileId();
  const { data: sequenceMeta, error } = useGetSequence(fileId);
  const loadingVideoStatus = useAppSelector(selectLoadingVideoStatus);
  const { videoTime, currentProgress } = useGetTimeInfo(
    sequenceMeta?.meta?.duration ?? 0
  );
  const divRef = useRef<HTMLDivElement>(null);
  const handlerClickEvent = useHandlerTimestampChange();

  const handleTimelineClick: MouseEventHandler = useCallback(
    (e) => {
      if (divRef.current && loadingVideoStatus === Status.Success) {
        const position =
          e.clientX - divRef.current.getBoundingClientRect().left;
        handlerClickEvent((position / divRef.current.clientWidth) * 100);
      }
    },
    [handlerClickEvent, loadingVideoStatus]
  );

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  return isPlayerPlacement ? (
    <Flex
      w="full"
      pos="absolute"
      left={0}
      bottom={0}
      py={2}
      px={4}
      gap={2}
      bg="rgba(0, 0, 0, 0.5)"
      opacity={0}
      transition="0.3s all"
      _groupHover={{ opacity: 1 }}
      zIndex={300}
      flexDir="column"
    >
      <Box flexGrow={1} color="white" w="full">
        <Box
          ref={divRef}
          h={1}
          borderRadius="sm"
          bg={loadingVideoStatus === Status.Success ? 'white' : 'gray.600'}
          cursor={
            loadingVideoStatus === Status.Success ? 'pointer' : 'not-allowed'
          }
          onClick={handleTimelineClick}
        >
          <Box
            width={`${currentProgress}%`}
            height={1}
            borderRadius="sm"
            background="blue.400"
            cursor={
              loadingVideoStatus === Status.Success ? 'pointer' : 'not-allowed'
            }
          />
        </Box>
      </Box>
      <HStack spacing={4}>
        <ControlButtons />
        <HStack
          color={loadingVideoStatus === Status.Success ? 'white' : 'gray.600'}
        >
          <Text fontWeight="bold">{videoTime}</Text>
          <FrameCount />
        </HStack>
      </HStack>
    </Flex>
  ) : (
    <Flex w="full" py={2} gap={2} flexDir="column">
      <Box flexGrow={1} color="white" w="full">
        <Box
          ref={divRef}
          h={1}
          borderRadius="sm"
          bg={loadingVideoStatus === Status.Success ? 'white' : 'gray.600'}
          cursor={
            loadingVideoStatus === Status.Success ? 'pointer' : 'not-allowed'
          }
          onClick={handleTimelineClick}
        >
          <Box
            width={`${currentProgress}%`}
            height={1}
            borderRadius="sm"
            background="blue.400"
            cursor={
              loadingVideoStatus === Status.Success ? 'pointer' : 'not-allowed'
            }
          />
        </Box>
      </Box>
      <HStack spacing={4}>
        <ControlButtons />
        <HStack
          color={loadingVideoStatus === Status.Success ? 'white' : 'gray.600'}
        >
          <Text fontWeight="bold">{videoTime}</Text>
          <FrameCount />
        </HStack>
      </HStack>
    </Flex>
  );
}

export default memo(PlayerTimeline);
