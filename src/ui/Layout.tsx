import {
    AppShell,
    Box,
    Burger,
    Footer,
    Group,
    Header,
    MediaQuery,
    Navbar,
    Text,
    ThemeIcon,
    Title,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core'
import { IconListDetails, IconSettings } from '@tabler/icons-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { version } from '../../package.json'
import { WithChildrenProps } from '../types'

export const Layout = () => {
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(false)

    const data = [
        {
            icon: <IconListDetails size={16} />,
            color: 'blue',
            label: 'List',
            link: '/',
        },
        {
            icon: <IconSettings size={16} />,
            color: 'teal',
            label: 'Settings',
            link: '/settings',
        },
    ]

    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar
                    p="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 200, lg: 300, base: 100 }}
                >
                    {data.map((d) => (
                        <UnstyledButton
                            key={d.label}
                            sx={(theme) => ({
                                display: 'block',
                                width: '100%',
                                padding: theme.spacing.xs,
                                borderRadius: theme.radius.sm,
                                color:
                                    theme.colorScheme === 'dark'
                                        ? theme.colors.dark[0]
                                        : theme.black,

                                '&:hover': {
                                    backgroundColor:
                                        theme.colorScheme === 'dark'
                                            ? theme.colors.dark[6]
                                            : theme.colors.gray[0],
                                },
                            })}
                        >
                            <Link
                                to={d.link}
                                style={{ textDecoration: 'none' }}
                                onClick={() => setOpened(false)}
                            >
                                <Group>
                                    <ThemeIcon color={d.color} variant="light">
                                        {d.icon}
                                    </ThemeIcon>

                                    <Text size="sm">{d.label}</Text>
                                </Group>
                            </Link>
                        </UnstyledButton>
                    ))}
                </Navbar>
            }
            footer={
                <Footer height={60} p="md">
                    <Group position="apart" align="center">
                        <Box>Gym Maximals - {new Date().getFullYear()}</Box>
                        <Text size="sm" color="dimmed">
                            {version}
                        </Text>
                    </Group>
                </Footer>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <MediaQuery
                            largerThan="sm"
                            styles={{ display: 'none' }}
                        >
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Title variant="gradient" order={3}>
                            Gym Maximals
                        </Title>
                    </div>
                </Header>
            }
        >
            <Outlet />
        </AppShell>
    )
}
