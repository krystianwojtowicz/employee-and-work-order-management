import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        tasks: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
