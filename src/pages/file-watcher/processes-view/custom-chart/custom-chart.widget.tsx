/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// @ts-nocheck
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FileDotted } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { ThreeDotsLoading } from '../../../../components';
import { useGetSelectedFileId, useGetSequence } from '../../../../hooks';
import { useGetTimeInfo } from '../../hooks';
import ChartLegend from './chart-legend.element';
import ChartProcessRow from './chart-process-row.component';
import { TChartRowProcess } from './chart-row-process.type';
import ChartRow from './chart-row.widget';
import IdAndClass from './id-and-class.component';
import useGetAllProcessesByType from './use-get-all-processes-by-type.hook';

type TCustomChart = {
  type: 'predict' | 'failure';
};
  //TODO Rewrite old legacy without disabling rules
  //TODO Rewrite old legacy without disabling rules
  //TODO Rewrite old legacy without disabling rules
  //TODO Rewrite old legacy without disabling rules
function CustomChart({ type }: TCustomChart): JSX.Element {
  const { t } = useTranslation('common');
  const { groupedProcesses, loading, processesTypes, failureCasesProcesses } =
    useGetAllProcessesByType();
  const { fileId } = useGetSelectedFileId();
  const { data: sequenceMeta, error } = useGetSequence(fileId);
  const { currentProgress } = useGetTimeInfo(sequenceMeta?.meta?.duration ?? 0);

  const processes =
    type === 'predict' ? groupedProcesses : failureCasesProcesses;

  if (error) {
    return <Text>{t('SomeError')}</Text>;
  }

  if (!Object.keys(processes).length)
    return (
      <VStack spacing={4} textAlign="center" py="8" color="white" h="full">
        <Icon as={FileDotted} w="10" h="10" />
        <Heading fontSize="2xl" fontWeight="normal" maxW="600px">
          {t('NoData')}
        </Heading>
      </VStack>
    );

  return loading ? (
    <Center w="full" h="full">
      <ThreeDotsLoading size="12px" color="white" />
    </Center>
  ) : (
    <Box>
      {Object.keys(processes).map((objectId) => (
        <Box key={objectId}>
          <Divider />
          <Box key={objectId}>
            <Flex gap={4} h="24px" alignItems="center">
              {processes[objectId].length ? (
                <IdAndClass
                  objectClass={processes[objectId][0]?.object?.class}
                  objectId={objectId.substring(0, 8)}
                />
              ) : null}
              <Box w="full" position="relative">
                <ChartRow
                  selectedProcesses={
                    processes[objectId].length
                      ? (processes[objectId] as TChartRowProcess[])
                      : undefined
                  }
                />
                {processes[objectId].length ? (
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
              </Box>
            </Flex>
          </Box>
          {processes[objectId].map((process) => (
            <ChartProcessRow
              key={`${objectId}${process.id}`}
              processes={process.children ?? []}
              level={1}
              currentProgress={currentProgress}
            />
          ))}
        </Box>
      ))}
      {Object.keys(processes)?.length ? (
        <ChartLegend processesTypes={processesTypes} />
      ) : null}
    </Box>
  );
}

export default CustomChart;
