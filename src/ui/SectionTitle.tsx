import { Flex, Space, Title } from '@mantine/core'
import React, { ReactNode } from 'react'

type SectionTitleProps = {
    children: ReactNode
    left?: ReactNode
    right?: ReactNode
}

export const SectionTitle = ({ children, left, right }: SectionTitleProps) => {
    return (
        <Flex gap={10} mb={30}>
            {left}
            <Title order={4} style={{ flex: 1 }}>
                {children}
            </Title>
            {right}
        </Flex>
    )
}
