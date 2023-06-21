import React from "react";
import styled from 'styled-components';
import Navbar from "../components/navbar";

const LayoutComponent = ({ children }: any) => {
    
    return (
        <>
            <Navbar />
            <Main>
                { children }
            </Main>
        </>
    );
};
  
export default LayoutComponent;

const Main = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
    @media screen and (max-width: 505px) {
        padding-top: 6rem;
    }
`

export const MainComponent = styled.main`
    display: flex;
    padding: 2rem;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24%;
    height: 50rem;
    padding-top: 4rem;
    border-radius: .5rem;
`

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: .4s all;
    border-radius: .5rem;
    opacity: .25;
    margin-top: 1rem;
    &:hover {
        opacity: .6;
    }
`