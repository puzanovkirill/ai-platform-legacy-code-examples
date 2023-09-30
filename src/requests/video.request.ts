import {
  CONTENT_TYPE_JSON,
  createHeaders,
  get,
  sendRequestProcessResponceAsync,
} from '../_helpers/requests.helper';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postVideoBlob = (path: string, videoBlob: Blob): Promise<any> => {
  const headers = createHeaders({
    'Content-type': CONTENT_TYPE_JSON,
  });
  // 'application/octet-stream'
  return sendRequestProcessResponceAsync({
    method: 'POST',
    headers,
    path,
    body: videoBlob,
  });
};

export const getVideo = (videoID: string): Promise<any> =>
  get(`/sequence/${videoID}/`);
