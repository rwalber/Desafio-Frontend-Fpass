import React from "react";
import styled from 'styled-components';

import { SiBookstack } from 'react-icons/si';
import { BiMoviePlay, BiLink } from 'react-icons/bi';
import { BsFillCalendarEventFill } from 'react-icons/bs';

import Link from "next/link";

const CharactersList = (props: any) => {
    return (
        props.characters?.map((character: any) => {
            return (
                <Link style={{ textDecoration: 'none', width: '100%' }} href={{ pathname: '/hero', query: { id: character.id }}} key={ character.id }>
                    <Character key={ character.name }>
                        <HeaderCharacter>
                            <Thumbnail>
                                <Image src={ `${character.thumbnail.path}.${character.thumbnail.extension}` } alt={ character.name } />
                            </Thumbnail>
                            <Content>
                                <Name>{ character.name }</Name>
                                <Description>{ character.description }</Description>
                                <FooterCharacter>
                                    <FooterItem> <SiBookstack /> Comics ( { character.comics.available } )</FooterItem>
                                    <FooterItem> <BiMoviePlay /> Series( { character.series.available } )</FooterItem>
                                    <FooterItem> <BsFillCalendarEventFill /> Events ( { character.events.available } )</FooterItem>
                                    <FooterItem> <BiLink /> Links( { character.urls.length } )</FooterItem>
                                </FooterCharacter>
                            </Content>
                        </HeaderCharacter>
                    </Character>
                </Link>
            )
        })
    )
}

export default CharactersList;

const Character = styled.div`
    width: 100%;
    &:hover {
        cursor: pointer;
        background-color: #d3d1d139;
        transition: .4s all;
    }
`

const HeaderCharacter = styled.div`
    display: flex;
    padding: .7rem 1rem;
    flex-direction: row;
    @media screen and (max-width: 500px) {
        flex-direction: column;
    }
`

const Thumbnail = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 1rem;
`

const Name = styled.h1`
    color: #FFF;
    font-size: 1.8rem;
`

const Description = styled.span`
    color: #FFF;
    margin: .2rem 0;
    font-size: 1rem;
    text-align: justify;
    hyphens: auto;
    -ms-hyphens: auto;
    -webkit-hyphens: auto;
`

const FooterCharacter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: .5rem 0;
    @media screen and (max-width: 600px) {
        flex-wrap: wrap;
    }
`

const FooterItem = styled.span`
    color: #FFF;
    margin-right: .8rem;
    font-size: .8rem;
`