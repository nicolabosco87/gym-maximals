import { Button, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
    return (
        <>
            <Title order={3}>An error has occurred.</Title>

            <Link to="/">
                <Button>Return to list</Button>
            </Link>
        </>
    )
}
