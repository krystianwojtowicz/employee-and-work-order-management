import { createSlice } from '@reduxjs/toolkit';

export interface UsersState {
    emailOfBoss: string;
    notificationsOfBoss: string[];
    notifications: string[];
}

const initialState: UsersState = {
    emailOfBoss: '',
    notificationsOfBoss: [],
    notifications: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setDataOfUsersBoss: (state, action) => {
            state.emailOfBoss = action.payload.emailOfYourBoss;
            state.notificationsOfBoss = action.payload.notifications;
        },
        setUserData: (state, action) => {
            state.notifications = action.payload;
        },
    },
});

export const { setDataOfUsersBoss, setUserData } = usersSlice.actions;

export default usersSlice.reducer;
