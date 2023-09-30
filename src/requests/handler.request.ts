/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '../_helpers/requests.helper';

export const fetchHandlers = (): Promise<any> => get('/handlers/');
export const fetchHandlerVersions = (handlerName: string): Promise<any> =>
  get(`/handler/versions/?handler_name=${handlerName}`);
