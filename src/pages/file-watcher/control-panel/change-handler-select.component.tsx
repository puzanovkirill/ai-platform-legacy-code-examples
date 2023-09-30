import { Select, Stack, Text } from '@chakra-ui/react';
import {
  ChangeEventHandler,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetHandlers, useGetUrlParametersByKeys } from '../../../hooks';
import { Handler } from '../../../_const/handler/handler.type';

function ChangeHandlerSelect() {
  const { t } = useTranslation('pages');
  const [currentHandler, setCurrentHandler] = useState<Handler | undefined>();
  const { data: handlers } = useGetHandlers();
  const { version: currentHandlerId } = useGetUrlParametersByKeys('version');
  const navigate = useNavigate();
  const location = useLocation();

  const changeHandlerId = useCallback(
    (handlerName: string, handlerId: string) => {
      const search = new URLSearchParams(location.search);
      if (handlerName && handlerId) {
        search.set('handler', handlerName);
        search.set('version', handlerId);
      } else {
        search.delete('handler');
        search.delete('version');
      }
      navigate({
        pathname: location.pathname,
        search: search.toString(),
      });
    },
    [location.pathname, location.search, navigate]
  );

  useEffect(() => {
    setCurrentHandler(
      handlers?.filter((handler) => handler.id === currentHandlerId)[0]
    );
  }, [handlers, currentHandlerId]);

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const foundHandler = handlers?.filter(
      (handler) => handler.id === e.target.value
    )[0];
    setCurrentHandler(foundHandler);
    if (e.target.value)
      changeHandlerId(foundHandler?.name ?? '', foundHandler?.id ?? '');
  };

  return handlers ? (
    <Stack color="white" borderBottomWidth={0.5} pb={2}>
      <Text fontSize="lg">
        {t('FileWatcher.ControlPanel.HandlerControl.Title')}
      </Text>
      <Text>{t('FileWatcher.ControlPanel.HandlerControl.Current')}:</Text>
      <Select
        value={currentHandler?.id}
        onChange={handleSelectChange}
        size="sm"
      >
        <option style={{ background: '#1A202C' }} value={undefined}>
          -
        </option>
        {handlers.map((handler) => (
          <option
            style={{ background: '#1A202C' }}
            value={handler.id}
            key={handler.id}
          >
            {handler.name} {handler.version}
          </option>
        ))}
      </Select>
    </Stack>
  ) : null;
}

export default memo(ChangeHandlerSelect);
