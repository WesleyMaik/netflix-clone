//Modules
import { configureStore } from '@reduxjs/toolkit'

//Slice
import movieSlice from './movie'

export const store = configureStore({
  reducer: {
    movie:movieSlice
    // tv: 
  },
})