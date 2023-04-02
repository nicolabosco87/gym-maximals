import { useCallback, useEffect, useState } from 'react'

export const useLocalStorage = (key: string, initialValue: any) => {
    const [state, setState] = useState(null) // problem is here

    const initialize = useCallback(
        (key: string) => {
            try {
                const item = localStorage.getItem(key)
                if (item && item !== 'undefined') {
                    return JSON.parse(item)
                }

                localStorage.setItem(key, JSON.stringify(initialValue))
                return initialValue
            } catch {
                return initialValue
            }
        },
        [initialValue]
    )

    // solution is here....
    useEffect(() => {
        setState(initialize(key))
    }, [initialize, key])

    const setValue = useCallback(
        (value: any) => {
            try {
                const valueToStore = value
                // value instanceof Function ? value(storedValue) : value
                setState(valueToStore)
                localStorage.setItem(key, JSON.stringify(valueToStore))
            } catch (error) {
                console.log(error)
            }
        },
        [key, setState]
    )

    const remove = useCallback(() => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.log(error)
        }
    }, [key])

    return [state, setValue, remove]
}
