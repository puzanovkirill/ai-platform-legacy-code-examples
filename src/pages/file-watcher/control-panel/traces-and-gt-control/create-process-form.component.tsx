/* eslint-disable @typescript-eslint/no-floating-promises */
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';
import {
  useAppSelector,
  useGetSelectedFileId,
  useGetSequence,
} from '../../../../hooks';
import useAddGT from './use-add-gt.hook';
import { ThreeDotsLoading } from '../../../../components';
import { VALIDATION_SCHEMAS } from '../../../../_const';
import { selectChosenProcess } from '../../../../stores/processes/processes.slice';

const ProcessClass = ['track', 'action', 'emotion', 'attention'];

const getTimeFromFrameNumber = (frameNumber: string, fps: number) =>
  moment(moment.now() + (+frameNumber / fps) * 1000).format(
    'YYYY-MM-DDTHH:mm:ss.SSSZ'
  );

type TCreateProcessForm = {
  setIsAddProcess: Dispatch<SetStateAction<boolean>>;
};

function CreateProcessForm({
  setIsAddProcess,
}: TCreateProcessForm): JSX.Element {
  const { t } = useTranslation('components');
  const access = new Cookies().get('access') as string;
  const { addGt, isLoading } = useAddGT();
  const { fileId } = useGetSelectedFileId();
  const { data: sequenceMeta } = useGetSequence(fileId);
  const selectedProcess = useAppSelector(selectChosenProcess);

  const saveProcess = (values: typeof formik.initialValues) => {
    const fps = sequenceMeta?.meta.fps ?? 1;

    if (values.processId && values.parent && values.processId === values.parent)
      return;

    const process: { [key: string]: any } = {
      id: values.processId || uuidv4(),
      type: values.type,
      parent: values.parent,
      frame_interval: [values.startFrame, values.endFrame],
      time_interval: [
        getTimeFromFrameNumber(values.startFrame, fps),
        getTimeFromFrameNumber(values.endFrame, fps),
      ],
    };

    if (values.type === 'track') {
      process.object = {
        class: values.objectClass,
        id: uuidv4(),
      };
    } else if (values.type === 'action') {
      process.action = values.action;
    } else if (values.type === 'emotion') {
      process.emotion = values.emotion;
    }

    const data = {
      sequence_id: fileId,
      handler_id: access,
      feedback: {
        processes: [process],
      },
    };

    addGt(JSON.stringify(data));
  };

  const formik = useFormik({
    initialValues: {
      processId: selectedProcess?.id ?? '',
      parent: selectedProcess?.parent ?? '',
      type: selectedProcess?.type ?? 'track',
      startFrame: selectedProcess?.frameRange[0].toString() ?? '0',
      objectClass: selectedProcess?.object?.class ?? '',
      action: selectedProcess?.action ?? '',
      emotion: selectedProcess?.emotion ?? '',
      endFrame: selectedProcess?.frameRange[1].toString() ?? '0',
    },
    validationSchema: VALIDATION_SCHEMAS.createProcess,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: (values, helper) => {
      if (values.parent && values.parent === values.processId) {
        helper.setFieldError('parent', 'NoSelfParent');
        return;
      }

      saveProcess(values);
    },
  });

  const handleChangeStartFrame = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || +e.target.value > sequenceMeta!.meta.numFrames) {
      return;
    }

    formik.setFieldValue('startFrame', e.target.value);

    if (+e.target.value > +formik.values.endFrame) {
      formik.setFieldValue('endFrame', e.target.value);
    }
  };

  const blurOnStartFrame = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!e.target.value) {
      formik.setFieldValue('startFrame', '0');
    }

    if (+formik.values.endFrame < +formik.values.startFrame) {
      formik.setFieldValue('endFrame', formik.values.startFrame);
    }
  };

  const blurOnEndFrame = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!e.target.value || +e.target.value < +formik.values.startFrame) {
      formik.setFieldValue('endFrame', formik.values.startFrame);
    }
  };

  const handleChangeEndFrame = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      formik.setFieldValue('endFrame', formik.values.startFrame);
    }

    if (!e.target.value || +e.target.value > sequenceMeta!.meta.numFrames) {
      return;
    }

    formik.setFieldValue('endFrame', e.target.value);
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4} py={2} px={0} overflowY="auto" w="full">
          <FormControl isInvalid={!!formik.errors.processId}>
            <Flex gap={4}>
              <FormLabel htmlFor="processId" w={36} m={0}>
                {t('ProcessesTable.ProcessId')}
              </FormLabel>
              <Box flexGrow={1}>
                <Input
                  autoComplete="off"
                  name="processId"
                  value={formik.values.processId}
                  onChange={formik.handleChange}
                  size="sm"
                />
                {formik.errors.processId ? (
                  <FormErrorMessage>
                    {t(`errors.${formik.errors.processId}`)}
                  </FormErrorMessage>
                ) : null}
              </Box>
            </Flex>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.parent}>
            <Flex gap={4}>
              <FormLabel htmlFor="parent" w={36} m={0}>
                {t('ProcessesTable.Parent')}
              </FormLabel>
              <Box flexGrow={1}>
                <Input
                  autoComplete="off"
                  name="parent"
                  value={formik.values.parent}
                  onChange={formik.handleChange}
                  size="sm"
                />
                {formik.errors.parent ? (
                  <FormErrorMessage>
                    {t(`errors.${formik.errors.parent}`)}
                  </FormErrorMessage>
                ) : null}
              </Box>
            </Flex>
          </FormControl>

          <Flex gap={4}>
            <FormLabel htmlFor="type" w={36} m={0}>
              {t('ProcessesTable.ProcessType.Title')}
            </FormLabel>
            <Select
              w={40}
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              size="sm"
            >
              {ProcessClass.map((item) => (
                <option
                  style={{ background: '#1A202C' }}
                  key={item}
                  value={item}
                >
                  {t(`ProcessesTable.ProcessType.${item}`)}
                </option>
              ))}
            </Select>
          </Flex>

          {formik.values.type === 'track' && (
            <Flex gap={4}>
              <FormLabel htmlFor="objectClass" w={36} m={0}>
                {t('ProcessesTable.ObjectClass')}
              </FormLabel>
              <Input
                w={40}
                autoComplete="off"
                size="sm"
                name="objectClass"
                value={formik.values.objectClass}
                onChange={formik.handleChange}
              />
            </Flex>
          )}

          {formik.values.type === 'action' && (
            <Flex gap={4}>
              <FormLabel htmlFor="action" w={36} m={0}>
                {t('ProcessesTable.ProcessType.action')}
              </FormLabel>
              <Input
                w={40}
                autoComplete="off"
                size="sm"
                name="action"
                value={formik.values.action}
                onChange={formik.handleChange}
              />
            </Flex>
          )}

          {formik.values.type === 'emotion' && (
            <Flex gap={4}>
              <FormLabel w={36} m={0} htmlFor="emotion">
                {t('ProcessesTable.ProcessType.emotion')}
              </FormLabel>
              <Input
                w={40}
                autoComplete="off"
                size="sm"
                value={formik.values.emotion}
                onChange={formik.handleChange}
                name="emotion"
              />
            </Flex>
          )}

          <Flex gap={4}>
            <FormLabel htmlFor="startFrame" w={36} m={0}>
              {t('ProcessesTable.StartFrame')}
            </FormLabel>
            <Input
              w={40}
              autoComplete="off"
              size="sm"
              onChange={handleChangeStartFrame}
              onBlur={blurOnStartFrame}
              name="startFrame"
              type="number"
              value={formik.values.startFrame}
              min={0}
              max={sequenceMeta?.meta.numFrames}
            />
          </Flex>

          <Flex gap={4}>
            <FormLabel w={36} m={0} htmlFor="endFrame">
              {t('ProcessesTable.EndFrame')}
            </FormLabel>
            <Input
              width={40}
              size="sm"
              autoComplete="off"
              name="endFrame"
              type="number"
              value={formik.values.endFrame}
              min={formik.values.startFrame}
              max={sequenceMeta?.meta.numFrames}
              onChange={handleChangeEndFrame}
              onBlur={blurOnEndFrame}
            />
          </Flex>

          <HStack pl={40}>
            <Button
              isLoading={isLoading}
              isDisabled={
                !(
                  formik.values.objectClass ||
                  formik.values.action ||
                  formik.values.emotion
                ) && formik.values.type !== 'attention'
              }
              bg="blue.400"
              _hover={{ bg: 'blue.300' }}
              size="sm"
              type="submit"
              width={24}
              color="white"
              colorScheme="blue"
            >
              {isLoading ? <ThreeDotsLoading /> : t('common:Save')}
            </Button>

            <Button
              onClick={() => {
                setIsAddProcess(false);
                formik.resetForm();
              }}
              isLoading={isLoading}
              bg="red.400"
              _hover={{ bg: 'red.300' }}
              size="sm"
              type="submit"
              width={24}
              color="white"
              colorScheme="red"
            >
              {isLoading ? <ThreeDotsLoading /> : t('common:Cancel')}
            </Button>
          </HStack>
        </Stack>
      </form>
    </Box>
  );
}

export default CreateProcessForm;
