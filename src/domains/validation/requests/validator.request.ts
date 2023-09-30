import { get } from '../../../_helpers/requests.helper';

export const fetchValidators = (): Promise<any> => get('/analyzers/');
