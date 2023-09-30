import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetMetrics } from './use-get-metrics.hook';

export const useGetCurrentVideoMetrics = () => {
  const location = useLocation();
  const { getMetrics, metrics, setMetrics } = useGetMetrics();
  const search = new URLSearchParams(location.search);

  useEffect(() => {
    if (search.has('version') && search.has('validator')) {
      const formData = new FormData();
      formData.append('handler_id', search.get('version') as string);
      formData.append('sequence_id', location.pathname.replaceAll('/', ''));
      formData.append('analyzer_id', search.get('validator') as string);

      getMetrics(formData);
    } else setMetrics([]);
  }, [location.key]);

  return { metrics: metrics[0] };
};
