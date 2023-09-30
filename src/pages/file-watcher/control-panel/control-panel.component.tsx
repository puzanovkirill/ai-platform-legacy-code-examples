import { Flex, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { Gear, X } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import ChangeHandlerSelect from './change-handler-select.component';
import { MarkupSettings, TMarkupSettings } from './markup-settings';
import TracesAndGtControl from './traces-and-gt-control';
import ValidationControl from './validation-control.component';
import VideoInfo from './video-info.component';

type TControlPanel = {
  isOpen: boolean;
  onClose: () => void;
  markupSettings: TMarkupSettings;
  setMarkupSettings: Dispatch<SetStateAction<TMarkupSettings>>;
  topModal: 'processes' | 'control';
  setTopModal: Dispatch<SetStateAction<'processes' | 'control'>>;
};

function ControlPanel({
  isOpen,
  onClose,
  markupSettings,
  setMarkupSettings,
  topModal,
  setTopModal,
}: TControlPanel) {
  const { t } = useTranslation('pages');
  return (
    <Flex
      title={
        topModal === 'control' ? undefined : t('common:ClickToElevateModal')
      }
      pos="absolute"
      flexDir="column"
      right={0}
      top={0}
      h="100vh"
      bg="gray.800"
      w={482}
      zIndex={topModal === 'control' ? 400 : 300}
      onClick={() => {
        if (topModal !== 'control') setTopModal('control');
      }}
      cursor={topModal === 'control' ? 'initial' : 'pointer'}
      filter={topModal === 'control' ? undefined : 'brightness(80%)'}
      _hover={
        topModal === 'control' ? undefined : { filter: 'brightness(105%)' }
      }
      transition={`${isOpen ? 0.3 : 0.1}s all`}
      transform={`translateX(${isOpen ? '0' : '482px'})`}
      boxShadow="lg"
      overflowY="auto"
    >
      <Flex
        color="white"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={2}
        borderBottomWidth={0.5}
      >
        <HStack spacing={2}>
          <Icon as={Gear} w={8} h={8} />
          <Text fontSize="xl">{t('FileWatcher.ControlPanel.Title')}</Text>
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
            setTopModal('processes');
          }}
        />
      </Flex>
      <Flex px={4} py={2} flexDir="column" gap={4}>
        <VideoInfo />
        <ChangeHandlerSelect />
        <ValidationControl />
        <MarkupSettings
          markupSettings={markupSettings}
          setMarkupSettings={setMarkupSettings}
        />
        <TracesAndGtControl />
      </Flex>
    </Flex>
  );
}

export default ControlPanel;
