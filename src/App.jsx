
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from './cmps/Header/AppHeader.jsx'
import { Player } from './cmps/Footer/Player.jsx'
import { StationIndex } from './pages/StationIndex.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { LeftSidebar } from './cmps/LeftSidebar/LeftSidebar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { StationEdit } from './pages/StationEdit.jsx'
import '../src/styles/main.scss'
import { UserMsg } from './cmps/support/UserMsg.jsx'
import { MobilePlayerPage } from './cmps/Footer/MobilePlayerPage.jsx'
import { SideBarContent } from './cmps/LeftSidebar/LeftSidebarContent.jsx'

export function App() {


  return (

    <div className={"main-container "}>
      <Router>
        <LeftSidebar />
        <div className="main-content">
          <AppHeader />
          <Routes>
            <Route path="/" element={<StationIndex />} />
            <Route path="/:stationId" element={<StationDetails />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:searchTerm" element={<SearchPage />} />
            <Route path="/station/edit" element={<StationEdit />}></Route>
            <Route path="/station/edit/:stationId" element={<StationEdit />}></Route>
            <Route path="/mobile/libary" element={<SideBarContent />}></Route>
            <Route path="/mobile/player" element={<MobilePlayerPage />}></Route>
          </Routes>
        </div>
        <Player />
        <UserMsg></UserMsg>
      </Router>

    </div>
  )
}
