/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import TAction from '../_consts';
import { Status } from '../../_const/types';
import { RootState } from '../store';

type TAIPlayerState = {
  isPlay: boolean;
  currentTime: number;
  timeStamp: number;
  isStartFileBlobDownload: boolean;
  loadingVideoStatus: Status;
  volume: number;
};

const initialState: TAIPlayerState = {
  isPlay: false,
  currentTime: 0,
  timeStamp: 0,
  loadingVideoStatus: Status.None,
  isStartFileBlobDownload: false,
  volume: 100,
};

const aiPlayerSlice = createSlice({
  name: 'aiPlayer',
  initialState,
  reducers: {
    reset(state) {
      state.isPlay = false;
      state.currentTime = 0;
      state.timeStamp = 0;
      state.isStartFileBlobDownload = false;
      state.loadingVideoStatus = Status.None;
      state.volume = 100;
    },

    setVolume(state, action: TAction<number>) {
      state.volume = action.payload;
    },

    setIsPlay(state, action: TAction<boolean>) {
      state.isPlay = action.payload;
    },

    setCurrentTime(state, action: TAction<number>) {
      state.currentTime = action.payload;
    },

    setTimeStep(state: TAIPlayerState, action: TAction<number>) {
      state.timeStamp = state.currentTime + action.payload;
    },

    setTimeStamp(state, action: TAction<number>) {
      state.timeStamp = action.payload;
    },

    setLoadingVideoStatus(state, action: TAction<Status>) {
      state.loadingVideoStatus = action.payload;
    },

    setIsStartFileBlobDownload(state, action: TAction<boolean>) {
      state.isStartFileBlobDownload = action.payload;
    },
  },
});

const {
  setIsPlay,
  setCurrentTime,
  setTimeStep,
  setTimeStamp,
  reset,
  setIsStartFileBlobDownload,
  setLoadingVideoStatus,
  setVolume,
} = aiPlayerSlice.actions;

const selectVolume = (state: RootState): number => state.aiPlayer.volume;

const selectIsPlay = (state: RootState): boolean => state.aiPlayer.isPlay;

const selectCurrentTime = (state: RootState): number =>
  state.aiPlayer.currentTime;

const selectTimeStamp = (state: RootState): number => state.aiPlayer.timeStamp;

const selectIsStartFileBlobDownload = (state: RootState): boolean =>
  state.aiPlayer.isStartFileBlobDownload;

const selectLoadingVideoStatus = (state: RootState): Status =>
  state.aiPlayer.loadingVideoStatus;

export {
  setIsPlay,
  setCurrentTime,
  setTimeStep,
  setTimeStamp,
  setIsStartFileBlobDownload,
  setVolume,
  reset,
  setLoadingVideoStatus,
  selectIsPlay,
  selectCurrentTime,
  selectTimeStamp,
  selectIsStartFileBlobDownload,
  selectLoadingVideoStatus,
  selectVolume,
};
export default aiPlayerSlice.reducer;
