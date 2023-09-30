/* eslint-disable no-console */
/* eslint-disable import/order */
import { useState } from 'react';
import {
  useGetGroundTrueBySequenceId,
  useGetSelectedFileId,
} from '../../../../hooks';
import Cookies from 'universal-cookie';

function useAddGT() {
  const [isLoading, setIsLoading] = useState(false);
  const access = new Cookies().get('access') as string;
  const { fileId } = useGetSelectedFileId();
  const { mutate } = useGetGroundTrueBySequenceId(fileId);

  const addGt = (data: string) => {
    setIsLoading(true);
    fetch('/factory/sequence/feedback/', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        Token: access,
      },
    })
      .then(() => mutate())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return { addGt, isLoading };
}

export default useAddGT;
