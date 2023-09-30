import { Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHandlers, useGetUrlParametersByKeys } from '../../../hooks';
import { Handler } from '../../../_const/handler/handler.type';

function HandlerInfo(): JSX.Element {
  const { t } = useTranslation('pages');
  const [currentHandler, setCurrentHandler] = useState<Handler>();
  const { data: handlers } = useGetHandlers();
  const { version: currentHandlerId } = useGetUrlParametersByKeys('version');

  useEffect(() => {
    setCurrentHandler(
      handlers?.filter((handler) => handler.id === currentHandlerId)[0]
    );
  }, [handlers, currentHandlerId]);

  return (
    <Tooltip
      label={
        currentHandler?.name && currentHandler?.version
          ? `${currentHandler.name} ${currentHandler.version}`
          : t('FileWatcher.Header.NoHandlerTooltip')
      }
      openDelay={500}
      closeOnClick={false}
    >
      <Text
        size="md"
        fontWeight="bold"
        color="white"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflowX="hidden"
      >
        {currentHandler
          ? `${currentHandler?.name} ${currentHandler?.version}`
          : t('FileWatcher.Header.NoHandler')}
      </Text>
    </Tooltip>
  );
}

export default HandlerInfo;
