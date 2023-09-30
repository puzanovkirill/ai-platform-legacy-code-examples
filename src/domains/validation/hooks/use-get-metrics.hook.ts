import { useState } from 'react';
import Cookies from 'universal-cookie';

type TMetric = {
  metric_id: string;
  handler_id: string;
  sequence_id: string;
  analyzer_id: string;
  meta: {
    [key: string]: any;
  };
};

type TMetricsData = {
  metrics: TMetric[];
};

export const useGetMetrics = () => {
  const [metrics, setMetrics] = useState<TMetric[]>([]);
  const access = new Cookies().get('access') as string;

  const getMetrics = (body: FormData) => {
    fetch('/factory/metrics/', {
      method: 'POST',
      body,
      headers: {
        Token: access,
      },
    })
      .then((data) => data.json())
      .then((result: TMetricsData) => {
        setMetrics(result.metrics);
      })
      .catch((err) => console.log(err));
  };

  return { metrics, getMetrics, setMetrics };
};
