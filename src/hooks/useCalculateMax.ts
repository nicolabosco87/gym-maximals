import { useCallback } from 'react'
import { Maximal } from '../state/state'
import { formatNumber } from '../utils/utils'

export const useCalculateMax = () => {
    // 1. Brzycki formula: Weight × (36 / (37 – number of reps))
    // 2. Epley formula: Weight × (1 + (0.0333 × number of reps))
    // 3. Lombardi formula: Weight × (number of reps ^ 0.1)
    // 4. O’Conner formula: Weight × (1 + (0.025 × number of reps))
    return useCallback((maximal: Maximal) => {
        const value = maximal.weight * (36 / (37 - maximal.reps))

        return value
    }, [])
}
