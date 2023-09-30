import useSWRImmutable from 'swr/immutable';
import { fetchValidators } from '../requests';

export type TValidator = {
  id: string;
  name: string;
  version: string;
  url: string;
};

type ValidatorsData = {
  analyzers: TValidator[];
};

const fetcher = fetchValidators;

export const useGetValidators = () => {
  const { data, error, isValidating, mutate } = useSWRImmutable<
    ValidatorsData,
    string
  >('analyzers', fetcher, {
    shouldRetryOnError: false,
  });

  return { data: data?.analyzers, error, isValidating, mutate };
};
