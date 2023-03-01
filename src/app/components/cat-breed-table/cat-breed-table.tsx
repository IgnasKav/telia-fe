import { ScrollArea, Table } from '@mantine/core';
import { CatBreed } from '../../models/CatBreed';
import css from './cat-breed-table.module.scss';

interface Props {
    catBreeds: CatBreed[] | undefined;
}

export default function CatBreedTable({ catBreeds }: Props) {
    const rows = catBreeds?.map((breed) => (
        <tr key={breed.id}>
            <td>{breed.name}</td>
            <td>
                <ScrollArea style={{ height: 66 }}>
                    {breed.description}
                </ScrollArea>
            </td>
            <td>{breed.life_span}</td>
            <td>{breed.weight.metric}</td>
        </tr>
    ));

    return (
        <Table
            horizontalSpacing="xs"
            verticalSpacing="xs"
            striped
            highlightOnHover
            withBorder
            withColumnBorders
        >
            <thead>
                <tr>
                    <th className={css.nameColumn}>Breed name</th>
                    <th>Description</th>
                    <th className={css.lifeSpanColumn}>Life span</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
