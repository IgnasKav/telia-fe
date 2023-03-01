import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Center, Pagination } from '@mantine/core';
import SearchInput from '../../components/search-input/search-input';
import css from './home-page.module.scss';
import { CatBreed } from '../../models/CatBreed';
import CatBreedTable from '../../components/cat-breed-table/cat-breed-table';

export default function HomePage() {
    const [searchText, setSearchText] = useState<string>('');
    const [displayData, setDisplayData] = useState<CatBreed[]>();

    const { isLoading, data } = useQuery('cat-breeds', async () => {
        const response = await axios.get<CatBreed[]>(
            'https://api.thecatapi.com/v1/breeds'
        );
        return response.data;
    });

    useEffect(() => {
        setDisplayData(data?.slice(0, 10));
    }, [data]);

    const totalPages = data ? Math.floor(data.length / 10) : 1;

    const setPage = (pageNumber: number) => {
        const dataSlice = data?.slice(pageNumber * 10 - 10, pageNumber * 10);
        setDisplayData(dataSlice);
    };

    return (
        <div className={`${css.appContainer}`}>
            <SearchInput
                props={{ className: `${css.searchInput}` }}
                handleSubmit={(value) => setSearchText(value)}
            />
            <div className={css.breedList}>
                <CatBreedTable catBreeds={displayData} />
            </div>
            <Center className={css.pagination}>
                <Pagination onChange={setPage} total={totalPages} />
            </Center>
        </div>
    );
}
