//Modules
import { useSelector } from 'react-redux'
import { getMovie, getSerie } from '../store/contents';

export const getMovies = () => useSelector(getMovie) || null;
export const getSeries = () => useSelector(getSerie) || null;