import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Center, Pagination } from '@mantine/core';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SearchInput from '../../components/search-input/search-input';
import css from './home-page.module.scss';
import { CatBreedModel, CatBreedSortFields } from '../../models/CatBreed.model';
import CatBreedTable from '../../components/cat-breed-table/cat-breed-table';
import CatBreedTableSkeleton from '../../components/cat-breed-table/cat-breed-table-skeleton';
import { SortModel } from '../../models/Sort.model';
import { sortData } from '../../services/sort';

export const useNavigation = (totalPages: number) => {
    const navigate = useNavigate();
    const { pageNumber: pageNumberUrlParam } = useParams();
    const [activePageNumber, setActivePageNumber] = useState<number>(1);

    const handleNavigation = (
        pageNumber: number,
        searchValue: string | null,
        sort: SortModel | null
    ) => {
        let url = `/${pageNumber}`;

        if (searchValue && sort) {
            url += `?search=${searchValue}`;
            url += `&sort=${sort.field}&direction=${sort.direction}`;
        } else if (searchValue) {
            url += `?search=${searchValue}`;
        } else if (sort) {
            url += `?sort=${sort.field}&direction=${sort.direction}`;
        }
        navigate(url);
    };

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

    return { activePageNumber, handleNavigation };
};

export const usePaging = (
    fetchedData: CatBreedModel[] | undefined,
    activePageNumber: number
) => {
    const [displayData, setDisplayData] = useState<CatBreedModel[]>();

    useEffect(() => {
        if (fetchedData && activePageNumber) {
            const dataSlice = fetchedData.slice(
                activePageNumber * 10 - 10,
                activePageNumber * 10
            );

            setDisplayData(dataSlice);
        }
    }, [fetchedData, activePageNumber]);

    return { displayData };
};

export const useFetching = () => {
    const [searchParams] = useSearchParams();
    const [searchText, setSearchText] = useState<string>('');
    const [sortState, setSortState] = useState<SortModel | null>(null);
    const [filteredData, setFilteredData] = useState<CatBreedModel[]>();
    const [totalPages, setTotalPages] = useState<number>(0);

    const { isLoading, data: queryData } = useQuery('cat-breeds', async () => {
        const response = await axios.get<CatBreedModel[]>(
            'https://api.thecatapi.com/v1/breeds'
        );

        return response.data;
    });

    useEffect(() => {
        const searchParam = searchParams.get('search');
        const sortName = searchParams.get('sort') as CatBreedSortFields;
        const sortDirection = searchParams.get('direction');

        if (sortName && sortDirection) {
            const sort: SortModel = {
                field: sortName,
                direction: sortDirection,
            };
            setSortState(sort);
        }
        setSearchText(searchParam ?? '');
    }, [searchParams]);

    useEffect(() => {
        if (queryData) {
            let filteredData = queryData;

            if (searchText) {
                filteredData = filteredData.filter((catBreed) =>
                    catBreed.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                );
            }

            if (sortState) {
                filteredData = sortData(filteredData, sortState);
            }
            setTotalPages(
                filteredData ? Math.ceil(filteredData.length / 10) : 1
            );
            setFilteredData(filteredData);
        }
    }, [queryData, searchText, sortState]);

    return { searchText, sortState, totalPages, filteredData, isLoading };
};

export default function HomePage() {
    const { searchText, sortState, totalPages, filteredData, isLoading } =
        useFetching();
    const { activePageNumber, handleNavigation } = useNavigation(totalPages);
    const { displayData } = usePaging(filteredData, activePageNumber);

    const handleSearch = (searchValue: string) => {
        handleNavigation(1, searchValue, sortState);
    };

    const handlePageChange = (pageNumber: number) => {
        handleNavigation(pageNumber, searchText, sortState);
    };

    const handleSortChange = (sort: SortModel) => {
        handleNavigation(activePageNumber, searchText, sort);
    };

    return (
        <div className={`${css.appContainer}`}>
            <SearchInput
                value={searchText}
                props={{ className: `${css.searchInput}` }}
                handleSubmit={(value) => handleSearch(value)}
            />
            <div className={css.breedList}>
                {isLoading ? (
                    <CatBreedTableSkeleton />
                ) : (
                    <CatBreedTable
                        onSortChange={handleSortChange}
                        catBreeds={displayData}
                    />
                )}
            </div>
            <Center className={css.pagination}>
                <Pagination
                    page={activePageNumber}
                    onChange={(pageN) => handlePageChange(pageN)}
                    total={totalPages}
                />
            </Center>
        </div>
    );
}
