import { useState } from 'react';
import SearchInput from '../../components/search-input/search-input';
import css from './home-page.module.scss';

export default function HomePage() {
    const [searchText, setSearchText] = useState<string>('');

    return (
        <>
            <SearchInput props={{className: `${css.searchInput}`}} handleSubmit={(value) => setSearchText(value)}/>
            Search text: {searchText}
        </>
    )
}