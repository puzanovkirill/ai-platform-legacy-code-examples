import Cookies from 'universal-cookie';
import { useMemo } from 'react';
import useSWR from 'swr';
import {
  useGetSelectedFileId,
  useGetSequence,
  useGetUrlParametersByKeys,
} from '../../../hooks';
import { TCvatSample, TSample } from '../../../_const/sample/sample.type';
import { get } from '../../../_helpers/requests.helper';

type TSamples = {
  samples: TSample[] | undefined;
};

type TCvatSamples = {
  samples: TCvatSample[] | undefined;
};

function useGetSample() {
  const { fileId } = useGetSelectedFileId();
  const meta = useGetSequence(fileId).data?.meta;
  const { version: currentHandlerId } = useGetUrlParametersByKeys('version');
  const access = new Cookies().get('access') as string | null;

  const { data, error, isValidating } = useSWR<TSamples, string>(
    fileId && currentHandlerId && meta
      ? `/sequence/${fileId}/handler/${currentHandlerId}/sample/0-${meta.numFrames}/`
      : null,
    get,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: cvatSamples } = useSWR<TCvatSamples, string>(
    fileId && meta && access
      ? `/sequence/${fileId}/handler/${access}/sample/0-${meta.numFrames}/`
      : null,
    get,
    {
      revalidateOnFocus: false,
    }
  );

  const filteredSamples: TSample[] | undefined = useMemo(
    () =>
      data?.samples?.map((sample) => ({
        ...sample,
        objects: sample.objects.filter((object) => object.score >= 0.6),
      })),
    [data, fileId, currentHandlerId]
  );

  return {
    samples: filteredSamples,
    error,
    isValidating,
    cvatSamples: cvatSamples?.samples,
  };
}

export default useGetSample;
