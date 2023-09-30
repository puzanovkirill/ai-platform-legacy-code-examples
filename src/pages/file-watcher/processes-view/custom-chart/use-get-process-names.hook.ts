/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import {
  useGetSelectedFileId,
  useGetUrlParametersByKeys,
  useGetCurrentProcesses,
  useGetGroundTrueBySequenceId,
} from '../../../../hooks';

const useGetProcessNames = () => {
  const [names, setNames] = useState<Array<string>>([]);
  const { fileId } = useGetSelectedFileId();
  const { version: currentHandlerId = '' } =
    useGetUrlParametersByKeys('version');
  const { data: processes = [] } = useGetCurrentProcesses(
    fileId,
    currentHandlerId
  );
  const { data: groundTrueArray = [] } = useGetGroundTrueBySequenceId(fileId);

  useEffect(() => {
    [...processes, ...groundTrueArray].forEach((item) => {
      const processType = item?.object?.class as string;

      if (processType && !names.includes(processType)) {
        setNames([...names, processType]);
      }
    });
  }, [processes, groundTrueArray]);

  return names;
};

export default useGetProcessNames;
