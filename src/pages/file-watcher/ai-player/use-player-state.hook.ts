import { useAppSelector } from '../../../hooks';
import {
  selectIsPlay,
  selectIsStartFileBlobDownload,
  selectTimeStamp,
  selectVolume,
} from '../../../stores/ai-player/ai-player.slice';

type TUsePlayerStateResult = {
  isPlay: boolean;
  timeStamp: number;
  isStartDownloadFile: boolean;
  volume: number;
};

function usePlayerState(): TUsePlayerStateResult {
  const isPlay = useAppSelector(selectIsPlay);
  const timeStamp = useAppSelector(selectTimeStamp);
  const isStartDownloadFile = useAppSelector(selectIsStartFileBlobDownload);
  const volume = useAppSelector(selectVolume);

  return { isPlay, timeStamp, isStartDownloadFile, volume };
}

export default usePlayerState;
