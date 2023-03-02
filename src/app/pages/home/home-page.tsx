import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Center, Pagination } from '@mantine/core';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SearchInput from '../../components/search-input/search-input';
import css from './home-page.module.scss';
import { CatBreed } from '../../models/CatBreed';
import CatBreedTable from '../../components/cat-breed-table/cat-breed-table';
import CatBreedTableSkeleton from '../../components/cat-breed-table/cat-breed-table-skeleton';

export default function HomePage() {
    const navigate = useNavigate();
    const { pageNumber: pageNumberUrlParam } = useParams();
    const [searchParams] = useSearchParams();

    const [searchText, setSearchText] = useState<string>('');
    const [displayData, setDisplayData] = useState<CatBreed[]>();
    const [activePageNumber, setActivePageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const { isLoading, data } = useQuery('cat-breeds', async () => {
        const response = await axios.get<CatBreed[]>(
            'https://api.thecatapi.com/v1/breeds'
        );

        return response.data;
    });

    const handleNavigation = (
        pageNumber: number,
        searchValue: string | null
    ) => {
        let url = `/${pageNumber}`;
        if (searchValue) {
            url += `?search=${searchValue}`;
        }
        navigate(url);
    };

    const onSearch = (searchValue: string) => {
        handleNavigation(1, searchValue);
    };

    const onPageChange = (pageNumber: number) => {
        const searchValue = searchParams.get('search');
        handleNavigation(pageNumber, searchValue);
    };

    useEffect(() => {
        const searchParam = searchParams.get('search');
        setSearchText(searchParam ?? '');
    }, [searchParams]);

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
            let filteredData = data;

            if (searchText) {
                filteredData = filteredData.filter((catBreed) =>
                    catBreed.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                );
            }

            const dataSlice = filteredData?.slice(
                activePageNumber * 10 - 10,
                activePageNumber * 10
            );
            setTotalPages(
                filteredData ? Math.ceil(filteredData.length / 10) : 1
            );
            setDisplayData(dataSlice);
        }
    }, [data, activePageNumber, searchText]);

    return (
        <div className={`${css.appContainer}`}>
            <SearchInput
                value={searchText}
                props={{ className: `${css.searchInput}` }}
                handleSubmit={(value) => onSearch(value)}
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
                    onChange={(pageN) => onPageChange(pageN)}
                    total={totalPages}
                />
            </Center>
        </div>
    );
}
