import Home from "./home";
import React from "react";
import styled from 'styled-components';

import type { NextPage } from 'next';

const Index: NextPage = () => {
    return (
        <Main>
            <Home />
        </Main>
    )
}

export default Index;

const Main = styled.main`
    width: 100%;
    display: flex;
    min-height: 92vh;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`