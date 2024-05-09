
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone,FaSignOutAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useElderLogout } from '../../hooks/useElderLogout';
import logoImage from "../img/nav_bar_image_city_hall.jpg"
import logoImage2 from "../img/nav_bar_image_new.jpg"
import logoImage3 from "../img/nav_bar_image_city_hall_resized.jpg"




function ElderPortalNavbar() {

    const {elderLogout} = useElderLogout()
    const navigate = useNavigate();
    const { elderUser } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const toggleDropdownMenu = (event) =>{
    event.preventDefault()
    setDropdownOpen(!dropdownOpen);

    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleLogout  =() =>{
        elderLogout();
        navigate('/ElderPortalLogin');
    }



    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='navbar-portal' /*style={{ backgroundImage: `url(${logoImage})`, backgroundSize:'auto', backgroundPosition:'center', height:'90px'}}*/>
                    <div className='navbar-container'>
                        <Link to='/ElderPortal' className='navbar-logo' onClick={closeMobileMenu}>
                            <span className="logo">ELDERLY <span className="logo" style={{ color: "#337CCF" }}>SQUIRE</span></span>
                        </Link>
                        <div className='menu-icon' onClick={handleClick}>
                        {click ? <FaTimes color="black" /> : <FaBars color="black" />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                                <Link to='/ElderPortal' className='nav-links' onClick={closeMobileMenu}>
                                <span className="logo">Home</span>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/ElderPortalDocuments' className='nav-links' onClick={closeMobileMenu}>
                                <span className="logo">Documents</span>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/idRegistration' className='nav-links' onClick={closeMobileMenu}>
                                <span className="logo">ID Registration</span>
                                </Link>
                            </li>
                            <li className='nav-item'>
                            <div className='nav-links' onClick={handleLogout}>
                                    <span className="logo">
                                        <FaSignOutAlt className="person-icon" color='black' /> Logout {/*elderUser.lastName*/}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default ElderPortalNavbar