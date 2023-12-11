import { createSlice } from '@reduxjs/toolkit';
import { TaskItem } from '@/api/tasks';

export interface UsersState {
    tasks: TaskItem[];
}

const initialState: UsersState = {
    tasks: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksFromDB: (state, action) => {
            state.tasks = action.payload;
        },
    },
});

export const { setTasksFromDB } = tasksSlice.actions;

export default tasksSlice.reducer;
