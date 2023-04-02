import {
    ActionIcon,
    Flex,
    Group,
    Menu,
    Table,
    Title,
    useMantineTheme,
} from '@mantine/core'
import {
    IconDotsVertical,
    IconEdit,
    IconPercentage,
    IconTrash,
} from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useCalculateMax } from '../../hooks/useCalculateMax'
import { useConfirmMaximalDeletion } from '../../hooks/useConfirmMaximalDeletion'
import { toggleListStep } from '../../state/actions'
import { state } from '../../state/state'
import { GoBack } from '../../ui/GoBack'
import { SectionTitle } from '../../ui/SectionTitle'
import { formatNumber } from '../../utils/utils'

export const Show = () => {
    const navigate = useNavigate()
    // const { slug } = router.query

    const { slug } = useParams()

    const { maximals, settings } = useSnapshot(state)
    const calculateMax = useCalculateMax()
    const theme = useMantineTheme()

    const maximal = maximals.find((m) => m.slug === slug)
    const confirmDelete = useConfirmMaximalDeletion()

    const maxValue = useMemo(
        () => (maximal ? calculateMax(maximal) : 0),
        [calculateMax, maximal]
    )

    const percentages = useMemo(() => {
        const p =
            settings.listStep === '10'
                ? Array.from(Array(10)).map((v, i) => i * 10)
                : Array.from(Array(20)).map((v, i) => i * 5)

        return p.filter((value) => value >= settings.hideStepsBelow).reverse()
    }, [settings.hideStepsBelow, settings.listStep])

    return (
        <>
            <main>
                {!maximal ? (
                    'not found'
                ) : (
                    <>
                        <SectionTitle
                            left={<GoBack />}
                            right={
                                <Group>
                                    <ActionIcon onClick={toggleListStep}>
                                        <IconPercentage
                                            color={
                                                settings.listStep === '10'
                                                    ? theme.colors.blue[3]
                                                    : theme.colors.blue[8]
                                            }
                                        />
                                    </ActionIcon>

                                    <Menu shadow="md" width={200}>
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconDotsVertical />
                                            </ActionIcon>
                                        </Menu.Target>

                                        <Menu.Dropdown>
                                            <Menu.Label>Actions</Menu.Label>
                                            <Menu.Item
                                                icon={<IconEdit size={14} />}
                                                onClick={() =>
                                                    navigate(
                                                        `/maximals/${maximal.slug}/edit`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Menu.Item>
                                            <Menu.Item
                                                onClick={() =>
                                                    confirmDelete(maximal)
                                                }
                                                icon={<IconTrash size={14} />}
                                            >
                                                Delete
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            }
                        >
                            {maximal.label}
                        </SectionTitle>

                        <Flex justify="space-between" align="end" mb={20}>
                            <Title variant="gradient" order={4}>
                                {formatNumber(maxValue)} kg
                            </Title>
                            <Title order={6}>
                                (From {maximal.reps} reps of {maximal.weight}{' '}
                                kg)
                            </Title>
                        </Flex>

                        <Table striped>
                            <tbody>
                                {percentages.map((perc) => (
                                    <tr key={perc}>
                                        <td>{perc} %</td>
                                        <td>
                                            {formatNumber(
                                                (maxValue / 100) * perc
                                            )}{' '}
                                            kg
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </main>
        </>
    )
}
