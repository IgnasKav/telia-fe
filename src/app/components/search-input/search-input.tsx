import {
    TextInput,
    TextInputProps,
    ActionIcon,
    useMantineTheme,
} from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Props {
    handleSubmit: (value: string) => void;
    props: TextInputProps;
    value: string;
}

export default function SearchInput({ handleSubmit, props, value }: Props) {
    const [inputValue, setInputValue] = useState<string>(value);
    const theme = useMantineTheme();

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        handleSubmit(inputValue);
    };

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <TextInput
                icon={<IconSearch size={18} stroke={1.5} />}
                radius="xl"
                size="md"
                value={inputValue}
                onChange={(event) => changeInputValue(event)}
                rightSection={
                    <ActionIcon
                        size={32}
                        radius="xl"
                        color={theme.primaryColor}
                        variant="filled"
                        onClick={() => onSubmit()}
                    >
                        <IconArrowRight size={18} stroke={1.5} />
                    </ActionIcon>
                }
                placeholder="Search for cats"
                rightSectionWidth={42}
                {...props}
            />
        </form>
    );
}
