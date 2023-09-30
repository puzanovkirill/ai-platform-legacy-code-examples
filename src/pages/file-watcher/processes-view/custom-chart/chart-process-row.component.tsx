/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Divider, Flex } from '@chakra-ui/react';
import { GroundTrue } from '../../../../_const/ground-true/ground-true.type';
import { Process } from '../../../../_const/process/process.type';
import { groupProcessesByType } from '../../../../_helpers';
import { TChartRowProcess } from './chart-row-process.type';
import ChartRow from './chart-row.widget';
import IdAndClass from './id-and-class.component';

type TChartProcessRow = {
  processes: Array<GroundTrue | Process>;
  level: number;
  currentProgress: number;
};

function ChartProcessRow({
  processes,
  level,
  currentProgress,
}: TChartProcessRow) {
  const groupedProcesses = groupProcessesByType(processes, 'type');
  //TODO Rewrite old legacy without disabling rules
  //TODO Rewrite old legacy without disabling rules
  //TODO Rewrite old legacy without disabling rules
  //TODO Rewrite old legacy without disabling rules
  return (
    <>
      {groupedProcesses.map((obj) =>
        Object.keys(obj as object).map((key) => (
          <Box key={`${key}${obj[key][0]?.type}`}>
            <Divider />

            <Flex gap={4} h="24px" alignItems="center">
              <IdAndClass
                objectClass={key === 'attention' ? '' : key}
                objectId={obj[key][0]?.type}
                prefix={new Array(level + 1).join('|\xa0\xa0\xa0')}
              />

              <Flex position="relative" w="full" alignItems="center">
                <ChartRow
                  selectedProcesses={
                    obj[key] as unknown as Array<Process & TChartRowProcess>
                  }
                />

                {obj[key].length ? (
                  <Box
                    w={0.5}
                    position="absolute"
                    h="24px"
                    top={0}
                    bg="red.400"
                    bottom={0}
                    left={`${currentProgress}%`}
                  />
                ) : null}
              </Flex>
            </Flex>

            {obj[key]?.map((process: any) =>
              process?.children?.length ? (
                <Box key={process?.id}>
                  <ChartProcessRow
                    processes={process.children}
                    level={level + 1}
                    currentProgress={currentProgress}
                  />
                </Box>
              ) : null
            )}
          </Box>
        ))
      )}
    </>
  );
}

export default ChartProcessRow;
