import { Grid, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetSelectedFileId, useGetSequence } from '../../../hooks';

function VideoInfo() {
  const { t } = useTranslation('pages');
  const { fileId } = useGetSelectedFileId();
  const { data: sequenceMeta } = useGetSequence(fileId);

  const data = [
    {
      value: sequenceMeta?.id,
      locale: t('FileWatcher.ControlPanel.VideoInfo.Id'),
    },
    {
      value: sequenceMeta?.meta.name,
      locale: t('FileWatcher.ControlPanel.VideoInfo.Name'),
    },
    {
      value: sequenceMeta?.meta.path,
      locale: t('FileWatcher.ControlPanel.VideoInfo.Path'),
    },
    {
      value: moment((sequenceMeta?.meta.duration ?? 0) * 1000)
        .utc()
        .format('HH:mm:ss'),
      locale: t('FileWatcher.ControlPanel.VideoInfo.Duration'),
    },
    {
      value: sequenceMeta?.meta.fps.toFixed(1) ?? 0,
      locale: t('FileWatcher.ControlPanel.VideoInfo.Fps'),
    },
    {
      value: sequenceMeta?.meta.numFrames,
      locale: t('FileWatcher.ControlPanel.VideoInfo.Frames'),
    },
  ];

  return (
    <Stack color="white" borderBottomWidth={0.5} pb={2}>
      <Text fontSize="lg">
        {t('FileWatcher.ControlPanel.VideoInfo.Title')}:
      </Text>
      <Grid
        gridTemplateColumns="max-content auto"
        overflow="auto"
        rowGap={2}
        columnGap={4}
      >
        {data.map(({ value, locale }) => (
          <Fragment key={locale}>
            <Text w="full">{locale}:</Text>
            <Text wordBreak="break-all">{value}</Text>
          </Fragment>
        ))}
      </Grid>
    </Stack>
  );
}

export default memo(VideoInfo);
