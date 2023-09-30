import { Button, Icon } from '@chakra-ui/react';
import { UploadSimple } from 'phosphor-react';
import { ChangeEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ThreeDotsLoading } from '../../../../components';
import {
  usePostRequest,
  useGetSelectedFileId,
  useGetUrlParametersByKeys,
  useGetCurrentProcesses,
} from '../../../../hooks';
import { postFormData } from '../../../../_helpers/requests.helper';

function TraceLoader(): JSX.Element | null {
  const { t } = useTranslation('pages');
  const { version: currentHandlerId } = useGetUrlParametersByKeys('version');
  const { loading: isGroundTrueLoading, post: postRequest } = usePostRequest();
  const { fileId } = useGetSelectedFileId();
  const { mutate } = useGetCurrentProcesses(fileId, currentHandlerId);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !currentHandlerId) return;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('info', file);
    formData.append('handler_id', currentHandlerId);
    formData.append('sequence_id', fileId);

    postRequest(() =>
      postFormData('/trace/create/', formData).then(() =>
        mutate().catch((error) => console.error(error))
      )
    );
  };

  const performClickOnHiddenInput = () => {
    fileInputRef.current?.click();
  };

  return currentHandlerId ? (
    <>
      <input hidden ref={fileInputRef} type="file" onChange={onFileChange} />
      <Button
        flex={1}
        fontWeight="normal"
        colorScheme="blue"
        size="sm"
        px={2}
        leftIcon={<Icon as={UploadSimple} h={5} w={5} />}
        isLoading={isGroundTrueLoading}
        onClick={performClickOnHiddenInput}
        bg="blue.400"
        _hover={{ bg: 'blue.300' }}
      >
        {isGroundTrueLoading ? (
          <ThreeDotsLoading bg="blue.300" />
        ) : (
          t('FileWatcher.ControlPanel.TracesAndGtControl.LoadTrace')
        )}
      </Button>
    </>
  ) : null;
}

export default TraceLoader;
