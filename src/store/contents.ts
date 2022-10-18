//Modules
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMovieResult } from '../pages/api/movie';
import { ITvResult } from '../pages/api/tv';

const initialState:{
  movie:IMovieResult[] | null,
  serie:ITvResult[] | null,
} = {
  movie: null,
  serie: null
};

const movieSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setMovies: (state, action:PayloadAction<IMovieResult[]>) => {
      state.movie = action.payload;
    },
    setSeries: (state, action:PayloadAction<ITvResult[]>) => {
      state.serie = action.payload;
    }
  },
});

export const { setMovies, setSeries } = movieSlice.actions;

interface IGetState{
  content:{
    movie:IMovieResult[] | null,
    serie:ITvResult[] | null
  }
}

export const getMovie = (state:IGetState) => state.content.movie;
export const getSerie = (state:IGetState) => state.content.serie;

export default movieSlice.reducer;