import {
    Center,
    createStyles,
    Group,
    ScrollArea,
    Table,
    UnstyledButton,
} from '@mantine/core';
import {
    IconChevronDown,
    IconChevronUp,
    IconSelector,
} from '@tabler/icons-react';
import { useState } from 'react';
import css from './cat-breed-table.module.scss';
import { CatBreedModel, CatBreedSortFields } from '../../models/CatBreed.model';
import { SortModel } from '../../models/Sort.model';

const useStyles = createStyles((theme) => ({
    control: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },
}));

interface Props {
    catBreeds: CatBreedModel[] | undefined;
    onSortChange: (sort: SortModel) => void;
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const { classes } = useStyles();
    const Icon = sorted
        ? reversed
            ? IconChevronUp
            : IconChevronDown
        : IconSelector;
    return (
        <th className={css.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <div className={css.sortText}>{children}</div>
                    <Center>
                        <Icon size="0.9rem" stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

export default function CatBreedTable({ catBreeds, onSortChange }: Props) {
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (fieldName: CatBreedSortFields) => {
        const reversed = !reverseSortDirection;
        setReverseSortDirection(reversed);
        const sort: SortModel = {
            field: fieldName,
            direction: reversed ? 'asc' : 'desc',
        };
        onSortChange(sort);
    };

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
                    <Th
                        sorted
                        reversed={reverseSortDirection}
                        onSort={() => setSorting(CatBreedSortFields.name)}
                    >
                        Breed name
                    </Th>
                    <th>Description</th>
                    <th className={css.lifeSpanColumn}>Life span</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
