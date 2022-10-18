//Modules
import type { NextApiRequest, NextApiResponse } from 'next'
import { api, theMovieDb } from '../../services/api';

export interface ITvResult { 
  backdrop_path: string;
  first_air_date: string;
  genre_ids?: (number)[] | null;
  id: number;
  name: string;
  title?:string;
  origin_country?: string[] | null;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export default function usersApi(req: NextApiRequest, res: NextApiResponse){
  api.get(theMovieDb.tv).then(({data}) => {
    res.status(200).json(data.results)
  });
};
