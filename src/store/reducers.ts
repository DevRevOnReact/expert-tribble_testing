import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/types';

interface UsersState {
  [x: string]: unknown;
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;