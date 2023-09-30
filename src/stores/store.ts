import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sequencesReducer from './sequences/sequences-slice';
import processesReducer from './processes/processes.slice';
import aiPlayerReducer from './ai-player/ai-player.slice';

export const store = configureStore({
  reducer: {
    sequences: sequencesReducer,
    processes: processesReducer,
    aiPlayer: aiPlayerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
