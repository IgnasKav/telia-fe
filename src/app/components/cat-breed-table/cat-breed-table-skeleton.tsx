import { Skeleton, Table } from '@mantine/core';
import css from './cat-breed-table.module.scss';

export default function CatBreedTableSkeleton() {
    const rowSkeleton = (key: number) => (
        <tr key={key} className={css.skeletonRow}>
            <td>
                <Skeleton height={8} radius="xl" />
            </td>
            <td>
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
            </td>
            <td>
                <Skeleton height={8} radius="xl" />
            </td>
            <td>
                <Skeleton height={8} radius="xl" />
            </td>
        </tr>
    );

    const tableBody = [];

    for (let i = 0; i < 10; i++) {
        tableBody.push(rowSkeleton(i));
    }

    return (
        <Table
            horizontalSpacing="xs"
            verticalSpacing="xs"
            striped
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
            <tbody>{tableBody.map((row) => row)}</tbody>
        </Table>
    );
}
