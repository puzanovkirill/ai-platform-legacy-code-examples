import { get, postFormData } from '../_helpers/requests.helper';

export type FeedbackDependsIds = {
  sequenceId: string;
  handlerId?: string;
};

export const fetchProcessFeedbackBySequenceRequest = ({
  sequenceId,
}: FeedbackDependsIds) => get(`/sequence/{${sequenceId}}/feedbacks/`);

export const fetchProcessFeedbackBySequenceByHandlerRequest = ({
  sequenceId,
  handlerId,
}: FeedbackDependsIds) =>
  handlerId &&
  get(`/sequence/{${sequenceId}}/handler/{${handlerId}}/feedbacks/`);

export const createProcessFeedbackRequest = (formData: FormData) =>
  postFormData('/sequence/feedback/create/', formData);
