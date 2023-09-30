/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import TAction from '../_consts';
import { Process } from '../../_const/process/process.type';
import { RootState } from '../store';

type ProcessesState = {
  selectedProcess: Process | null;
  isWantAddProcess: boolean;
  isWantEditProcess: boolean;
  currentProcessId: string;
};

const initialState: ProcessesState = {
  selectedProcess: null,
  isWantAddProcess: false,
  isWantEditProcess: false,
  currentProcessId: '',
};

export const processesSlice = createSlice({
  name: 'processes',
  initialState,
  reducers: {
    setWantAddProccess: (state, action: TAction<boolean>) => {
      state.isWantEditProcess = false;
      state.isWantAddProcess = action.payload;
    },
    setSelectProcess: (state, action: TAction<Process>) => {
      state.selectedProcess = action.payload;
    },
    resetSelectProcess: (state) => {
      state.selectedProcess = null;
    },
    setCurrentProcessId: (state, action: TAction<string>) => {
      state.currentProcessId = action.payload;
    },
    resetCurrentProcessId: (state) => {
      state.currentProcessId = '';
    },
  },
});

export const selectChosenProcess = (state: RootState): Process | null =>
  state.processes.selectedProcess;

export const selectIsWantAddProcess = (state: RootState): boolean =>
  state.processes.isWantAddProcess;

export const selectIsWantEditProcess = (state: RootState): boolean =>
  state.processes.isWantEditProcess;

export const selectCurrentProcessId = (state: RootState): string =>
  state.processes.currentProcessId;

export const {
  resetSelectProcess,
  setWantAddProccess,
  setSelectProcess,
  setCurrentProcessId,
  resetCurrentProcessId,
} = processesSlice.actions;

export default processesSlice.reducer;
