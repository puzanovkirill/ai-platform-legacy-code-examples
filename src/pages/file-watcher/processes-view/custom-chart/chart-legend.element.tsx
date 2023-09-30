import { Box, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type TChartLegend = {
  processesTypes: string[];
};

const ChartLegendObjects: { [key: string]: { title: string; color: string } } =
  {
    process: { title: 'FileWatcher.Chart.Procces.Handler', color: 'blue.300' },
    groundTrue: {
      title: 'FileWatcher.Chart.Procces.Ground',
      color: 'green.200',
    },
    FP: {
      title: 'FileWatcher.Chart.Procces.FP',
      color: 'red.500',
    },
    FN: {
      title: 'FileWatcher.Chart.Procces.FN',
      color: 'red.700',
    },
  };

function ChartLegend({ processesTypes }: TChartLegend): JSX.Element {
  const { t } = useTranslation('pages');

  return (
    <HStack justify="center">
      {processesTypes.map((type) => (
        <Box p={2} key={type}>
          <HStack spacing={0.5} alignItems="center">
            <Box
              w={4}
              h={4}
              borderRadius="base"
              bg={ChartLegendObjects[type].color}
            />
            <Text color="white" pl={2} fontWeight="bold">
              {t(ChartLegendObjects[type].title)}
            </Text>
          </HStack>
        </Box>
      ))}
    </HStack>
  );
}

export default ChartLegend;
