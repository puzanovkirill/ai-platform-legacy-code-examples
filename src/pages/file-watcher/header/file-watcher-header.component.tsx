import { Center, Icon, IconButton, Tooltip } from '@chakra-ui/react';
import { Gear } from 'phosphor-react';
import { Dispatch, memo, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderBackLink from './header-back-link.component';
import HeaderTitle from './header-title.component';

type TFileWatcherHeader = {
  onOpen: () => void;
  setTopModal: Dispatch<SetStateAction<'processes' | 'control'>>;
};

function FileWatcherHeader({ onOpen, setTopModal }: TFileWatcherHeader) {
  const { t } = useTranslation('pages');

  return (
    <Center w="full" bg="gray.800" h={12} px={2} flexShrink={0}>
      <HeaderBackLink />
      <HeaderTitle />
      <Tooltip label={t('FileWatcher.Header.ControlPanel')}>
        <IconButton
          onClick={() => {
            onOpen();
            setTopModal('control');
          }}
          pos="absolute"
          right={4}
          size="sm"
          aria-label="Open control panel"
          bg="gray.700"
          color="white"
          _hover={{ bg: 'gray.600' }}
          icon={<Icon as={Gear} w={5} h={5} />}
        />
      </Tooltip>
    </Center>
  );
}

export default memo(FileWatcherHeader);
