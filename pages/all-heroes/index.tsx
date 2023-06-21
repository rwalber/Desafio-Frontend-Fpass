import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import CharactersList from '@/components/charactersList';

import { MenuItem } from '@mui/material';
import { Characters } from '@/models/characteres';
import { baseURL, generateHash } from '@/api/api';

import { styled as muiStyled } from '@mui/system';
import type { NextPage } from 'next';

const AllHeroes: NextPage = () => {

    const [ page, setPage ] = useState<number>(1);
    const [ filter, setFilter ] = useState<string>('name');
    const [ totalPages, setTotalPages ] = useState<number>(0);
    const [ characters, setCharacters ] = useState<Characters>();
    const [ totalPerPage, setTotalPerPage ] = useState<number>(5);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
    };

    const handleChangeFilter = (event: any) => {
        setFilter(event.target.value);
    };

    const handleChangeTotalPerPage = (event: any) => {
        setTotalPerPage(event.target.value);
    }

    const getCharacters = async () => {
        await fetch(`${baseURL}/characters?${generateHash()}&offset=${totalPerPage * (page-1)}&orderBy=${filter}&limit=${totalPerPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
        }).then((response) => {
            return response.json();
        }).then(({ data }) => {
            setTotalPages(data.total);
            setCharacters(data.results);
        }).catch((error) => {});
    };

    useEffect(() => {
        getCharacters();
    }, [ page, filter, totalPerPage ]);

    return (
        <Main>
            <HeaderComponent>
                <h1>All Heroes</h1>
                <div>
                    <MySelect
                        value={ totalPerPage }
                        label="Total per page"
                        onChange={ (event) => handleChangeTotalPerPage(event) }
                        style={{ width: '5rem', marginRight: '1rem' }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </MySelect>
                    <MySelect
                        value={ filter }
                        label="Filter by"
                        onChange={ (event) => handleChangeFilter(event) }
                        style={{ width: '10rem' }}
                    >
                        <MenuItem value='name'>A-Z</MenuItem>
                        <MenuItem value='-name'>Z-A</MenuItem>
                        <MenuItem value='modified'>Modified</MenuItem>
                    </MySelect>
                </div>
            </HeaderComponent>
            <Content>
                <CharactersList characters={ characters } />
            </Content>
            <Stack spacing={2}>
                <MyPagination onChange={ (event, value) => handleChangePage(null, value) } count={ totalPages } variant="outlined" shape="rounded" />
            </Stack>
        </Main>
    )
}

export default AllHeroes;

const MyPagination = muiStyled(Pagination)({
    '& .Mui-selected': {
      backgroundColor: 'red !important',
      color:'#FFF',
      border: 'none'
    },
    '& .MuiPaginationItem-root': {
        color:'#FFF',
        borderColor: '#757575'
    }
});

const MySelect = muiStyled(Select)({
    height: '2.8rem',
    color: '#FFF',
    borderColor: '#FFF',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FFF'
    },
    '& .MuiSvgIcon-root': {
        color: '#FFF'
    },
    "&:hover": {
        "&& fieldset": {
          borderColor: "#FFF"
        }
    },
    '& .MuiInputLabel-root': {
        color: '#FFF'
    },
});

const Main = styled.main`
    display: flex;
    padding: 2rem;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const HeaderComponent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
    margin-bottom: 1rem;
`

const Content = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1rem;
`