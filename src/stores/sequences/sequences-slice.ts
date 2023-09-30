/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Status } from '../../_const/types';
import TAction from '../_consts';

type TSequencesState = {
  status: Status;
  processedSequencesIds: string[];
};

const initialState: TSequencesState = {
  status: Status.None,
  processedSequencesIds: [],
};

export const sequencesReducer = createSlice({
  name: 'sequences',
  initialState,
  reducers: {
    setSequenceLoadStatus: (state, action: TAction<Status>) => {
      state.status = action.payload;
    },
    pushProcessedSequencesId: (state, action: TAction<string>) => {
      state.processedSequencesIds = [
        ...state.processedSequencesIds,
        action.payload,
      ];
    },
    clearProcessedSequencesId: (state, action: TAction<string>) => {
      state.processedSequencesIds = state.processedSequencesIds.filter(
        (sequencesId) => sequencesId !== action.payload
      );
    },
  },
});

export const {
  setSequenceLoadStatus,
  pushProcessedSequencesId,
  clearProcessedSequencesId,
} = sequencesReducer.actions;

export const selectSequenceLoadStatus = (state: RootState): Status =>
  state.sequences.status;

export const selectProcessedSequencesIds = (state: RootState): string[] =>
  state.sequences.processedSequencesIds;

export default sequencesReducer.reducer;
