import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const LS_FAV_KEY = 'rfk';
interface GithubState {
  favourites: string[];
}

const initialState: GithubState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
};

const setLocal = (key: string, item: string[]) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload);
      setLocal(LS_FAV_KEY, state.favourites);
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter((item) => item !== action.payload);
      setLocal(LS_FAV_KEY, state.favourites);
    },
  },
});
export const githubActions = githubSlice.actions;

export const githubReducer = githubSlice.reducer;
