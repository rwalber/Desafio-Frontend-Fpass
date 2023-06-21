import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import CharactersList from '@/components/charactersList';

import { MenuItem } from '@mui/material';
import { Characters } from '@/models/characteres';
import { MainComponent } from '@/layout/LayoutComponent';
import { baseURL, generateHash } from '@/api/api';

import { styled as muiStyled } from '@mui/system';
import type { NextPage } from 'next';
import LoadingComponent from '@/components/loadingComponent';

const AllHeroes: NextPage = () => {

    const [ page, setPage ] = useState<number>(1);
    const [ filter, setFilter ] = useState<string>('name');
    const [ loading, setLoading ] = useState<boolean>(true);
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
        await axios.get(`${baseURL}/characters?${generateHash()}&offset=${totalPerPage * (page-1)}&orderBy=${filter}&limit=${totalPerPage}`).then(({ data }) => {
            setTotalPages(data.data.total);
            setCharacters(data.data.results);
            setLoading(false);
        }).catch((error) => {});
    };

    useEffect(() => {
        getCharacters();
    }, [ page, filter, totalPerPage ]);

    const mainComponent = () => {
        return(
            <MainComponent>
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
            </MainComponent>
        )
    }

    return (
        loading ? <LoadingComponent /> : mainComponent()
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

const HeaderComponent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
`

const Content = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`