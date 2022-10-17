//Modules
import styled from "styled-components";

//Components
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton, useMediaQuery } from "@chakra-ui/react";

//Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface IContentProps{
    genre?:string
}

export const Contents = (props:IContentProps) => {
    const Container = styled.div`
        padding:.5em;
        overflow:hidden;

        .swiper{
            width:100%;

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
                    }

                    @media screen and (max-width: 768px){
                        .content{
                            height:20vw;
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

    const [mobileRes] = useMediaQuery('(max-width: 768px)');
    
    return(
        <Container>
            <Swiper
                className="swiper"
                slidesPerView={mobileRes ? 2.5 : 5.5}
                spaceBetween={16}
                navigation={true} 
                modules={[Navigation]}
            >
            {
                [...Array(8)].map((_, key) => (
                    <SwiperSlide className="slide" key={key}>
                        <Skeleton className="content"/>
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </Container>
    )
};