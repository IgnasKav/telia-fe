import { CatBreedSortFields } from './CatBreed.model';

export interface SortModel {
    field: CatBreedSortFields;
    direction: string;
}
