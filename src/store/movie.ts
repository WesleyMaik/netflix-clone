//Modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMovieResult } from '../pages/api/movie';
import { api, theMovieDb } from '../services/api';

const initialState:{
  data:IMovieResult[] | null
} = {
  data:null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action:PayloadAction<any>) => {
      state.data = action.payload;
    }
  },
});

export const { setMovies } = movieSlice.actions;

interface IGetState{
  movie:{
    data:IMovieResult[] | null
  }
}

export const getState = (state:IGetState) => state.movie.data;

export default movieSlice.reducer;