/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { Box } from '@chakra-ui/react';
import { MouseEventHandler, useRef } from 'react';
import { Process } from '../../../../_const/process/process.type';
import { Status } from '../../../../_const/types';
import { useAppSelector } from '../../../../hooks';
import { selectLoadingVideoStatus } from '../../../../stores/ai-player/ai-player.slice';
import { TChartRowProcess } from './chart-row-process.type';
import ProcessRectangle from './process-rectangle.module';
import useHandlerProcessClick from './use-handler-process-click.hook';

type TChartRow = {
  selectedProcesses?: Array<Process & TChartRowProcess>;
};

function ChartRow({ selectedProcesses }: TChartRow): JSX.Element | null {
  const svgRef = useRef<SVGSVGElement>(null);
  const handlerClickEvent = useHandlerProcessClick();
  const loadingVideoStatus = useAppSelector(selectLoadingVideoStatus);

  const handleSVGClick: MouseEventHandler = (e) => {
    if (svgRef.current && loadingVideoStatus === Status.Success) {
      const position = e.clientX - svgRef.current.getBoundingClientRect().left;
      handlerClickEvent((position / svgRef.current.clientWidth) * 100);
    }
  };

  return selectedProcesses ? (
    <Box
      boxSizing="content-box"
      w="full"
      h="24px"
      borderLeftWidth={0.5}
      borderColor="gray.300"
    >
      <svg
        style={{
          width: '100%',
          height: '24px',
        }}
        display="block"
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        preserveAspectRatio="none"
        onClick={handleSVGClick}
      >
        {selectedProcesses.map((process, index) => (
          <ProcessRectangle
            key={`${process.type}_${process.start}_${index}`}
            process={process}
            fill={
              process?.failureType
                ? process?.failureType === 'FP'
                  ? 'red.500'
                  : 'red.700'
                : undefined
            }
          />
        ))}
      </svg>
    </Box>
  ) : null;
}

ChartRow.defaultProps = {
  selectedProcesses: undefined,
};

export default ChartRow;
