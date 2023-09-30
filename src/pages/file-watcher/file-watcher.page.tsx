import { Flex, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import AIPlayer from './ai-player';
import FileWatcherHeader from './header';
import { ControlPanel, TMarkupSettings } from './control-panel';
import ProcessesView from './processes-view';

function FileWatcherPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [topModal, setTopModal] = useState<'processes' | 'control'>('control');
  const [markupSettings, setMarkupSettings] = useState<TMarkupSettings>({
    traces: true,
    gt: false,
    skeleton: false,
  });

  return (
    <Flex
      flexDirection="column"
      overflow="hidden"
      h="100vh"
      pos="relative"
      alignItems="stretch"
    >
      <FileWatcherHeader onOpen={onOpen} setTopModal={setTopModal} />
      <AIPlayer markupSettings={markupSettings} />
      <ControlPanel
        isOpen={isOpen}
        onClose={onClose}
        markupSettings={markupSettings}
        setMarkupSettings={setMarkupSettings}
        topModal={topModal}
        setTopModal={setTopModal}
      />
      <ProcessesView topModal={topModal} setTopModal={setTopModal} />
    </Flex>
  );
}

export default FileWatcherPage;
