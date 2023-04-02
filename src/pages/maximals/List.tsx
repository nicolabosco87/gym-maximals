import {
    ActionIcon,
    Button,
    Card,
    createStyles,
    Flex,
    Grid,
    Text,
} from '@mantine/core'
import React from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useCalculateMax } from '../../hooks/useCalculateMax'
import { useConfirmMaximalDeletion } from '../../hooks/useConfirmMaximalDeletion'
import { useGetWeightUnitLabel } from '../../hooks/useGetWeightUnitLabel'
import { state } from '../../state/state'
import { SectionTitle } from '../../ui/SectionTitle'
import { TbPlus } from 'react-icons/tb'
import { formatNumber } from '../../utils/utils'
import { IconTrash } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    item: {
        '& + &': {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },
    },

    switch: {
        '& *': {
            cursor: 'pointer',
        },
    },

    title: {
        lineHeight: 1,
    },
}))

export const List = () => {
    const { maximals } = useSnapshot(state)
    const { classes } = useStyles()
    const calculateMax = useCalculateMax()
    // const router = router()
    // const navigation = useNavigation()
    const navigate = useNavigate()
    const weightUnitLabel = useGetWeightUnitLabel()
    const confirmDelete = useConfirmMaximalDeletion()

    return (
        <>
            <Flex justify="space-between">
                <SectionTitle>Maximals</SectionTitle>
                <Link to="/maximals/add">
                    <Button>
                        <TbPlus />
                    </Button>
                </Link>
            </Flex>

            <Grid>
                {maximals.map((m) => (
                    <Grid.Col span={12} sm={6} lg={4} xl={3} key={m.label}>
                        <Card
                            withBorder
                            radius="md"
                            p="xl"
                            className={classes.card}
                            onClick={() => navigate(`/maximals/${m.slug}`)}
                            sx={(theme) => ({
                                cursor: 'pointer',
                                '&:hover': {
                                    background: theme.colors.orange[0],
                                },
                            })}
                        >
                            <Grid className={classes.item}>
                                <Grid.Col span={6}>
                                    <Text size="lg" variant="text">
                                        {m.label}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Text size="sm" color="dimmed">
                                        {formatNumber(calculateMax(m))}{' '}
                                        {weightUnitLabel}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <ActionIcon
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            confirmDelete(m)
                                        }}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Grid.Col>
                            </Grid>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    )
}
