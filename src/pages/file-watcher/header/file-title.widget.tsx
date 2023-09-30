import { Text, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useGetSelectedFileId, useGetSequence } from '../../../hooks';

function FileTitle(): JSX.Element {
  const { t } = useTranslation('pages');
  const { fileId } = useGetSelectedFileId();
  const { data, isValidating } = useGetSequence(fileId);

  return (
    <Tooltip
      label={
        isValidating
          ? t('FileWatcher.Header.FileName.Loading')
          : data?.meta.name ?? t('FileWatcher.Header.FileName.Error')
      }
      openDelay={500}
      closeOnClick={false}
    >
      <Text
        size="md"
        align="center"
        color="white"
        fontWeight="bold"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflowX="hidden"
      >
        {data?.meta.name ?? 'Error'}
      </Text>
    </Tooltip>
  );
}

export default FileTitle;
