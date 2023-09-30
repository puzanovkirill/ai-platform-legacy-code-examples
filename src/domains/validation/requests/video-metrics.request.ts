import { get } from '../../../_helpers/requests.helper';

export const fetchVideoMetrics = (): Promise<any> => get('/metrics/');
