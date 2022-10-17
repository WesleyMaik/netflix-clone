//Modules
import type { NextApiRequest, NextApiResponse } from 'next'

export interface IUserData{
  name: string,
  img: string,
  kid: boolean
};

const users:IUserData[] = [
  {
    name:'João',
    img:'/img/profile/joao.png',
    kid:false
  },
  {
    name:'Clara',
    img:'/img/profile/clara.png',
    kid:false
  },
  {
    name:'Alice',
    img:'/img/profile/alice.png',
    kid:false
  },
  {
    name:'Pedrinho',
    img:'/img/profile/pedrinho.png',
    kid:true
  },
];

export default function usersApi(req: NextApiRequest, res: NextApiResponse<IUserData[]>) {
  res.status(200).json(users)
};
