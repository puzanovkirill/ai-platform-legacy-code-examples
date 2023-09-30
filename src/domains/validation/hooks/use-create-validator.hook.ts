import Cookies from 'universal-cookie';
import { useGetValidators } from './use-get-validators.hook';

export const useCreateValidator = () => {
  const access = new Cookies().get('access') as string;
  const { mutate } = useGetValidators();

  const createValidator = (data: FormData) => {
    fetch('/factory/analyzer/create/', {
      method: 'POST',
      body: data,
      headers: {
        Token: access,
      },
    })
      .then(() => mutate())
      .catch((err) => console.log(err));
  };

  return { createValidator };
};
