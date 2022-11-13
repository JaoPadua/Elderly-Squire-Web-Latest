import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from './Button';  

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='navbar'>
                    <div className='navbar-container container'>
                        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                            Elderly Squire
                        </Link>
                        <div className='menu-icon' onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/application'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Services
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/blogApp'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/newsApp'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    News
                                </Link>

                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/benedisplay'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Benefits
                                </Link>

                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/registerID'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    ID Registration
                                </Link>

                            </li>
                            <li className='nav-btn'>
                                <Link to='/loginDisplay' className="btn-link" onClick={closeMobileMenu}>
                                    <Button buttonStyle='btn--outline'>
                                        Login
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;