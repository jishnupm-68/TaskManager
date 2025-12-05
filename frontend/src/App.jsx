

import Login from './Components/Login'
import Header from './Components/shared/Header'
import { Outlet } from 'react-router'

const App = () => {
  return (
    
    <div className='bg-red-200 text-white'>
      <Header />
      <Outlet />
    </div>
    
  )
}

export default App
