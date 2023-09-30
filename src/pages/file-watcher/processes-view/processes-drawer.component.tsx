import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { X } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import PlayerTimeline from '../ai-player/player-timeline';
import CustomChart from './custom-chart';
import { ProcessesTable } from './processes-table';

type TProcessesDrawer = {
  isOpen: boolean;
  onClose: () => void;
  tabIndex: number;
  setTabIndex: (index: number) => void;
  topModal: 'processes' | 'control';
  setTopModal: Dispatch<SetStateAction<'processes' | 'control'>>;
  processesCount: number;
  setProcessesCount: (value: string) => void;
};

function ProcessesDrawer({
  isOpen,
  onClose,
  tabIndex,
  setTabIndex,
  topModal,
  setTopModal,
  processesCount,
  setProcessesCount,
}: TProcessesDrawer) {
  const { t } = useTranslation('pages');
  const drawerHeight = `${
    108 +
    (tabIndex === 0 ? 0 : 49) +
    (tabIndex === 0 ? 25 : 41) * processesCount
  }px`;
  const [isLargerThan1080] = useMediaQuery('(min-height: 1080px)');

  return (
    <Flex
      title={
        topModal === 'processes' ? undefined : t('common:ClickToElevateModal')
      }
      pos="absolute"
      w="100vw"
      bottom={0}
      left={0}
      zIndex={topModal === 'processes' ? 400 : 300}
      onClick={() => {
        if (topModal !== 'processes') setTopModal('processes');
      }}
      overflowX="hidden"
      transition={`${isOpen ? 0.3 : 0.1}s all`}
      transform={`translateY(${isOpen ? '0px' : drawerHeight})`}
      filter={topModal === 'processes' ? undefined : 'brightness(80%)'}
      _hover={
        topModal === 'processes' ? undefined : { filter: 'brightness(105%)' }
      }
      cursor={topModal === 'processes' ? 'initial' : 'pointer'}
      h={drawerHeight}
      boxShadow="lg"
      bg="gray.800"
      px={4}
      flexDir="column"
      py={2}
    >
      {isOpen ? (
        <>
          <Flex w="full" justifyContent="space-between">
            <HStack w="full" alignItems="center" spacing={6} pb={2}>
              <ButtonGroup>
                <Button
                  onClick={() => setTabIndex(0)}
                  size="sm"
                  colorScheme="blue"
                  bg={tabIndex === 0 ? 'blue.400' : 'blue.200'}
                  _hover={{ bg: 'blue.300' }}
                >
                  {t('FileWatcher.Processes.Chart')}
                </Button>

                <Button
                  onClick={() => setTabIndex(1)}
                  size="sm"
                  colorScheme="blue"
                  bg={tabIndex === 1 ? 'blue.400' : 'blue.200'}
                  _hover={{ bg: 'blue.300' }}
                >
                  {t('FileWatcher.Processes.Table')}
                </Button>
                <Button
                  onClick={() => setTabIndex(2)}
                  size="sm"
                  colorScheme="blue"
                  bg={tabIndex === 2 ? 'blue.400' : 'blue.200'}
                  _hover={{ bg: 'blue.300' }}
                >
                  {t('FileWatcher.Processes.FailureCases')}
                </Button>
              </ButtonGroup>

              <HStack spacing={4} flexShrink={0}>
                <Text color="white">
                  {t('FileWatcher.Processes.RowsCount')}:
                </Text>

                <NumberInput
                  value={processesCount}
                  min={1}
                  max={isLargerThan1080 ? 20 : 15}
                  size="sm"
                  w={20}
                  color="white"
                  onChange={setProcessesCount}
                >
                  <NumberInputField />

                  <NumberInputStepper>
                    <NumberIncrementStepper color="white" />
                    <NumberDecrementStepper color="white" />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </HStack>
            <IconButton
              aria-label="Close control panel"
              size="sm"
              color="white"
              bg="gray.700"
              _hover={{ bg: 'gray.600' }}
              icon={<Icon as={X} w={5} h={5} />}
              onClick={() => {
                onClose();
                setTopModal('control');
              }}
            />
          </Flex>

          <PlayerTimeline isPlayerPlacement={false} />
          {tabIndex === 1 ? (
            <ProcessesTable />
          ) : (
            <CustomChart type={tabIndex === 0 ? 'predict' : 'failure'} />
          )}
        </>
      ) : null}
    </Flex>
  );
}

export default ProcessesDrawer;
