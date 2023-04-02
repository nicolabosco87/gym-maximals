import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useFormulas } from '../../hooks/useFormulas'
import { saveSettings } from '../../state/actions'
import { FormulaType, state } from '../../state/state'
import { notifications } from '@mantine/notifications'
import { SectionTitle } from '../../ui/SectionTitle'
import { GoBack } from '../../ui/GoBack'
import { Card, Grid, Text } from '@mantine/core'

export default function Formula() {
    const navigate = useNavigate()
    const { settings } = useSnapshot(state)
    const formulas = useFormulas()

    const saveFormula = (selectedFormula: FormulaType) => {
        saveSettings({ ...settings, formulaType: selectedFormula })
        notifications.show({
            message: 'Formula saved',
        })
        navigate('/settings')
    }

    return (
        <>
            <main>
                <SectionTitle left={<GoBack link="/settings" />}>
                    Settings / Formula
                </SectionTitle>

                <Grid>
                    {Object.entries(formulas).map(([key, formula]) => (
                        <Grid.Col key={formula.id}>
                            <Card
                                onClick={() => saveFormula(key as FormulaType)}
                                sx={(theme) => ({
                                    cursor: 'pointer',
                                    background:
                                        settings.formulaType === key
                                            ? theme.colors.orange[0]
                                            : 'transparent',
                                })}
                                withBorder
                            >
                                <Text size="lg">{formula.label}</Text>
                                <Text color="dimmed">{formula.info}</Text>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
                {/* <Grid>
                    <Grid.Col>
                        <Flex justify="end">
                            <Button onClick={saveFormula}>Save Settings</Button>
                        </Flex>
                    </Grid.Col>
                </Grid> */}
            </main>
        </>
    )
}
