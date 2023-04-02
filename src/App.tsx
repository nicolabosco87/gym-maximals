import { Router } from './Router'
import { useInitState } from './state/state'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'

function App() {
    useInitState()

    const theme: MantineThemeOverride = {
        primaryColor: 'orange',
    }

    return (
        <MantineProvider theme={theme} withNormalizeCSS>
            <Notifications />
            <ModalsProvider>
                <Router />
            </ModalsProvider>
        </MantineProvider>
    )
}

export default App
