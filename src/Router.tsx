import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Add } from './pages/maximals/Add'
import { Edit } from './pages/maximals/Edit'
import { List } from './pages/maximals/List'
import { Show } from './pages/maximals/Show'
import Formula from './pages/settings/Formula'
import Settings from './pages/settings/Settings'
import { Layout } from './ui/Layout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/maximals" replace={true} />,
            },
            {
                path: 'maximals',
                children: [
                    {
                        index: true,
                        element: <List />,
                    },
                    {
                        path: 'add',
                        element: <Add />,
                    },
                    {
                        path: ':slug',
                        children: [
                            {
                                index: true,
                                element: <Show />,
                            },
                            {
                                path: 'edit',
                                element: <Edit />,
                            },
                        ],
                    },
                ],
            },
            {
                path: 'settings',
                children: [
                    { index: true, element: <Settings /> },
                    {
                        path: 'formula',
                        element: <Formula />,
                    },
                ],
            },
        ],
    },
])

export const Router = () => {
    return <RouterProvider router={router}></RouterProvider>
}
