import { SelectItem } from '@mantine/core'
import { useMemo } from 'react'
import { FormulaType } from '../state/state'

export const useGetFormulaOptions = (): SelectItem[] => {
    return useMemo(
        () =>
            [
                {
                    value: FormulaType.Brzycki,
                    label: 'Brzycki',
                },
                {
                    value: FormulaType.Epley,
                    label: 'Epley',
                },
                {
                    value: FormulaType.Lombardi,
                    label: 'Lombardi',
                },
                {
                    value: FormulaType.OConner,
                    label: "O'Conner",
                },
            ] as SelectItem[],
        []
    )
}
