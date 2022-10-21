//Modules
import styled from "styled-components"

//Components
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Flex, HStack } from "@chakra-ui/react";
import { FiGift } from 'react-icons/fi'
import { FaBell } from 'react-icons/fa'
import { BiCaretDown } from 'react-icons/bi'
import { useRef } from "react";
import { Search } from "../input/search";

export const Logo = () => {
    const Container = styled.nav`
        width:100%;
        height:4em;
        display:flex;
        align-items:center;
        padding:1em;
    `;

    return(
        <Container>
            <Image src="/logo.png" width={128} height={32}/>
        </Container>
    )
};

export const Navigation = () => {
    const Container = styled.nav`
        width:100%;
        height:4em;
        display:flex;
        align-items:center;
        gap:.5em;
        position:fixed;
        top:0px;
        padding:1em;
        transition:all ease .25s;
        z-index:10;

        &.active{
            background:#12151c;
        }
        
        .logo{
            min-width:2vw;
        }
        .logo-responsive{
            display:none;
        }

        .stack{
            button{
                font-size:1em;
            }
        }

        .categories, .options{
            button{
                background:none;
                &:hover{
                    opacity:.75;
                }
            }
        }

        @media screen and (max-width:1090px){
            .stack{
                button{
                    font-size:.8em;
                }
            }
        }

        @media screen and (max-width:960px){
            .logo{
                display:none;
            }
            .logo-responsive{
                display:block;
                min-width:16px;
            }
            .stack{
                justify-content:center;
                button{
                    font-size:1em;
                }
            }
            .categories{
                justify-content:center;
                padding:0;
                .home, .list{
                    display:none;
                }
            }
            .options{
                margin:0;
                &> *:not(:first-child){
                    display:none;
                }
                &> *:first-child{
                    padding:0;
                }
            }
        }
    `;

    //Ref
    const containerRef = useRef<HTMLDivElement>(null);
    
    //Scroll Effect
    if(process.browser){
        document.addEventListener('scroll', () => {
            if(window.scrollY > Number(containerRef.current?.clientHeight)){
                containerRef.current?.classList.add('active');
            }else{
                containerRef.current?.classList.remove('active');
            };
        });
    };

    return(
        <Container ref={containerRef}>
            <span className="logo">
                <Image src="/logo.png" width={128} height={32}/>
            </span>
            <span className="logo-responsive">
                <Image src="/logo-short.png" width={16} height={32}/>
            </span>
            <HStack className="stack" width='100%' justifyContent="space-between">
                <Flex className="categories" gap=".5em" padding='0 1em'>
                    <Link href="#">
                        <Button className="home">Início</Button>
                    </Link>
                    <Link href="#">
                        <Button className="series">Séries</Button>
                    </Link>
                    <Link href="#">
                        <Button className="movie">Filmes</Button>
                    </Link>
                    <Link href="#">
                        <Button className="category">Categorias</Button>
                    </Link>
                    <Link href="#">
                        <Button className="list">Minha lista</Button>
                    </Link>
                </Flex>
                <Flex className="options" alignItems='center'>
                    <Button>
                        <Search />
                    </Button>
                    <Button>Infantil</Button>
                    <Button>
                        <FiGift size={20} />
                    </Button>
                    <Button>
                        <FaBell size={20} />
                    </Button>
                    <Button>
                        <Avatar size='sm' borderRadius={4}/>
                        <BiCaretDown />
                    </Button>
                </Flex>
            </HStack>
        </Container>
    )
};