import React from "react";
import styled from 'styled-components';

const CommicsList = (props: any) => {
    return (
        <Content>
            { props.commics?.map((commic: any) => {
                return (
                    <CommicCard key={ commic.id }>
                        <Thumbnail>
                            <Image src={ `${commic.thumbnail.path}.${commic.thumbnail.extension}` } alt={ commic.name } />
                        </Thumbnail>
                    </CommicCard>
                )
            })}
        </Content>
    )
}

export default CommicsList;

const CommicCard = styled.div`
    padding: 0 1.5rem 1.5rem 0;
    transition: .4s all;
    &:hover {
        cursor: pointer;
    }
`

const Thumbnail = styled.div`
    width: 14rem;
    border-radius: .5rem;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: .5rem;
    opacity: .55;
    transition: .4s all;
    &:hover {
        opacity: .9;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    max-height: 80rem;
    overflow-y: scroll;
`
