
import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";

export const Search = () => {
    const Container = styled.label`
        display:flex;
        align-items:center;
        gap:.5em;

        padding:.5em;
        border:1px solid #ffffff40;
        border-radius:8px;
        outline:1px solid transparent;
        background:#00000020;
        transition:all ease .25s;


        &:has(.field:focus){
            outline:1px solid #fff;
        }

        .field{
            background:none;
            border:none;
            outline:none;

            &::placeholder{
                color:#ffffffaf;
            }
        }

        @media screen and (max-width:768px) {
            .field{
                display:none;
            }
        }
    `;
    
    const ref = useRef<HTMLLabelElement>(null);

    return(
        <Container ref={ref}>
            <FiSearch className="icon" />
            <input className="field" type="text" placeholder="Buscar"/>
        </Container>
    )
};