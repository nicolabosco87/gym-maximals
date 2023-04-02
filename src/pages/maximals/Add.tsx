import { notifications } from '@mantine/notifications'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import slug from 'slug'
import {
    MaximalForm,
    MaximalFormValues,
} from '../../features/maximals/MaximalForm'
import { addMaximal } from '../../state/actions'
import { GoBack } from '../../ui/GoBack'
import { SectionTitle } from '../../ui/SectionTitle'

export const Add = () => {
    const navigate = useNavigate()

    const onSubmit = (values: MaximalFormValues) => {
        addMaximal(values)
        navigate('/')
        notifications.show({
            message: 'Maximal added',
        })
    }

    return (
        <>
            <SectionTitle left={<GoBack />}>Add Maximal</SectionTitle>
            <MaximalForm
                initialValues={{
                    label: '',
                    reps: 0,
                    weight: 0,
                }}
                onSubmit={onSubmit}
            />
        </>
    )
}
