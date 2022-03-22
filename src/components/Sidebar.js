import './Sidebar.css'
import dashboardIcon from '../assets/dashboard_icon.svg'
import addIcon from '../assets/add_icon.svg'

import {NavLink, Link} from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-content">
            <div className="user">
                {/* avatar and username */}
                <p>Hey user</p>
            </div>
            <nav className="links">
                <ul>
                    <li>
                        <NavLink to='/'>
                            <img src={dashboardIcon} alt="dashboard icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>
                            <img src={addIcon} alt="add project icon" />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
