/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
import { Center, Flex } from '@chakra-ui/react';
import { debounce, DebouncedFunc } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import { ThreeDotsLoading } from '../../../components';
import {
  useAppDispatch,
  useAppSelector,
  useGetPreviewVideo,
  useGetSelectedFileId,
} from '../../../hooks';
import {
  selectIsStartFileBlobDownload,
  selectLoadingVideoStatus,
  setLoadingVideoStatus,
} from '../../../stores/ai-player/ai-player.slice';
import { Status } from '../../../_const/types';
import { get } from '../../../_helpers/requests.helper';
import { TMarkupSettings } from '../control-panel/markup-settings';
import PlayerTimeline from './player-timeline';
import PredictArea from './predict-area.widget';
import usePlayerAction from './use-player-action.hook';
import usePlayerState from './use-player-state.hook';

type TAIPlayer = {
  markupSettings: TMarkupSettings;
};

function AIPlayer({ markupSettings }: TAIPlayer) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);
  const [currentFrame, setCurrentFrame] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const isStartFileDownload = useAppSelector(selectIsStartFileBlobDownload);
  const videoStatus = useAppSelector(selectLoadingVideoStatus);
  const { fileId } = useGetSelectedFileId();
  const { isPlay, timeStamp, volume } = usePlayerState();
  const { data: previewImgSrc, clearPreviewMemory } =
    useGetPreviewVideo(fileId);
  const { handlerEndedVideo, handlerOnPauseVideo } = usePlayerAction({
    videoRef,
    fileId,
    setCurrentFrame,
  });

  const debounceGetCurrentFrame = useRef<DebouncedFunc<() => void>>();

  useEffect(() => {
    debounceGetCurrentFrame.current = debounce(handlerOnPauseVideo, 1000);
    return () => {
      handlerEndedVideo();
    };
  }, [fileId]);

  useEffect(() => {
    let url: string | undefined;

    if (isStartFileDownload && !isFileLoaded) {
      dispatch(setLoadingVideoStatus(Status.Progress));
      get(`/sequence/${fileId}/video/`)
        .then((blob: Blob) => {
          url = URL.createObjectURL(blob);

          if (videoRef.current && !videoRef.current.src) {
            videoRef.current.src = url;
            videoRef.current.load();
            dispatch(setLoadingVideoStatus(Status.Success));
            setIsFileLoaded(true);
            videoRef.current.play().catch(() => console.log('Playing error'));
          }
        })
        .catch(() => {
          dispatch(setLoadingVideoStatus(Status.Failure));
        });
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [isStartFileDownload]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlay && videoRef.current.duration) {
        videoRef.current.play().catch((error) => console.error(error));
      } else {
        videoRef.current?.pause();
      }

      if (timeStamp !== undefined) {
        videoRef.current.currentTime = timeStamp;
      }
    }
  }, [isPlay, timeStamp]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <Flex flexGrow={1} maxH="calc(100% - 96px)">
      <Center flexGrow={1} w="full" h="full" pos="relative" role="group">
        {videoStatus === Status.Progress ? (
          <Center position="absolute">
            <ThreeDotsLoading size="12px" bg="blue.400" />
          </Center>
        ) : null}
        <video
          style={{
            objectFit: 'fill',
            maxWidth: '100%',
            maxHeight: '100%',
            background: 'transparent',
          }}
          ref={videoRef}
          onCanPlay={clearPreviewMemory}
          poster={previewImgSrc}
          onEnded={handlerEndedVideo}
          onPause={debounceGetCurrentFrame.current}
          onSeeked={() => {
            setCurrentFrame(null);
            debounceGetCurrentFrame.current?.();
          }}
          onPlay={() => setCurrentFrame(null)}
        />
        <PlayerTimeline />
        {Object.entries(markupSettings).some((entry) => entry[1]) ? (
          <PredictArea
            width={videoRef.current?.offsetWidth ?? 0}
            height={videoRef.current?.offsetHeight ?? 0}
            frame={currentFrame}
            markupSettings={markupSettings}
          />
        ) : null}
      </Center>
    </Flex>
  );
}

export default memo(AIPlayer);
