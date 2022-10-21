//Modules
import type { NextApiRequest, NextApiResponse } from 'next'

export interface IUserData{
  id:string,
  name: string,
  img: string,
  kid: boolean
};

const users:IUserData[] = [
  {
    id:'1',
    name:'João',
    img:'/img/profile/joao.png',
    kid:false
  },
  {
    id:'2',
    name:'Clara',
    img:'/img/profile/clara.png',
    kid:false
  },
  {
    id:'3',
    name:'Alice',
    img:'/img/profile/alice.png',
    kid:false
  },
  {
    id:'4',
    name:'Pedrinho',
    img:'/img/profile/pedrinho.png',
    kid:true
  },
];

export default function usersApi(req: NextApiRequest, res: NextApiResponse<IUserData[]>) {
  res.status(200).json(users)
};
