import { Center, Grid, Heading, Icon, Stack, VStack } from '@chakra-ui/react';
import { FileDotted } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { ThreeDotsLoading } from '../../../../components';
import {
  useGetCurrentProcesses,
  useGetGroundTrueBySequenceId,
  useGetSelectedFileId,
  useGetUrlParametersByKeys,
} from '../../../../hooks';
import ProcessRow from './process-row.component';
import ProcessesTableHeader from './processes-table-header.component';

function ProcessesTable(): JSX.Element | null {
  const { t } = useTranslation('common');
  const { fileId } = useGetSelectedFileId();
  const { version: currentHandlerId } = useGetUrlParametersByKeys('version');
  const { data: processes = [], isValidating: processesLoading } =
    useGetCurrentProcesses(fileId, currentHandlerId);
  const { data: groundTrueArray = [], isValidating: gtLoading } =
    useGetGroundTrueBySequenceId(fileId);

  if (!processes.length && !groundTrueArray.length)
    return (
      <VStack spacing={4} textAlign="center" py="8" color="white" h="full">
        <Icon as={FileDotted} w="10" h="10" />
        <Heading fontSize="2xl" fontWeight="normal" maxW="600px">
          {t('common:NoData')}
        </Heading>
      </VStack>
    );

  return processesLoading || gtLoading ? (
    <Center w="full" h="full">
      <ThreeDotsLoading size="12px" />
    </Center>
  ) : (
    <Stack w="full" h="full" bg="gray.800" flexDir="column">
      <Grid gridTemplateColumns="repeat(1, max-content) repeat(2, 1fr) repeat(3, max-content)">
        <ProcessesTableHeader />
        {processes.map((item) => (
          <ProcessRow key={item.id} process={item} />
        ))}

        {groundTrueArray.map((item) => (
          <ProcessRow key={item.id} process={item} isGT />
        ))}
      </Grid>
    </Stack>
  );
}

export default ProcessesTable;
