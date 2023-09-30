/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  get,
  postFormData,
  sendRequestProcessResponceAsync,
} from '../_helpers/requests.helper';

export const postGroundTrue = (
  path: string,
  sequenceId: string,
  file: File,
  isGroundTrue: boolean
): Promise<any> => {
  const formData = new FormData();
  formData.append('sequence_id', sequenceId);
  formData.append('info', file);

  if (isGroundTrue) {
    formData.append('type', 'ground_truth');
  }

  return sendRequestProcessResponceAsync({
    method: 'POST',
    path,
    body: formData,
  });
};

export const loadGroundTrueRequest = (
  sequenceId: string,
  file: File,
  isGroundTrue: boolean
): Promise<any> =>
  postGroundTrue('/sequence/info/', sequenceId, file, isGroundTrue);

export const createGroundTrueProcessRequest = (
  formData: FormData
): Promise<any> => postFormData('/sequence/ground/create/', formData);

export const fetcherPreview = (sequenceId: string): Promise<any> =>
  get(`/sequence/${sequenceId}/preview/`, 'image/jpeg');
