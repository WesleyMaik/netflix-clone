//Modules
import styled from "styled-components";
import { ITvResult } from "../../pages/api/tv";
import { theMovieDb } from "../../services/api";
import { IMovieResult } from "../../pages/api/movie";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { getMovies, getSeries } from "../../hook/getContent";

//Components
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Heading, HStack, Skeleton, Text, useMediaQuery } from "@chakra-ui/react";

//Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { HiPlay, HiInformationCircle, HiPlus } from "react-icons/hi2";

interface IContentProps{
    type?:"movie" | "tv",
    genre?:number
};

type IContentConcat = IMovieResult[] & ITvResult[]

export const Contents = (props:IContentProps) => {
    const Container = styled.div`
        padding:.5em 1em;
        overflow:hidden;
        .swiper{
            width:100%;
            overflow:visible;
            .swiper-wrapper{
                display:flex;
                flex-direction:row;
                align-items:center;
                flex-wrap:nowrap;
                .slide{
                    flex-shrink:0;
                    .content{
                        cursor:pointer;
                        width:100%;
                        height:8vw;
                        border-radius:4px;
                        overflow:hidden;
                    }
                    @media screen and (max-width: 768px){
                        .content{
                            height:50vw;
                        }
                    }
                }
            }
            .swiper-button-next, .swiper-button-prev{
                color:#fff;
                &:after{
                    font-size:1.5em;
                }
            }
            .swiper-button-disabled{
                display:none;
            }
        }
    `;

    //Mobile resolution
    const [mobileRes] = useMediaQuery('(max-width: 768px)');

    //States
    const movieContent = getMovies(),
          serieContent = getSeries(),
          arrContent = (props.type == 'movie') ? movieContent : serieContent;

    let result = null;

    //Get movies and series from genre
    const getFromGenre = () => {
        if(movieContent && serieContent){
            result = ((serieContent as IContentConcat)?.concat(movieContent) )?.filter((item) => item.genre_ids?.find((genre) => genre == props.genre));
        };
    };
    
    //Sorting
    switch(true){
        case (Boolean(props.genre)):
            getFromGenre();
        break;
        default:
            result = arrContent?.map(value => ({ value, sort: Math.random() }))?.sort((a, b) => a.sort - b.sort)?.map(({ value }) => value)?.slice(0,9);
        break;
    };

    //Title
    let title:string = props.type == 'movie' ? "Filmes" : "Séries";


    const getTranslatedGenre = (genre:Number) => {
        switch(genre){
            case 12: return "Aventura"; 
            case 14: return "Fantasia"; 
            case 16: return "Animação"; 
            case 18: return "Drama"; 
            case 28: return "Ação"; 
            case 27: return "Horror"; 
            case 35: return "Comédia"; 
            case 36: return "História"; 
            case 37: return "Faroeste"; 
            case 53: return "Suspence"; 
            case 80: return "Crimes"; 
            case 99: return "Documentários"; 
            case 878: return "Ficção Científica"; 
            case 9648: return "Mistério"; 
            case 10402: return "Musical"; 
            case 10749: return "Romance"; 
            case 10751: return "Para toda família"; 
            case 10752: return "Guerra"; 
            case 10770: return "Séries de TV"; 
            default: return "";
        };
    };

    if(props.genre){
        title = getTranslatedGenre(props.genre);
    };

    interface IContentRef{
        handleContent:(data:IMovieResult | ITvResult) => void;
    };

    //Current content
    const currentRef = useRef<IContentRef>(null);
    const CurrentContent = forwardRef<IContentRef, any>((props, ref) => {
        const [content, setContent] = useState<(IMovieResult | ITvResult) | null>(null),
            handleContent = useCallback((data:IMovieResult | ITvResult) => {
                setContent(data);
            }, [content]);

        useImperativeHandle(ref, () => ({
            handleContent
        }));

        const Container = styled.div`
            .current-content{
                width:100%;
                min-height:30em;
                display:flex;
                flex-direction:row;
                gap:.25em;
                background:#001;
                margin:.5em 0;
                padding:1em;
                position:relative;
                background-image:url('${theMovieDb.cover + content?.backdrop_path}');
                background-position:top;
                background-repeat:no-repeat;
                background-size:cover;

                &:before{
                    content:'';
                    width:100%;
                    height:100%;
                    position:absolute;
                    left:0;
                    bottom:0;
                    background: linear-gradient(90deg, rgba(0,0,0,.5) 50%, rgba(255,255,255,0) 100%);
                }

                .info{
                    width:100%;
                    max-width:768px;
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    gap:.5em;
                    padding:1em;
                    z-index:1;

                    .actions{
                        margin-top:auto;
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
                }
            }
        `;

        const date = (content) &&  new Date(content.first_air_date).getFullYear() || null;

        return(
            <Container>
                { 
                    (content) && 
                    <motion.div 
                        className="current-content"
                        initial={{ opacity:0, height:0 }}
                        animate={{ opacity:1, height:'30em' }}
                    >
                        <div className="info">
                            { date && <Text>{ date }</Text> }
                            <Heading size="lg">{ content.title || content.name }</Heading>
                            <Text>{ content?.genre_ids?.map((genre) => { return getTranslatedGenre(genre) }).join(' - ') }</Text>
                            <Text>{ content.overview }</Text>
                            <HStack className="actions">
                                <Button className="button button_play"><HiPlay />  Assistir</Button>
                                <Button className="button button_info"><HiPlus /> Adicionar a lista</Button>
                            </HStack>
                        </div>
                    </motion.div> 
                }
            </Container>
        )
    }); CurrentContent.displayName = "CurrentContent";

    return( 
        <>
        <Container>
            <Heading size="lg" margin=".25em 0">{ title }</Heading>
            <Swiper
                className="swiper"
                slidesPerView={mobileRes ? 2.5 : 5.5}
                spaceBetween={18}
                navigation={true} 
                modules={[Navigation]}
            >
            {
                (!result) ? 
                [...Array(6)].map((_, key) => (
                    <SwiperSlide className="slide" key={key}>
                        <Skeleton className="content"/>
                    </SwiperSlide>
                )) :
                result.map((item, key) => {
                    const Content = styled.div`
                        display:flex;
                        flex-direction:column;
                        justify-content:flex-end;
                        background-size:cover;
                        background-repeat:no-repeat;
                        background-position:center;
                        background-image:url('${theMovieDb.image + item.backdrop_path}');
                        transition:all ease .25s;
                        padding:.5em;
                        &:before{
                            content:'';
                            width:100%;
                            height:50%;
                            position:absolute;
                            bottom:0;
                            left:0;
                            background: rgba(0,0,0,0);
                            transition:all ease .5s;
                        }
                        &:hover:not(&.active){
                            transform:scale(1.075);
                            z-index:1;
                            
                            &:before{
                                background: linear-gradient(0deg, rgba(0,0,0,.5) 0%, rgba(255,255,255,0) 100%);
                            }

                            .title{
                                opacity:1;
                                transform:translateY(0%);
                            }
                        }
                        &.active{
                            outline:2px solid #fff;

                            &:before{
                                background: linear-gradient(0deg, rgba(0,0,0,.5) 0%, rgba(255,255,255,0) 100%);
                            }

                            .title{
                                z-index:1;
                                opacity:1;
                                transform:translateY(0%);
                            }
                        }
                        .title{
                            z-index:1;
                            opacity:0;
                            transform:translateY(50%);
                            transition:all ease .25s;
                        }
                    `;


                    const ContentSlide = () => {
                        const title = item['title'] ||  item['name'];
                        const contentRef = useRef<HTMLDivElement>(null);

                        const handleOpen = () => {
                            document.querySelectorAll('.content').forEach((element) => {
                                element.classList.remove('active');
                            });
                            contentRef.current?.classList.add('active');
                            if(event?.target != contentRef?.current){
                                document.querySelectorAll('.current-content').forEach((element) => {
                                    element.remove();
                                });
                            };
                            currentRef.current?.handleContent(item);
                        };

                        return(
                            <>
                                <SwiperSlide className="slide" onClick={handleOpen}>
                                    <Content className="content" ref={contentRef}>
                                        <Heading size="sm" className="title">{ title }</Heading>
                                    </Content>
                                </SwiperSlide>
                            </>
                        )
                    };

                    return(
                        <ContentSlide key={key} />
                    )
                })
            }
            </Swiper>
            <CurrentContent ref={currentRef}/>
        </Container>
        </>
    )
};