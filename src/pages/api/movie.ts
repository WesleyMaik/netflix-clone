//Modules
import type { NextApiRequest, NextApiResponse } from 'next'
import { api, theMovieDb } from '../../services/api';

export interface IMovieResult{ 
    adult: boolean;
    backdrop_path: string;
    id: number;
    name?: string;
    title?: string;
    original_title?: string;
    original_name?: string;
    original_language: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids?: (number)[] | null;
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country?: string[] | null;
    release_date: string;
    video: boolean;
};

export default function usersApi(req: NextApiRequest, res: NextApiResponse){
  api.get(theMovieDb.movies).then(({data}) => {
    res.status(200).json(data.results)
  });
};
