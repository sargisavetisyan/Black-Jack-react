import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blackGackSlice from '../features/blackgack/blackgackSlice';

export const store = configureStore({
  reducer: {
    blackGackData: blackGackSlice
  },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
