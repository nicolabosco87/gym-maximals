import { ActionIcon } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

type GoBackProps = {
    link?: string
}

export const GoBack = ({ link }: GoBackProps) => {
    const navigate = useNavigate()

    return (
        <ActionIcon onClick={() => navigate(link ?? '/')}>
            <IconArrowLeft />
        </ActionIcon>
    )
}
