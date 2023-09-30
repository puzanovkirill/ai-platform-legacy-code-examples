import { useTranslation } from 'react-i18next';
import {
  HStack,
  Icon,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import {
  IconProps,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SpeakerSimpleHigh,
  SpeakerSimpleLow,
  SpeakerSimpleSlash,
} from 'phosphor-react';
import {
  ForwardRefExoticComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useGetSelectedFileId,
  useGetSequence,
} from '../../../../hooks';
import {
  selectCurrentTime,
  selectIsPlay,
  selectIsStartFileBlobDownload,
  selectLoadingVideoStatus,
  setCurrentTime,
  setIsPlay,
  setIsStartFileBlobDownload,
  setTimeStamp,
  setTimeStep,
  setVolume,
} from '../../../../stores/ai-player/ai-player.slice';
import { Status } from '../../../../_const/types';
import usePlayerState from '../use-player-state.hook';
import { useGetTimeInfo } from '../../hooks';

type TIcon = ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

function ControlButtons(): JSX.Element {
  const { t } = useTranslation('pages');
  const dispatch = useAppDispatch();
  const isPlayNotMemoized = useAppSelector(selectIsPlay);
  const isPlay = useMemo(() => isPlayNotMemoized, [isPlayNotMemoized]);
  const { volume } = usePlayerState();
  const isStartDownloadFile = useAppSelector(selectIsStartFileBlobDownload);
  const loadingVideoStatus = useAppSelector(selectLoadingVideoStatus);
  const { fileId } = useGetSelectedFileId();
  const { data: sequenceMeta } = useGetSequence(fileId);
  const { currentProgress } = useGetTimeInfo(sequenceMeta?.meta?.duration ?? 0);
  const currentTime = useAppSelector(selectCurrentTime);
  const [speakerIcon, setSpeakerIcon] = useState<TIcon>(SpeakerSimpleHigh);

  const handlerOnClickPlayButton = useCallback(() => {
    if (!isStartDownloadFile) dispatch(setIsStartFileBlobDownload(true));

    dispatch(setIsPlay(!isPlay));
    dispatch(
      setTimeStamp(((sequenceMeta?.meta.duration ?? 0) * currentProgress) / 100)
    );
  }, [
    currentProgress,
    dispatch,
    isPlay,
    isStartDownloadFile,
    sequenceMeta?.meta.duration,
  ]);

  const handlerOnClickBackButton = useCallback(() => {
    if (loadingVideoStatus !== Status.Success) return;
    if (currentTime <= 1) {
      dispatch(setCurrentTime(0));
      dispatch(setTimeStamp(0));
    } else dispatch(setTimeStep(-1));
  }, [currentTime, dispatch, loadingVideoStatus]);

  const handlerOnClickForwardButton = useCallback(() => {
    if (loadingVideoStatus !== Status.Success) return;
    dispatch(setTimeStep(1));
  }, [dispatch, loadingVideoStatus]);

  const handleSpeakerClick = useCallback(() => {
    if (volume !== 0) dispatch(setVolume(0));
    else dispatch(setVolume(100));
  }, [dispatch, volume]);

  useEffect(() => {
    if (volume > 50) setSpeakerIcon(SpeakerSimpleHigh);
    else if (volume > 0) setSpeakerIcon(SpeakerSimpleLow);
    else setSpeakerIcon(SpeakerSimpleSlash);
  }, [volume]);

  return (
    <HStack spacing={1} pl={2}>
      <Tooltip
        label={
          isPlay
            ? t('FileWatcher.AIPlayer.StopPlaying')
            : t('FileWatcher.AIPlayer.StartPlaying')
        }
        closeOnClick={false}
      >
        <IconButton
          size="sm"
          onClick={handlerOnClickPlayButton}
          aria-label={isPlay ? 'stop' : 'play'}
          bg="transparent"
          _hover={{ bg: 'transparent', color: 'white' }}
          color="gray.100"
          icon={<Icon as={isPlay ? Pause : Play} w={5} h={5} weight="fill" />}
        />
      </Tooltip>
      <Tooltip
        label={t('FileWatcher.AIPlayer.SeekBackward')}
        closeOnClick={false}
      >
        <IconButton
          aria-label="seek-backward"
          bg="transparent"
          _hover={{ bg: 'transparent', color: 'white' }}
          color="gray.100"
          icon={<Icon as={SkipBack} w={5} h={5} weight="fill" />}
          size="sm"
          onClick={handlerOnClickBackButton}
          isDisabled={loadingVideoStatus !== Status.Success}
        />
      </Tooltip>

      <Tooltip
        label={t('FileWatcher.AIPlayer.SeekForward')}
        closeOnClick={false}
      >
        <IconButton
          aria-label="seek-forward"
          bg="transparent"
          _hover={{ bg: 'transparent', color: 'white' }}
          color="gray.100"
          icon={<Icon as={SkipForward} w={5} h={5} weight="fill" />}
          size="sm"
          onClick={handlerOnClickForwardButton}
          isDisabled={loadingVideoStatus !== Status.Success}
        />
      </Tooltip>
      <HStack>
        <Tooltip
          label={t('FileWatcher.AIPlayer.MuteSpeaker')}
          closeOnClick={false}
        >
          <IconButton
            aria-label="mute-speaker"
            bg="transparent"
            _hover={{ bg: 'transparent', color: 'white' }}
            color="gray.100"
            icon={<Icon as={speakerIcon} w={5} h={5} weight="fill" />}
            size="sm"
            onClick={handleSpeakerClick}
            isDisabled={loadingVideoStatus !== Status.Success}
          />
        </Tooltip>
        <Slider
          value={volume}
          onChange={(value) => dispatch(setVolume(value))}
          w={16}
          min={0}
          max={100}
          isDisabled={loadingVideoStatus !== Status.Success}
        >
          <SliderTrack>
            <SliderFilledTrack bg="blue.400" />
          </SliderTrack>
          <SliderThumb boxSize={3} _focusVisible={{}} />
        </Slider>
      </HStack>
    </HStack>
  );
}

export default ControlButtons;
