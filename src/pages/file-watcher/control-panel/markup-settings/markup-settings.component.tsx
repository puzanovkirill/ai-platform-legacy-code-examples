import { Stack, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import MarkupCheckbox from './markup-checkbox.component';
import { TMarkupSettings } from './markup-settings.type';

type TMarkupSettingsComponent = {
  markupSettings: TMarkupSettings;
  setMarkupSettings: Dispatch<SetStateAction<TMarkupSettings>>;
};

function MarkupSettings({
  markupSettings,
  setMarkupSettings,
}: TMarkupSettingsComponent) {
  const { t } = useTranslation('pages');

  return (
    <Stack color="white" resize="horizontal" borderBottomWidth={0.5} pb={2}>
      <Text fontSize="lg">
        {t(`FileWatcher.ControlPanel.MarkupSettings.Title`)}
      </Text>
      {Object.entries(markupSettings).map((entry) => (
        <MarkupCheckbox
          key={`${entry[0]}${entry[1].toString()}`}
          isChecked={entry[1]}
          markupKey={entry[0]}
          markupSettings={markupSettings}
          setMarkupSettings={setMarkupSettings}
          title={t(`FileWatcher.ControlPanel.MarkupSettings.${entry[0]}`)}
        />
      ))}
    </Stack>
  );
}

export default MarkupSettings;
