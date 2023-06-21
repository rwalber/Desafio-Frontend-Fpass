import React, { useState, useEffect } from "react";
import styled, { keyframes } from 'styled-components';

import { useForm } from "react-hook-form";
import { Characters } from "@/models/characteres";
import { baseURL, generateHash } from "@/api/api";

import type { NextPage } from 'next';

import CharactersList from "@/components/charactersList";
import DinamicBackground from "@/components/dinamicBackground";

const Home: NextPage = () => {

    const { register, getValues, handleSubmit } = useForm();
    const [ characters, setCharacters ] = useState<Characters[]>();

    useEffect(() => {
        setCharacters([]);
    }, []);

    const getCharacters = (query: string) => {
        if(query === '') {
            setCharacters([]);
        } else {
            fetch(`${baseURL}/characters?${generateHash()}&nameStartsWith=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            }).then((response) => {
                return response.json();
            }).then(({ data }) => {
                setCharacters(data.results);
            }).catch((error) => {});
        }
    }

    return (
        <Main>
            <DinamicBackground />
            <Content>
                <Title>Marvel Wiki</Title>
                <SubTitle>Find and discover exclusive facts about your favorite hero</SubTitle>
                <Form onSubmit={ handleSubmit((data) => getCharacters(data.name)) }>
                    <Input type="text"
                        placeholder="Which hero do you want to research today?"
                        {...register("name", {
                            required: true,
                            onChange: (e) => { getCharacters(e.target.value) },
                        })}
                    />
                </Form>
                {
                    getValues("name") !== '' ? 
                        <DisplayHeroes hidden={ getValues("name") === '' }>
                            { <CharactersList characters={ characters } /> }
                        </DisplayHeroes>
                    : null
                }
            </Content>
        </Main>
    )
}

export default Home;

const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Title = styled.h1`
    font-size: 3rem;
    font-weight: 700;
`

const SubTitle = styled.h2`
    font-size: 1.5rem;
`

const Content = styled.div`
    width: 60%;
    z-index: 10;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const Form = styled.form`
    width: 100%;
`

const Input = styled.input`
    width: 98%;
    height: 2.8rem;
    border-radius: .2rem;
    border: none;
    padding: 0 .5rem;
    margin: 1rem 0;
    opacity: .9;
    &:focus {
        outline: none;
    }
    &::placeholder {
        font-size: .8rem;
        font-family: 'Carter One', cursive;
    }
`

const DisplayHeroes = styled.div`
    background-color: #413636d8;
    width: 100%;
    height: 30rem;
    overflow-y: scroll;
    display: inline-block;
    visibility: ${(props) => props.hidden ? 'hidden' : 'visible'};
    animation: ${(props) => props.hidden ? fadeOut : fadeIn } .4s ease-in-out;
    transition: visibility .4s ease-in-out;
`

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 0;
  }

  to {
    transform: scale(.25);
    opacity: 1;
  }
`;