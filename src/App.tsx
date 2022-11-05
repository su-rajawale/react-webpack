import { Route, Routes } from 'react-router-dom'
import Offers from './components/Offers/Offers'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import NotFound from './components/NotFound/NotFound'
import Users from './components/Users/Users'
import Nested from './components/Nested/Nested'
import Invite from './components/Invite/Invite'
import User from './components/Users/User'
import { Search } from '@mui/icons-material'
import UBoard from './components/UBoard/UBoard'

export const App = () => {
  return (
    <main id='app'>
      <Navbar />
      <article id='content' style={{ padding: '24px' }}>
        <Routes>
          <Route index element={<Users />} />
          <Route path='*' element={<NotFound />} />
          <Route path='offers' element={<Offers />} />
          <Route path='nested' element={<Nested />} />
          <Route path='invite' element={<Invite />} />
          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<User />} />
          <Route path='uboard' element={<UBoard/>} />
          {/* <Route path='search' element={<Search />} /> */}
        </Routes>
      </article>
    </main>
  )
}
