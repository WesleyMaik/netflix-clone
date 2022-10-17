//Modules
import styled from "styled-components";
import { api } from "../services/api";
import { NextPage } from "next";
import { getMovies } from "../hook/getMovie";
import { setMovies } from "../store/movie";
import { useDispatch } from 'react-redux'

//Components
import { Navigation } from "../components/navigation";
import { Cover } from "../components/content/cover";
import { Contents } from "../components/content/contents";

const Browser:NextPage = () => {
    const Container = styled.main`
        display:flex;
        flex-direction:column;
        gap:1em;
    `;

    const movies = getMovies();
    const dispatch = useDispatch();

    if(!movies){
        api.get('/api/movie').then(({data}) => {
            dispatch(setMovies(data))
        });
    };

    return(
        <Container>
            <Navigation />
            <Cover />
            <Contents />
            <Contents />
            <Contents />
        </Container>
    )
}

export default Browser;