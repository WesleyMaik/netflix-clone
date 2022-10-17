//Modules
import styled from "styled-components";
import { api } from '../../services/api';
import { useEffect, useState } from "react";
import { IUserData } from "../../pages/api/users";

//Components
import Link from 'next/link';
import Image from "next/image";
import { Heading } from "@chakra-ui/react";
import { motion } from 'framer-motion';

export const Profiles = () => {
    const [users, setUsers] = useState<IUserData[] | null>(null);
    useEffect(() => {
        if(!users) api('/api/users').then(({data}) => {
            setUsers(data)
        });
    }, [users]);

    const Container = styled.div`
        display:flex;
        flex-direction:row;
        align-items:center;
        gap:1em;

        .avatar{
            cursor: pointer;
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:0.5em;

            .img{
                border-radius:4px;
                transition:all ease 0.5s;
                &:hover{
                    opacity:.75;
                }
            }
        }
    `;
    
    return(
        <Container>
            {
                users && users.map((user, key) => {
                    return (
                        <Link href='/browser' key={key}>
                            <motion.div 
                                className="avatar"
                                initial={{ opacity:0, scale: 1.2 }}
                                animate={{ opacity:1, scale: 1 }}
                                transition={{
                                    duration:0.75
                                }}
                            >
                                <Image className="img" src={user.img} width={128} height={128}/>
                                <Heading fontWeight='normal' size='md'>{user.name}</Heading>
                            </motion.div>
                        </Link>
                    )
                })
            }
        </Container>
    )
};