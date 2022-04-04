import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css';

function Navbar( { username } ) {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [button, setButton] = useState(true);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }
    useEffect(()=> {
        showButton();
    }, []);
    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>LearnShogi</Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className ={click ? 'fas fa-times' : "fas fa-bars"}></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to="/play" className="nav-links" onClick={closeMobileMenu}>Play</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/learn" className="nav-links" onClick={closeMobileMenu}>Learn</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>Sign Up</Link>
                        </li>
                    </ul>
                    {(username === undefined) ? <Button buttonStyle="btn--outline">Sign Up</Button> : <button id="username-button" onClick={()=> navigate("/user/"+username)}>{username}</button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar
