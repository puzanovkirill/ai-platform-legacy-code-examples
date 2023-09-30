import Cookies from 'universal-cookie';

export const useUploadMetrics = () => {
  const access = new Cookies().get('access') as string;

  const uploadMetrics = (data: FormData) => {
    fetch('/factory/metric/create/', {
      method: 'POST',
      body: data,
      headers: {
        Token: access,
      },
    }).catch((err) => console.log(err));
  };
  return { uploadMetrics };
};
