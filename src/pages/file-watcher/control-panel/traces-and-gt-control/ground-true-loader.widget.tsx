import { Button, Icon } from '@chakra-ui/react';
import { UploadSimple } from 'phosphor-react';
import { ChangeEvent, useRef } from 'react';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import {
  usePostRequest,
  useGetSelectedFileId,
  useGetGroundTrueBySequenceId,
} from '../../../../hooks';
import { postFormData } from '../../../../_helpers/requests.helper';
import { ThreeDotsLoading } from '../../../../components';

function GroundTrueLoader(): JSX.Element | null {
  const { t } = useTranslation('pages');
  const access = new Cookies().get('access') as string;
  const { loading: isGroundTrueLoading, post: postRequest } = usePostRequest();
  const { fileId } = useGetSelectedFileId();
  const { mutate } = useGetGroundTrueBySequenceId(fileId);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('info', file);
    formData.append('handler_id', access);
    formData.append('sequence_id', fileId);

    postRequest(() =>
      postFormData('/converter/cvat/', formData).then(() =>
        mutate().catch((error) => console.error(error))
      )
    );
  };

  const performClickOnHiddenInput = () => {
    fileInputRef.current?.click();
  };

  return (
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
          <ThreeDotsLoading />
        ) : (
          t('FileWatcher.ControlPanel.TracesAndGtControl.LoadGT')
        )}
      </Button>
    </>
  );
}

export default GroundTrueLoader;
