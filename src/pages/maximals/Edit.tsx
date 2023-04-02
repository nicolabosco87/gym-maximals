import { notifications } from '@mantine/notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import {
    MaximalForm,
    MaximalFormValues,
} from '../../features/maximals/MaximalForm'
import { editMaximal } from '../../state/actions'
import { state } from '../../state/state'
import { GoBack } from '../../ui/GoBack'
import { SectionTitle } from '../../ui/SectionTitle'

export const Edit = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const { maximals, settings } = useSnapshot(state)

    const maximal = maximals.find((m) => m.slug === slug)

    const onSubmit = (values: MaximalFormValues) => {
        editMaximal({ ...values, slug: String(slug) })
        navigate(`/maximals/${slug}`)
        notifications.show({
            message: 'Maximal saved',
        })
    }

    if (!maximal) return <>Loading...</>

    return (
        <>
            <main>
                <SectionTitle left={<GoBack link={`/maximals/${slug}`} />}>
                    Edit Maximal
                </SectionTitle>
                <MaximalForm
                    initialValues={maximal}
                    onSubmit={onSubmit}
                    submitLabel="Edit"
                />
            </main>
        </>
    )
}
