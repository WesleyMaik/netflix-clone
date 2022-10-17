//Modules
import { useSelector } from 'react-redux'
import { getState } from '../store/movie';

export const getMovies = () => useSelector(getState);