import { useAppSelector } from '../../../hooks';
import { selectCurrentTime } from '../../../stores/ai-player/ai-player.slice';

type TSUseGetTimeInfoResult = {
  currentProgress: number;
  videoTime: string;
};

const getPlayerTime = (timestamp: number): string => {
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp - 3600 * hours) / 60);
  const seconds = Math.floor(timestamp - 3600 * hours - minutes * 60);

  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
};

function useGetTimeInfo(duration: number): TSUseGetTimeInfoResult {
  const currentTime = useAppSelector(selectCurrentTime);
  const currentProgress = (currentTime / (duration ?? 1)) * 100;

  const videoTime = `${getPlayerTime(currentTime)} / ${getPlayerTime(
    duration ?? 1
  )}`;

  return { currentProgress, videoTime };
}

export default useGetTimeInfo;
