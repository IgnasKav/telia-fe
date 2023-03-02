import { CatBreedModel } from '../models/CatBreed.model';
import { SortModel } from '../models/Sort.model';

export const sortData = (data: CatBreedModel[], sort: SortModel) => {
    const { field } = sort;
    const sortedData = [...data].sort((a, b) => {
        const aEl = a[field];
        const bEl = b[field];

        if (sort.direction === 'asc') {
            return bEl.localeCompare(aEl);
        }

        return aEl.localeCompare(bEl);
    });

    return sortedData;
};
