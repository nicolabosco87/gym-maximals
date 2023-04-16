import { Button, Checkbox, Group, NumberInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import React from 'react'
import { z } from 'zod'

export type MaximalFormValues = {
    label: string
    weight: number
    reps: number
    considerWeight: boolean
}

const schema = z.object({
    label: z.string(),
    weight: z
        .number()
        .min(1, { message: 'Maximal should be a positive number' }),
    reps: z.number().min(1, { message: 'Maximal should be a positive number' }),
})

type MaximalFormProps = {
    onSubmit: (values: MaximalFormValues) => void
    initialValues: MaximalFormValues
    submitLabel?: string
}

export const MaximalForm = ({
    initialValues,
    onSubmit,
    submitLabel = 'Add',
}: MaximalFormProps) => {
    const form = useForm<MaximalFormValues>({
        initialValues: initialValues,
        validate: zodResolver(schema),
    })

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label="Label"
                placeholder="Maximal label"
                {...form.getInputProps('label')}
            />

            <NumberInput
                label="Weight"
                placeholder="Weight in kg"
                {...form.getInputProps('weight')}
            />

            <NumberInput
                label="Reps"
                placeholder="Reps"
                {...form.getInputProps('reps')}
            />

            <Checkbox
                label="Consider weight"
                description="Consider this maximal with body-weight in it, common in StreetLifting"
                {...form.getInputProps('considerWeight', {
                    type: 'checkbox',
                })}
            />

            <Group position="right" mt="xl">
                <Button type="submit">{submitLabel}</Button>
            </Group>
        </form>
    )
}
