//Modules
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from "../../hook/getContent";
import { setMovies } from "../../store/contents";


//Components
import { HiPlay, HiInformationCircle } from "react-icons/hi2"
import { Button, Heading, Skeleton, HStack, Text } from "@chakra-ui/react";
import { theMovieDb } from "../../services/api";

export const Cover = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if(!loaded) setLoaded(true);
        }, 1000)
    }, [loaded])

    const Container = styled.div`
        .cover{
            width:100%;
            min-height:45em;
            display:flex;
            align-items:center;
            padding:2em;
            padding-top:4em;
            background-position:center;
            background-repeat:no-repeat;
            background-size:cover;
            position:relative;

            &:before{
                content:'';
                max-width:50%;
                width:100%;
                height:100%;
                position:absolute;
                left:0;
                bottom:0;
                background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
            }

            &::after{
                content:'';
                width:100%;
                height:4em;
                position:absolute;
                top:0;
                left:0;
                background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%);
            }

            .info{
                max-width: 40%;
                display:flex;
                flex-direction:column;
                gap:1em;
                z-index:1;

                button{
                    gap:.5em;
                    &:hover{
                        opacity:.75;
                    }
                }

                .button{
                    &>svg{
                        min-width:1em;
                    }

                    &.button_play{
                        background:#fff;
                        color:#000;
                    }
    
                    &.button_info{
                        color:#fff;
                        background-color:#87878780;
                    }
                }

            }

            @media screen and (max-width: 768px){
                align-items:flex-end;
                &:before{
                    max-width:100%;
                    height:100%;
                    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
                }
                .info{
                    max-width:100%;
                }
            }
        }
    `;

    const movies = getMovies(),
          featured = movies && movies[0],
          cover = theMovieDb.cover + featured?.poster_path;

    return(
        <Container>
            {
                (!loaded) ?
                <Skeleton className="cover" /> :
                <div className="cover" style={{
                    backgroundImage:`url(${cover || '/img/cover.jpg'})`
                }}>
                    <div className="info">
                        <Heading size="2xl">{featured?.title || 'Lorem Ipsum'}</Heading>
                        <Text>
                            {
                                featured?.overview ||    
                                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem cupiditate quis molestiae tempore saepe itaque eligendi repellendus soluta quo illum impedit et odio, iste eaque, laboriosam beatae temporibus ea rem!'
                            }               
                        </Text>
                        <HStack>
                            <Button className="button button_play"><HiPlay />  Assistir</Button>
                            <Button className="button button_info"><HiInformationCircle /> Mais informações</Button>
                        </HStack>
                    </div>
                </div>
            }
        </Container>
    )
};