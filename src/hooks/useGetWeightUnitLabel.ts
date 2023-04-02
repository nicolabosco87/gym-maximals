import { useSnapshot } from 'valtio'
import { state } from '../state/state'

export const useGetWeightUnitLabel = () => {
    const {
        settings: { weightUnit },
    } = useSnapshot(state)

    return weightUnit === 'kg' ? 'Kg' : 'Lb'
}
