import { proxy, subscribe, useSnapshot } from 'valtio'
import { useEffect } from 'react'
import { useLocalStorage } from '@mantine/hooks'
// import { useLocalStorage } from '../utils/useLocalStorage'

const STORAGE_KEY = 'gym-maximals'

export type Maximal = {
    slug: string
    label: string
    weight: number
    reps: number
}

export enum FormulaType {
    'Brzycki' = 'Brzycki',
    'Epley' = 'Epley',
    'Lombardi' = 'Lombardi',
    'OConner' = 'OConner',
}

export type Settings = {
    formulaType: FormulaType
    weightUnit: 'kg' | 'lb'
    listStep: '10' | '5'
    hideStepsBelow: number
}

type State = {
    version: string
    loaded: boolean
    maximals: Maximal[]
    settings: Settings
}

const initialState: State = {
    version: '0.1.1',
    loaded: false,
    maximals: [],
    settings: {
        formulaType: FormulaType.Brzycki,
        listStep: '10',
        weightUnit: 'kg',
        hideStepsBelow: 0,
    },
}

export const state = proxy<State>(initialState)

/**
 * Initialize state first by looking on local storage than from default values
 */
export const useInitState = () => {
    useEffect(() => {
        const item = localStorage.getItem(STORAGE_KEY)
        if (item && item !== 'undefined') {
            const data: State = JSON.parse(item)

            state.loaded = true
            state.version = initialState.version
            state.maximals = data.maximals ?? initialState.maximals
            state.settings = data.settings ?? initialState.settings
        }

        const unsubscribe = subscribe(state, () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        })

        return () => {
            unsubscribe()
        }
    }, [])
}

declare module 'valtio' {
    function useSnapshot<T extends object>(p: T): T
}
