import { createSlice } from '@reduxjs/toolkit';

export interface UsersState {
    emailOfBoss: string;
    notificationsOfBoss: string[];
    notifications: string[];
    email: string;
    boss: boolean;
    technician: boolean;
}

const initialState: UsersState = {
    emailOfBoss: '',
    notificationsOfBoss: [],
    notifications: [],
    email: '',
    boss: false,
    technician: false,
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
            state.notifications = action.payload.notifications;
            state.email = action.payload.email;
            state.boss = action.payload.boss;
            state.technician = action.payload.technician;
        },
    },
});

export const { setDataOfUsersBoss, setUserData } = usersSlice.actions;

export default usersSlice.reducer;
