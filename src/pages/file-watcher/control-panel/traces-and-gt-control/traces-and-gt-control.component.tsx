import { Collapse, Flex, Stack, Text } from '@chakra-ui/react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddProcessButton } from './add-process-button';
import CreateProcessForm from './create-process-form.component';
import GroundTrueLoader from './ground-true-loader.widget';
import TraceLoader from './trace-loader.component';

function TracesAndGtControl() {
  const { t } = useTranslation('pages');
  const [isAddingProcess, setIsAddingProcess] = useState(false);

  return (
    <Stack color="white" resize="horizontal" borderBottomWidth={0.5} pb={2}>
      <Text fontSize="lg">
        {t('FileWatcher.ControlPanel.TracesAndGtControl.Title')}
      </Text>
      <Flex flexWrap="wrap" gap={2}>
        <TraceLoader />
        <GroundTrueLoader />
      </Flex>
      <Flex flexWrap="wrap" gap={2}>
        <AddProcessButton
          isAddProcess={isAddingProcess}
          setIsAddProcess={setIsAddingProcess}
        />
      </Flex>
      <Collapse in={isAddingProcess}>
        <CreateProcessForm setIsAddProcess={setIsAddingProcess} />
      </Collapse>
    </Stack>
  );
}

export default memo(TracesAndGtControl);
