/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck

import { useCallback, useMemo } from 'react';
import { GroundTrue } from '../../../../_const/ground-true/ground-true.type';
import { Process } from '../../../../_const/process/process.type';
import { useGetCurrentVideoMetrics } from '../../../../domains/validation';
import {
  useGetCurrentProcesses,
  useGetGroundTrueBySequenceId,
  useGetSelectedFileId,
  useGetSequence,
  useGetUrlParametersByKeys,
} from '../../../../hooks';

  //TODO Rewrite algorithms to be typed
  //TODO Rewrite algorithms to be typed
  //TODO Rewrite algorithms to be typed
  //TODO Rewrite algorithms to be typed

function useGetAllProcessesByType() {
  const { fileId } = useGetSelectedFileId();
  const meta = useGetSequence(fileId).data?.meta ?? { numFrames: 1 };
  const { version: currentHandlerId } = useGetUrlParametersByKeys('version');
  const { data: processes = [], isValidating: isValidatingProcesses } =
    useGetCurrentProcesses(fileId, currentHandlerId);
  const { data: groundTrueArray = [], isValidating: isValidatingGT } =
    useGetGroundTrueBySequenceId(fileId);
  const processesTypes = [];
  const { metrics } = useGetCurrentVideoMetrics();
  if (processes && processes.length) processesTypes.push('process');
  if (groundTrueArray && groundTrueArray.length)
    processesTypes.push('groundTrue');
  if (
    metrics?.meta?.failureCases.some((process) => process?.failureType === 'FN')
  )
    processesTypes.push('FN');
  if (
    metrics?.meta?.failureCases.some((process) => process?.failureType === 'FN')
  )
    processesTypes.push('FP');

  /**
   *
   * @param array массив процессов из трейсов или GT
   * @param dataType тип процесса, по умолчанию process для процессов из трейсов, для GT - groundTrue
   * @returns объект, ключами которого являются id объекта, значение - список процессов, внутри которых могут быть children - дочерние процессы. Все дочерние процессы ссылаются на родительский процесс (ключ parent)
   */
  const getGroupedObjects = useCallback(
    (array: Array<Process | GroundTrue>, dataType = 'process') => {
      const objectsSet = new Set();
      const typesSet = new Set();

      array.forEach((item) => {
        if (item?.object && !item?.parent) objectsSet.add(item.object?.id);
        typesSet.add(item.type);
      });

      let tmp = {};

      const newProcesses = array.map((item) => ({
        ...item,
        dataType,
        start: (item.frameRange[0] / meta.numFrames) * 100,
        long:
          ((item.frameRange[1] - item.frameRange[0]) / meta.numFrames) * 100,
      }));

      /**
       * Рекурсивный проход по списку процессов с добавлением children - списка дочерних процессов, к каждому процессу
       * @param process ground true процесс
       * @returns - новый ground true процесс с добавленными children
       */
      function addChild(process: GroundTrue) {
        const children = newProcesses
          .filter((a) => a.parent === process.id)
          .map(addChild);

        if (children.length > 0) return { ...process, children };

        return { ...process };
      }

      const processesWithChildren = newProcesses.map(addChild);

      [...objectsSet].forEach((id) => {
        tmp = {
          ...tmp,
          [id]:
            processesWithChildren.filter((item) => item?.object?.id === id) ??
            [],
        };
      });

      return tmp;
    },
    [meta.numFrames]
  );

  const groupedProcesses: { [key: string]: Array<Process | GroundTrue> } =
    useMemo(
      () => ({
        ...getGroupedObjects(groundTrueArray, 'groundTrue'),
        ...getGroupedObjects(processes),
      }),
      [getGroupedObjects, groundTrueArray, processes]
    );

  const failureCasesProcesses: {
    [key: string]: Array<Process & { failureType: string }>;
  } = getGroupedObjects(metrics?.meta?.failureCases ?? []);

  const getObjectsByType = useCallback(
    (type: string) =>
      groundTrueArray.filter((item) => item.object?.class === type),
    [groundTrueArray]
  );

  return {
    groupedProcesses,
    getObjectsByType,
    processesTypes,
    failureCasesProcesses,
    loading: isValidatingProcesses || isValidatingGT,
  };
}

export default useGetAllProcessesByType;
