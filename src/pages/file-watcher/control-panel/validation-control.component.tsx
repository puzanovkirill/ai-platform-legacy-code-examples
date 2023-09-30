import {
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Check, Plus, UploadSimple } from 'phosphor-react';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetCurrentVideoMetrics,
  useGetValidators,
} from '../../../domains/validation';
import { CreateValidatorModal, UploadMetricsModal } from '../../../modals';

function ValidationControl() {
  const { t } = useTranslation('pages');
  const { data: validators } = useGetValidators();
  const [currentValidator, setCurrentValidator] = useState<string>();
  const { metrics } = useGetCurrentVideoMetrics();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isOpen: isCreationOpen,
    onClose: onCreationClose,
    onOpen: onCreationOpen,
  } = useDisclosure();
  const {
    isOpen: isUploadOpen,
    onClose: onUploadClose,
    onOpen: onUploadOpen,
  } = useDisclosure();

  const changeValidatorId = useCallback(
    (id: string) => {
      const search = new URLSearchParams(location.search);
      if (id) {
        search.set('validator', id);
      } else {
        search.delete('validator');
      }
      navigate({
        pathname: location.pathname,
        search: search.toString(),
      });
    },
    [location.pathname, location.search, navigate]
  );

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCurrentValidator(e.target.value);
    changeValidatorId(e.target.value);
  };

  return (
    <Stack color="white" borderBottomWidth={0.5} pb={2}>
      <Text fontSize="lg">
        {t('FileWatcher.ControlPanel.ValidationControl.Title')}
      </Text>
      <Text>{t('FileWatcher.ControlPanel.ValidationControl.Analyzer')}:</Text>
      <HStack>
        <Select
          size="sm"
          onChange={handleSelectChange}
          value={currentValidator}
        >
          <option value="" style={{ background: '#1A202C' }}>
            -
          </option>
          {validators?.map((validator) => (
            <option
              value={validator.id}
              key={validator.id}
              style={{ background: '#1A202C' }}
            >
              {validator.name} {validator.version}
            </option>
          ))}
        </Select>
        <IconButton
          aria-label="Create validator"
          size="sm"
          color="white"
          bg="blue.400"
          icon={<Icon as={Plus} w={5} h={5} />}
          _hover={{ bg: 'blue.300' }}
          onClick={onCreationOpen}
        />
      </HStack>
      {metrics?.meta?.accuracy
        ? Object.entries(metrics.meta).map((entry) =>
            entry[0] === 'failureCases' ? null : (
              <Text key={entry[0]}>
                {entry[0]}: {entry[1]}
              </Text>
            )
          )
        : null}
      <ButtonGroup>
        <Button
          size="sm"
          bg="blue.400"
          _hover={{ bg: 'blue.300' }}
          color="white"
          leftIcon={<Icon as={Check} w={5} h={5} />}
        >
          {t('FileWatcher.ControlPanel.ValidationControl.Validate')}
        </Button>
        <Button
          size="sm"
          bg="blue.400"
          _hover={{ bg: 'blue.300' }}
          color="white"
          onClick={onUploadOpen}
          leftIcon={<Icon as={UploadSimple} w={5} h={5} />}
        >
          {t('FileWatcher.ControlPanel.ValidationControl.UploadMetrics')}
        </Button>
      </ButtonGroup>
      <CreateValidatorModal isOpen={isCreationOpen} onClose={onCreationClose} />
      <UploadMetricsModal isOpen={isUploadOpen} onClose={onUploadClose} />
    </Stack>
  );
}

export default ValidationControl;
