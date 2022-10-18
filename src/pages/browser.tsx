//Modules
import styled from "styled-components";
import { api } from "../services/api";
import { NextPage } from "next";
import { getMovies, getSeries } from "../hook/getContent";
import { setMovies, setSeries } from "../store/contents";
import { useDispatch } from 'react-redux'

//Components
import { Navigation } from "../components/navigation";
import { Cover } from "../components/content/cover";
import { Contents } from "../components/content/contents";

let onceMovie = true,
    onceSerie = true;

const Browser:NextPage = () => {
    const Container = styled.main`
        display:flex;
        flex-direction:column;
        gap:1em;
    `;

    const movies = getMovies();
    const series = getSeries();
    const dispatch = useDispatch();

    if(!movies && onceMovie){
        api.get('/api/movie').then(({data}) => {
            dispatch(setMovies(data))
        });
        onceMovie = false;
    };

    if(!series && onceSerie){
        api.get('/api/tv').then(({data}) => {
            dispatch(setSeries(data))
        });
        onceSerie = false;
    };

    return(
        <Container>
            <Navigation />
            <Cover />
            <Contents type="movie" />
            <Contents type="tv" />
            <Contents genre={12}/>
            <Contents genre={18}/>
            <Contents genre={28}/>
            <Contents genre={27}/>
            <Contents genre={35}/>
        </Container>
    )
}

export default Browser;