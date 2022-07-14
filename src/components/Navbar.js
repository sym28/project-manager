// styles
import './Navbar.css'
import temple from '../assets/temple.svg'

import {Link} from 'react-router-dom'
import {useSignout} from '../hooks/useSignout'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'


export default function Navbar() {
  const {logout, error, isPending} = useSignout()
  const navigate = useNavigate()
  const {user} = useAuthContext()

  const handleLogout = async ()  => {
    await logout()
    navigate('/login')
  }
  return (
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={temple} alt='dojo logo' />
                <span>Project Manager</span>
            </li>
            {!user && 
              <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
              </>}
            
            
            {user && <li>
                {isPending ? 
                  <button className='btn' disabled>Logging Out</button>
                :
                  <button className='btn' onClick={handleLogout}>Logout</button>}
            </li>}
        </ul>
    </div>
  )
}
