import React, { useState, useEffect } from "react";

import moment from "moment";
import styled from 'styled-components';
import CommicsList from "@/components/commicsList";

import { Commics } from "@/models/commics";
import { useRouter } from 'next/router';
import { Characters } from "@/models/characteres";
import { baseURL, generateHash } from '@/api/api';

import type { NextPage } from 'next';

const Hero: NextPage = () => {
    
    const router = useRouter();
    const { id } = router.query;

    const [ commics, setCommics ] = useState<Commics[]>();
    const [ character, setCharacter ] = useState<Characters>();

    const getCharacters = async () => {
        await fetch(`${baseURL}/characters/${id}?${generateHash()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
        }).then((response) => {
            return response.json();
        }).then(({ data }) => {
            setCharacter(data.results[0]);
            getCommics(data.results[0].comics.collectionURI);
        }).catch((error) => {});
    };

    const getCommics = async (collectionURI: string) => {
        await fetch(`${collectionURI}?${generateHash()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
        }).then((response) => {
            return response.json();
        }).then(({ data }) => {
            setCommics(data.results);
        }).catch((error) => {});
    };

    useEffect(() => {
        getCharacters();
    }, []);

    return (
        <Main>
            <h1>{ character?.name }</h1>
            <Content>
                <div style={{ width: '50%' }}>
                    <div style={{ marginBottom: '1.2rem' }}>
                        <Span><SpanTitle>Last update: </SpanTitle>{ moment(character?.modified).format('MMMM Do YYYY, h:mm:ss') }</Span>
                        <Span><SpanTitle>Series: </SpanTitle>{ character?.series?.available }</Span>
                        <Span><SpanTitle>Stories: </SpanTitle>{ character?.stories?.available }</Span>
                    </div>
                    <h2 style={{ marginBottom: '1.2rem' }}>Description</h2>
                    <Text style={{ }}>{ character?.description }</Text>
                    <Image src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`} alt="Hero" loading="lazy" />
                </div>
                <CommicsContainer>
                    <h2 style={{ marginBottom: '1.2rem' }}>Commics</h2>
                    <CommicsList commics={ commics }></CommicsList>
                </CommicsContainer>
            </Content>
            
        </Main>
    )
}

export default Hero;

const Main = styled.main`
    display: flex;
    padding: 2rem;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
`

const Content = styled.div`
    margin: 1rem 0;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
`

const CommicsContainer = styled.div`
    width: 45%;
    height: 42rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: .5rem;
`

const Image = styled.img`
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

const Text = styled.p`
    margin: .5rem 0;
    text-align: justify;
    hyphens: auto;
    -ms-hyphens: auto;
    -webkit-hyphens: auto;
`

const SpanTitle = styled.span`
    font-size: 1.2rem;
    font-family: 'Carter One', cursive;
    margin-right: .5rem;
`

const Span = styled.span`
    font-size: .9rem;
    margin-right: 1rem;
`