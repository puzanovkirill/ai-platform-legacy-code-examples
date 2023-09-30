import { Dispatch, RefObject, useEffect } from 'react';
import { useAppDispatch, useGetSequence } from '../../../hooks';
import {
  setCurrentTime,
  setIsPlay,
  setTimeStamp,
} from '../../../stores/ai-player/ai-player.slice';

type TUseVideoAction = {
  fileId: string;
  videoRef: RefObject<HTMLVideoElement>;
  setCurrentFrame: Dispatch<React.SetStateAction<number | null>>;
};

type TUseVideoActionResult = {
  handlerEndedVideo: () => void;
  handlerTimeUpdateVideo: () => void;
  handlerOnPauseVideo: () => void;
};

function usePlayerAction({
  fileId,
  videoRef,
  setCurrentFrame,
}: TUseVideoAction): TUseVideoActionResult {
  const dispatch = useAppDispatch();
  const { data: sequenceMeta, error } = useGetSequence(fileId);

  const handlerEndedVideo = () => {
    if (videoRef.current) {
      // eslint-disable-next-line no-param-reassign
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      dispatch(setIsPlay(false));
      dispatch(setCurrentTime(0));
      setCurrentFrame(0);
      dispatch(setTimeStamp(0));
    }
  };

  const handlerTimeUpdateVideo = () => {
    if (videoRef.current?.currentTime)
      dispatch(setCurrentTime(videoRef.current?.currentTime));

    if (!sequenceMeta || error || !videoRef.current) {
      return;
    }

    const countFrames = sequenceMeta.meta.numFrames ?? 0;
    const duration = (sequenceMeta?.meta.duration ?? 1) * 1000;
    const currentTime = videoRef.current.currentTime * 1000;
    const currentFrame = Math.round((countFrames / duration) * currentTime);

    setCurrentFrame(currentFrame);
  };

  const handlerOnPauseVideo = () => {
    if (!sequenceMeta || error || !videoRef.current) {
      return;
    }

    const countFrames = sequenceMeta.meta.numFrames ?? 0;
    const duration = (sequenceMeta?.meta.duration ?? 1) * 1000;
    const currentTime = videoRef.current.currentTime * 1000;
    const currentFrame = Math.round((countFrames / duration) * currentTime);

    setCurrentFrame(currentFrame);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sequenceMeta) interval = setInterval(handlerTimeUpdateVideo, 16);
    return () => {
      clearInterval(interval);
    };
  }, [sequenceMeta]);

  return { handlerEndedVideo, handlerTimeUpdateVideo, handlerOnPauseVideo };
}

export default usePlayerAction;
