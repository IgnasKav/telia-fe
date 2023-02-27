import {TextInput, TextInputProps, ActionIcon, useMantineTheme} from '@mantine/core';
import {IconSearch, IconArrowRight} from '@tabler/icons-react';
import {ChangeEvent, FormEvent, useState} from "react";

interface Props {
    handleSubmit: (value: string) => void;
    props: TextInputProps
}

export default function SearchInput({handleSubmit, props}: Props) {
    const [inputValue, setInputValue] = useState<string>('')
    const theme = useMantineTheme();

    const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setInputValue(value);
    }

    const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (inputValue.trim() === '') return;
        handleSubmit(inputValue)
        setInputValue('')
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <TextInput
                icon={<IconSearch size={18} stroke={1.5}/>}
                radius="xl"
                size="md"
                value={inputValue}
                onChange={(event) => changeInputValue(event)}
                rightSection={
                    <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled"
                                onClick={() => onSubmit()}>
                        <IconArrowRight size={18} stroke={1.5}/>
                    </ActionIcon>
                }
                placeholder="Search Youtube video id"
                rightSectionWidth={42}
                {...props}
            />
        </form>

    );
}
