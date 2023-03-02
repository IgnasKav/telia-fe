import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Center, Pagination } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../../components/search-input/search-input';
import css from './home-page.module.scss';
import { CatBreed } from '../../models/CatBreed';
import CatBreedTable from '../../components/cat-breed-table/cat-breed-table';
import CatBreedTableSkeleton from '../../components/cat-breed-table/cat-breed-table-skeleton';

export default function HomePage() {
    const navigate = useNavigate();
    const { pageNumber: pageNumberUrlParam } = useParams();

    const [searchText, setSearchText] = useState<string>('');
    const [displayData, setDisplayData] = useState<CatBreed[]>();
    const [activePageNumber, setActivePageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const { isLoading, data } = useQuery('cat-breeds', async () => {
        const response = await axios.get<CatBreed[]>(
            'https://api.thecatapi.com/v1/breeds'
        );

        setTotalPages(response.data ? Math.ceil(response.data.length / 10) : 1);
        return response.data;
    });

    useEffect(() => {
        if (!pageNumberUrlParam || !totalPages) {
            return;
        }

        if (!/\d+/.test(pageNumberUrlParam) || +pageNumberUrlParam <= 0) {
            navigate('/1');
            return;
        }

        if (+pageNumberUrlParam > totalPages) {
            navigate(`/${totalPages}`);
            return;
        }

        setActivePageNumber(+pageNumberUrlParam);
    }, [pageNumberUrlParam, totalPages, navigate]);

    useEffect(() => {
        if (data && activePageNumber) {
            const dataSlice = data?.slice(
                activePageNumber * 10 - 10,
                activePageNumber * 10
            );
            setDisplayData(dataSlice);
        }
    }, [data, activePageNumber]);

    return (
        <div className={`${css.appContainer}`}>
            <SearchInput
                props={{ className: `${css.searchInput}` }}
                handleSubmit={(value) => setSearchText(value)}
            />
            <div className={css.breedList}>
                {isLoading ? (
                    <CatBreedTableSkeleton />
                ) : (
                    <CatBreedTable catBreeds={displayData} />
                )}
            </div>
            <Center className={css.pagination}>
                <Pagination
                    page={activePageNumber}
                    onChange={(pageN) => navigate(`/${pageN}`)}
                    total={totalPages}
                />
            </Center>
        </div>
    );
}
