import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Process } from '../../../../_const/process/process.type';
import { Status } from '../../../../_const/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { ProcessFeedbackModal } from '../../../../modals';
import { selectLoadingVideoStatus } from '../../../../stores/ai-player/ai-player.slice';
import {
  resetCurrentProcessId,
  resetSelectProcess,
  setCurrentProcessId,
  setSelectProcess,
} from '../../../../stores/processes/processes.slice';
import { TChartRowProcess } from './chart-row-process.type';

type TProcessRectangle = {
  process: TChartRowProcess & Process;
  fill?: string;
};

function ProcessRectangle({ process, fill }: TProcessRectangle): JSX.Element {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const loadingVideoStatus = useAppSelector(selectLoadingVideoStatus);
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    isOpen: isFeedbackOpen,
    onClose: onFeedbackClose,
    onOpen: onFeedbackOpen,
  } = useDisclosure();

  const handleContextMenuOpen = (e: MouseEvent<SVGRectElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (search.has('validator'))
    onOpen();
  };

  const handleClick = () => {
    if (loadingVideoStatus === Status.Success) {
      if (process.dataType === 'groundTrue')
        dispatch(setSelectProcess(process));
      else dispatch(resetSelectProcess());
    }
  };

  return (
    <>
      <Popover onClose={onClose} isOpen={isOpen} isLazy>
        <PopoverTrigger>
          <Box
            as="rect"
            cursor={
              loadingVideoStatus === Status.Success ? 'pointer' : 'not-allowed'
            }
            fill={
              fill ||
              (process.dataType === 'groundTrue' ? 'green.200' : 'blue.300')
            }
            onMouseEnter={() =>
              dispatch(setCurrentProcessId(process?.object?.id ?? ''))
            }
            onMouseLeave={() => dispatch(resetCurrentProcessId())}
            x={`${process.start}%`}
            y="2px"
            width={`${process.long}%`}
            height="20px"
            onClick={handleClick}
            onContextMenu={handleContextMenuOpen}
          />
        </PopoverTrigger>
        <Portal>
          <Box
            h="100vh"
            w="100vw"
            zIndex="popover"
            pos="absolute"
            top={0}
            left={0}
            visibility={isOpen ? 'visible' : 'hidden'}
          >
            <PopoverContent zIndex={99999} w="fit-content">
              <PopoverArrow />
              <PopoverBody>
                <Button
                  onClick={onFeedbackOpen}
                  colorScheme="blue"
                  variant="ghost"
                >
                  {t('ContextMenu.Feedback')}
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Box>
        </Portal>
      </Popover>
      <ProcessFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={onFeedbackClose}
        process={process}
      />
    </>
  );
}

export default ProcessRectangle;
