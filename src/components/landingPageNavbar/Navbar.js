/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

function Navbar() {
    const [click, setClick] = useState(false);
    

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='navbar'>
                    <div className='navbar-container container'>
                        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <span className="logo">ELDERLY <span className="logo" style={{color:"#337CCF"}}>SQUIRE</span></span>
                        </Link>
                        <div className='menu-icon' onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                <span className="logo">Home</span>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/application'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                     <span className="logo">Services</span>
                                </Link>
                            </li>
                            {/* <li className='nav-item'>
                                <Link
                                    to='/blogApp'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                     <span className="logo">Blogs</span>
                                </Link>
                            </li> */}
                            <li className='nav-item'>
                                <Link
                                    to='/newsApp'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    <span className="logo">News</span>
                                </Link>

                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/idRegistration'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                     <span className="logo">Registration</span>
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