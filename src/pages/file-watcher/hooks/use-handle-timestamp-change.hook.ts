/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  useAppDispatch,
  useGetSelectedFileId,
  useGetSequence,
} from '../../../hooks';
import { setTimeStamp } from '../../../stores/ai-player/ai-player.slice';

function useHandlerTimestampChange(): (num: number) => void {
  const dispatch = useAppDispatch();
  const { fileId } = useGetSelectedFileId();
  const { data: sequence } = useGetSequence(fileId);

  return (startProcent) => {
    if (sequence) {
      dispatch(setTimeStamp((sequence.meta.duration * startProcent) / 100));
    }
  };
}

export default useHandlerTimestampChange;
