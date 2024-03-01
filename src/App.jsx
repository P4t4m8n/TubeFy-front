
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Player } from './cmps/Player/Player.jsx'
import { StationIndex } from './pages/StationIndex.jsx'
import { StationDetails } from './pages/StationDetails.jsx'
import { LeftSidebar } from './cmps/LeftSidebar/LeftSidebar.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { StationEdit } from './pages/StationEdit.jsx'
import { UserMsg } from './cmps/User/UserMsg.jsx'
import { UserLibaryIndex } from './cmps/LeftSidebar/UserLibaryIndex.jsx'
import '../src/styles/main.scss'

export function App() {


  return (
    <>
      <div className="main-container">
        <Router>
          <LeftSidebar />
          <div className="main-content">
            <AppHeader />
            <Routes>
              <Route path="/" element={<StationIndex />} />
              <Route path="/:stationId" element={<StationDetails />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/:searchTerm" element={<SearchPage />} />
              <Route path="/station/edit" element={<StationEdit />} />
              <Route path="/station/edit/:stationId" element={<StationEdit />} />
              <Route path='/mobile/libary' element={<UserLibaryIndex />} />
            </Routes>
          </div>
          <Player />
        </Router>

      </div>
        <UserMsg />
    </>
  )
}
