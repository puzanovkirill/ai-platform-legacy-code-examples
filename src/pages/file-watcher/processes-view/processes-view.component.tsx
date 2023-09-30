/* eslint-disable no-nested-ternary */
import {
  Button,
  ButtonGroup,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import ProcessesDrawer from './processes-drawer.component';

type TProcessesView = {
  topModal: 'processes' | 'control';
  setTopModal: Dispatch<SetStateAction<'processes' | 'control'>>;
};

function ProcessesView({ topModal, setTopModal }: TProcessesView) {
  const { t } = useTranslation('pages');
  const [processesCount, setProcessesCount] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);
  const [, startTransition] = useTransition();
  const [isLargerThan1080] = useMediaQuery('(min-height: 1080px)');

  const handleSetTab = (index: number) => {
    startTransition(() => {
      setTabIndex(index);
    });
  };

  const handleClickTabTrigger = (index: number) => {
    startTransition(() => {
      handleSetTab(index);
      onOpen();
      setTopModal('processes');
    });
  };

  const handleInputChange = (value: string) => {
    const maxValue = isLargerThan1080 ? 20 : 15;

    if (value === '') setProcessesCount(1);
    else if (Number(value) > maxValue) setProcessesCount(maxValue);
    else if (Number(value) < 1) setProcessesCount(1);
    else setProcessesCount(Number(value));
  };
  return (
    <>
      <HStack
        spacing={4}
        alignItems="center"
        px={4}
        h={12}
        bg="gray.800"
        flexShrink={0}
        overflow="hidden"
      >
        <ButtonGroup>
          <Button
            onClick={() => {
              onOpen();
              handleClickTabTrigger(0);
            }}
            size="sm"
            colorScheme="blue"
            bg={tabIndex === 0 ? 'blue.400' : 'blue.100'}
            _hover={{ bg: 'blue.300' }}
          >
            {t('FileWatcher.Processes.Chart')}
          </Button>
          <Button
            onClick={() => {
              onOpen();
              handleClickTabTrigger(1);
            }}
            size="sm"
            colorScheme="blue"
            bg={tabIndex === 1 ? 'blue.400' : 'blue.100'}
            _hover={{ bg: 'blue.300' }}
          >
            {t('FileWatcher.Processes.Table')}
          </Button>
          <Button
            onClick={() => {
              onOpen();
              handleClickTabTrigger(2);
            }}
            size="sm"
            colorScheme="blue"
            bg={tabIndex === 2 ? 'blue.400' : 'blue.100'}
            _hover={{ bg: 'blue.300' }}
          >
            {t('FileWatcher.Processes.FailureCases')}
          </Button>
        </ButtonGroup>

        <HStack spacing={4}>
          <Text color="white">{t('FileWatcher.Processes.RowsCount')}:</Text>
          <NumberInput
            value={processesCount}
            min={1}
            max={isLargerThan1080 ? 20 : 15}
            size="sm"
            w={20}
            color="white"
            onChange={handleInputChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper color="white" />
              <NumberDecrementStepper color="white" />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      </HStack>

      <ProcessesDrawer
        isOpen={isOpen}
        onClose={onClose}
        tabIndex={tabIndex}
        setTabIndex={handleSetTab}
        topModal={topModal}
        setTopModal={setTopModal}
        processesCount={processesCount}
        setProcessesCount={handleInputChange}
      />
    </>
  );
}

export default ProcessesView;
