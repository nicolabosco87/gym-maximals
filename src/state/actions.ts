import { Maximal, Settings, state } from './state'

export const addMaximal = (maximal: Maximal) => {
    state.maximals.push(maximal)
}

export const editMaximal = (maximal: Maximal) => {
    state.maximals = state.maximals.map((m) => {
        if (m.slug === maximal.slug) return maximal

        return m
    })
}

export const deleteMaximal = (slug: string) => {
    state.maximals = state.maximals.filter((m) => m.slug !== slug)
}

export const saveSettings = (settings: Settings) => {
    state.settings = settings
}

export const toggleListStep = () => {
    state.settings.listStep = state.settings.listStep === '10' ? '5' : '10'
}
