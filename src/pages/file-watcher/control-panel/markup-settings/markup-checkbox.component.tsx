import { Checkbox } from '@chakra-ui/react';
import { Dispatch, memo, SetStateAction } from 'react';
import { TMarkupSettings } from './markup-settings.type';

type TMarkupCheckbox = {
  markupKey: string;
  isChecked: boolean;
  markupSettings: TMarkupSettings;
  title: string;
  setMarkupSettings: Dispatch<SetStateAction<TMarkupSettings>>;
};

function MarkupCheckbox({
  markupKey,
  isChecked,
  setMarkupSettings,
  title,
  markupSettings,
}: TMarkupCheckbox) {
  return (
    <Checkbox
      name={markupKey}
      isChecked={isChecked}
      onChange={() => {
        setMarkupSettings({
          ...markupSettings,
          [markupKey]: !isChecked,
        });
      }}
      w="fit-content"
    >
      {title}
    </Checkbox>
  );
}

export default memo(MarkupCheckbox);
