import React from "react";
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent = (props: any) => {
    return (
        <Content>
            <CircularProgress color="inherit" />
        </Content>
    )
}

export default LoadingComponent;

const Content = styled.div`
    width: 100%;
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`