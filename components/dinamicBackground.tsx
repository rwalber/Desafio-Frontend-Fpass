import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const DinamicBackground = () => {

    const [ images, setImages ] = useState<string[]>();
    const [ baseRandom, setBaseRandom ] = useState<string[]>(['2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
    
    useEffect(() => {
        setImages(gerateRandomImages(baseRandom));
    }, []);

    function gerateRandomImages(array: string[]) {
        let auxArray = array.slice();
        let sortImages: string[] = [];
        for (var i = 0; i < 4; i++) {
          const indiceSorteado = Math.floor(Math.random() * auxArray.length);
          sortImages.push(auxArray[indiceSorteado]);
          auxArray.splice(indiceSorteado, 1);
        }
        return sortImages;
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
    width: 100%;
    /* height: 100%; */
    
    position: absolute;
    
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
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
    opacity: .25;
    object-fit: cover;
    transition: .4s all;
    border-radius: .5rem;
    &:hover {
        opacity: .6;
    }
`