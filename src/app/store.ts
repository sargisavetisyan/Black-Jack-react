import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blackJackSlice from '../features/blackjack/blackjackSlice';

export const store = configureStore({
  reducer: {
    blackJackData: blackJackSlice
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
