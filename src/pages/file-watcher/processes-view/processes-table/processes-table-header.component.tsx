import { Box, Center } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const ProcessesTableHeaderTitles = [
  'ProcessId',
  'Type',
  'Meta',
  'GroundTrue',
  'FrameRange',
  'TimeRange',
];

function ProcessesTableHeader(): JSX.Element {
  const { t } = useTranslation('components');
  return (
    <Box display="contents" color="white">
      {ProcessesTableHeaderTitles.map((title) => (
        <Center
          key={title}
          borderBottom="1px solid white"
          p={2}
          fontWeight="bold"
          __css={{ borderCollapse: 'collapse' }}
        >
          {t(`ProcessesTable.${title}`)}
        </Center>
      ))}
    </Box>
  );
}

export default ProcessesTableHeader;
