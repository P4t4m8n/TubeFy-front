import { StationIndex } from "./pages/StationIndex"
import { SearchPage } from './pages/SearchPage.jsx'
import { StationEdit } from './pages/StationEdit.jsx'
import { StationDetails } from './pages/StationDetails.jsx'

const routesPC = [
    {
        path: '/',
        component: <StationIndex />,
        label: 'Home',
    },
    {
        path: '/:stationId',
        component: <StationDetails />,
        label: 'StationDetails'
    },
    {
        path: '/search',
        component: <SearchPage />,
        label: 'SearchPage'
    },
    {
        path: '/search/:searchTerm',
        component: <SearchPage />,
        label: 'SearchTerm'
    },
    {
        path: '/station/edit',
        component: <StationEdit />,
        label: 'New station'
    },
    {
        path: '/station/edit/:stationId',
        component: <StationEdit />,
        label: 'Station Edit'
    },
]

export default routesPC