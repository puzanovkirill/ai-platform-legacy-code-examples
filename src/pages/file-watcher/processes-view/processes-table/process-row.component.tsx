import { Box, Center } from '@chakra-ui/react';
import moment from 'moment';
import {
  useAppDispatch,
  useAppSelector,
  useGetSelectedFileId,
  useGetSequence,
} from '../../../../hooks';
import {
  selectLoadingVideoStatus,
  setTimeStamp,
} from '../../../../stores/ai-player/ai-player.slice';
import { setSelectProcess } from '../../../../stores/processes/processes.slice';
import { Process } from '../../../../_const/process/process.type';
import { Status } from '../../../../_const/types';

type TProcessRow = {
  process: Process;
  isGT?: boolean;
};

const getClassOfProcess = (process: Process): string => {
  if (process.type === 'track') return process.object!.class;
  if (process.type === 'action') return process.action!;
  if (process.type === 'emotion') return process.emotion!;
  if (process.type === 'attention') return process.attention!;

  return '';
};

function ProcessRow({ process, isGT = false }: TProcessRow) {
  const dispatch = useAppDispatch();
  const { fileId } = useGetSelectedFileId();
  const meta = useGetSequence(fileId).data?.meta ?? { fps: 25 };
  const loadingVideoStatus = useAppSelector(selectLoadingVideoStatus);

  const handlerClick = () => {
    if (loadingVideoStatus === Status.Success) {
      dispatch(setTimeStamp(process.frameRange[0] / meta.fps));
      dispatch(setSelectProcess(process));
    }
  };

  return (
    <Box
      role="group"
      display="contents"
      onClick={handlerClick}
      cursor={loadingVideoStatus === Status.Success ? 'pointer' : 'not-allowed'}
      color="white"
    >
      <Center
        flexGrow={0}
        borderBottom="1px solid white"
        p={2}
        transition="0.2s all"
        _groupHover={{
          bg: 'gray.700',
        }}
        __css={{ borderCollapse: 'collapse' }}
      >
        {process.id}
      </Center>
      <Center
        flexGrow={0}
        borderBottom="1px solid white"
        p={2}
        transition="0.2s all"
        _groupHover={{
          bg: 'gray.700',
        }}
        __css={{ borderCollapse: 'collapse' }}
      >
        {process.type}
      </Center>
      <Center
        flexGrow={0}
        borderBottom="1px solid white"
        p={2}
        transition="0.2s all"
        _groupHover={{
          bg: 'gray.700',
        }}
        __css={{ borderCollapse: 'collapse' }}
      >
        {getClassOfProcess(process)}
      </Center>
      <Center
        flexGrow={0}
        borderBottom="1px solid white"
        p={2}
        transition="0.2s all"
        _groupHover={{
          bg: 'gray.700',
        }}
        __css={{ borderCollapse: 'collapse' }}
      >
        {isGT ? 'GT' : 'Not GT'}
      </Center>
      <Center
        flexGrow={0}
        borderBottom="1px solid white"
        p={2}
        transition="0.2s all"
        _groupHover={{
          bg: 'gray.700',
        }}
        __css={{ borderCollapse: 'collapse' }}
      >{`[${process.frameRange[0]}, ${process.frameRange[1]}]`}</Center>
      <Center
        flexGrow={0}
        borderBottom="1px solid white"
        p={2}
        transition="0.2s all"
        _groupHover={{
          bg: 'gray.700',
        }}
        __css={{ borderCollapse: 'collapse' }}
      >
        {`${moment(process.timeRange[0]).format('HH:mm:ss')} -
        ${moment(process.timeRange[1]).format('HH:mm:ss')}`}
      </Center>
    </Box>
  );
}

export default ProcessRow;
