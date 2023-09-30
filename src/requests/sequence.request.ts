/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, postFile, postFormData } from '../_helpers/requests.helper';

const fetchSequences = (): Promise<any> => get('/sequences/');
const createSequence = (file: File): Promise<any> =>
  postFile('/sequence/create/', file);

const processSequence = async (
  sequenceId: string,
  handlerId: string
): Promise<any> => {
  const formData = new FormData();
  formData.append('sequence_id', sequenceId);
  formData.append('handler_id', handlerId);

  return postFormData('/sequence/process/', formData);
};

export { fetchSequences, createSequence, processSequence };
