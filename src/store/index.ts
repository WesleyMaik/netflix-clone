//Modules
import { configureStore } from '@reduxjs/toolkit'

//Slice
import movieSlice from './contents'

export const store = configureStore({
  reducer: {
    content:movieSlice
  },
})