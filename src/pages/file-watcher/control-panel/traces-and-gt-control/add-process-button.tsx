import { Button, Icon } from '@chakra-ui/react';
import { Plus } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type TAddProcessButton = {
  setIsAddProcess: Dispatch<SetStateAction<boolean>>;
  isAddProcess: boolean;
};

function AddProcessButton({
  isAddProcess,
  setIsAddProcess,
}: TAddProcessButton) {
  const { t } = useTranslation('pages');
  return (
    <Button
      flex={1}
      leftIcon={<Icon as={Plus} />}
      size="sm"
      colorScheme="blue"
      onClick={() => setIsAddProcess(true)}
      bg="blue.400"
      _hover={{ bg: 'blue.300' }}
      fontWeight="normal"
      px={2}
      transition="0.3s all"
      display={isAddProcess ? 'none' : 'inline-flex'}
      pointerEvents={isAddProcess ? 'none' : 'all'}
    >
      {t('FileWatcher.ControlPanel.TracesAndGtControl.AddProcess')}
    </Button>
  );
}

export { AddProcessButton };
