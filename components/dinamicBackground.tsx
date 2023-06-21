import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const DinamicBackground = () => {

    const [ images, setImages ] = useState<string[]>();
    const [ baseRandom, setBaseRandom ] = useState<string[]>(['2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
    
    useEffect(() => {
        setImages([
            randomImage(baseRandom),
            randomImage(baseRandom),
            randomImage(baseRandom),
            randomImage(baseRandom),
        ]);
    }, []);

    const randomImage = (arr: Array<string>) => {
        const random = Math.floor(Math.random() * arr.length);
        setBaseRandom(baseRandom.filter(item => !baseRandom.includes(item)));
        return baseRandom[random];
    }

    return(
        <Background>
            {
                images?.map((image, index) => {
                    return(
                        <ImageContainer key={ index }>
                            <Image src={`/hero${image}.webp`} alt="Hero" loading="lazy" />
                        </ImageContainer>
                    )
                })
            }
        </Background>
    )
};

export default DinamicBackground;

const Background = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    position: absolute;
`

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24%;
    height: 50rem;
    border-radius: .5rem;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: .5rem;
    opacity: .25;
    transition: .4s all;
    &:hover {
        opacity: .6;
    }
`