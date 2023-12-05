import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    emailOfBoss: string;
}

const initialState: CounterState = {
    emailOfBoss: '',
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserEmail: (state, action) => {
            state.emailOfBoss = action.payload;
        },
    },
});

export const { setUserEmail } = usersSlice.actions;

export default usersSlice.reducer;
