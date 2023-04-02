import { Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useCallback } from 'react'
import { deleteMaximal } from '../state/actions'
import { Maximal } from '../state/state'

export const useConfirmMaximalDeletion = () => {
    return useCallback(
        (maximal: Maximal) =>
            openConfirmModal({
                title: 'Confirm deletion?',
                children: (
                    <Text size="sm">
                        Confirm deletion of &quot;{maximal.label}&quot;?
                    </Text>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                // onCancel: () => console.log('Cancel'),
                onConfirm: () => deleteMaximal(maximal.slug),
            }),
        []
    )
}
