import { Button, Flex, Grid, NumberInput, Select, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { z } from 'zod'
import { useFormulas } from '../../hooks/useFormulas'
import { saveSettings } from '../../state/actions'
import { state } from '../../state/state'
import { SectionTitle } from '../../ui/SectionTitle'

type FormValues = {
    weightUnit: 'kg' | 'lb'
    listStep: '10' | '5'
    hideStepsBelow: number
    currentWeight: number
}

const schema = z.object({
    weightUnit: z.string(),
    listStep: z.string(),
    hideStepsBelow: z
        .number()
        .min(0, { message: '% should be greater than 0' })
        .max(100, { message: '% should be less than 100%' }),
})

export default function Settings() {
    const { settings } = useSnapshot(state)
    const navigate = useNavigate()

    const formulas = useFormulas()

    const form = useForm<FormValues>({
        initialValues: { ...settings },
        validate: zodResolver(schema),
    })

    const onSubmit = (values: FormValues) => {
        saveSettings({ ...values, formulaType: settings.formulaType })
        notifications.show({
            message: 'Settings saved',
        })
    }

    return (
        <>
            <main>
                <SectionTitle>Maximals</SectionTitle>

                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Grid>
                        <Grid.Col>
                            <Text size="sm" weight={500}>
                                Current formula:
                            </Text>
                            <Button
                                fullWidth
                                variant="outline"
                                onClick={() => navigate('/settings/formula')}
                            >
                                {formulas[settings.formulaType].label}
                            </Button>
                        </Grid.Col>
                        <Grid.Col>
                            <Select
                                data={[
                                    {
                                        value: 'kg',
                                        label: 'Kg',
                                    },
                                    {
                                        value: 'lb',
                                        label: 'Lb',
                                    },
                                ]}
                                label="Weight Unit"
                                placeholder="Select weight unit"
                                {...form.getInputProps('weightUnit')}
                            />
                        </Grid.Col>
                        <Grid.Col>
                            <Select
                                data={[
                                    {
                                        value: '10',
                                        label: '10',
                                    },
                                    {
                                        value: '5',
                                        label: '5',
                                    },
                                ]}
                                label="List step"
                                placeholder="Select list step"
                                {...form.getInputProps('listStep')}
                            />
                        </Grid.Col>
                        <Grid.Col>
                            <NumberInput
                                label="Hide steps below %"
                                placeholder="Enter %"
                                min={0}
                                max={99}
                                {...form.getInputProps('hideStepsBelow')}
                            />
                        </Grid.Col>
                        <Grid.Col>
                            <NumberInput
                                label="Current weight"
                                placeholder="Enter current weight"
                                min={0}
                                max={999}
                                {...form.getInputProps('currentWeight')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col>
                            <Flex justify="end">
                                <Button type="submit">Save Settings</Button>
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </form>
            </main>
        </>
    )
}
