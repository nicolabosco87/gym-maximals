import { ReactNode } from 'react'
import { FormulaType } from '../state/state'

export const useFormulas = (): Record<
    FormulaType,
    { id: FormulaType; label: string; info: ReactNode }
> => {
    return {
        [FormulaType.Brzycki]: {
            id: FormulaType.Brzycki,
            label: 'Brzycki',
            info: <>Weight × (36 / (37 – number of reps))</>,
        },
        [FormulaType.Epley]: {
            id: FormulaType.Epley,
            label: 'Epley',
            info: <>Weight × (1 + (0.0333 × number of reps))</>,
        },
        [FormulaType.Lombardi]: {
            id: FormulaType.Lombardi,
            label: 'Lombardi',
            info: <>Weight × (number of reps ^ 0.1)</>,
        },
        [FormulaType.OConner]: {
            id: FormulaType.OConner,
            label: "O'Conner",
            info: <> Weight × (1 + (0.025 × number of reps))</>,
        },
    }
}
