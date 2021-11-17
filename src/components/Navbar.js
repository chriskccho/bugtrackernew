import { Link } from "react-router-dom"
import {FaBug} from 'react-icons/fa';
import {useHistory} from 'react-router-dom'
import { useEffect } from "react";

const Navbar = ({loggedIn, setLoggedIn}) => {
    const token = localStorage.getItem('token')
    const history = useHistory();
    
    useEffect(() => {
        if (token) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      },[token,setLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        setLoggedIn(false)
        history.push("/login")
    }

    return (
        <nav className='navbar'>
            <h1>Bug Tracker <FaBug style={{marginLeft: '7px'}}/></h1>
            <div className="links">
                <Link to="/">Home</Link>
                {!loggedIn && <Link to="/login">Login</Link>}
                {!loggedIn && <Link to="/signup">Sign up</Link>}
                {loggedIn && <Link to="/createproject">New Project</Link>}
                {loggedIn && <Link to="/projects">Projects</Link>}
                {loggedIn && <a href="#" onClick={handleLogout}>Log out</a>}
            </div>
        </nav>
    )
}

export default Navbar
