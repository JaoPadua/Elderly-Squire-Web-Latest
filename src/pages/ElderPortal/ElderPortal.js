import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FaHome, FaFile, FaIdCard, FaUser, FaPhone, FaBuilding,FaFacebook } from 'react-icons/fa';
import { useAuthContext } from '../../hooks/useAuthContext';
import ElderPortalNavbar from './ElderPortalNavbar'
import "./elderPortal.css";
import ChatbotComponents from '../chatbot/ChatbotComponents';
import { ToastContainer } from 'react-toastify';
import Chatbotify from '../chatbot/Chatbotify'
import cityhall from "../img/cityhall.png"

function ElderPortal() {

    const { elderUser } = useAuthContext();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 960);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 960);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
        <div className='background-image' style={{ backgroundImage: `url(${cityhall})`, backgroundSize: 'cover', height: '100vh',objectFit:'cover' }}>
        <ElderPortalNavbar/>
        <Chatbotify/>
      

        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} />
        
            <div class='Portal-title'>
                Welcome, {elderUser.firstName}
            </div>
            <div class='portal-text'>
                What would you like to do?
            </div>
           
                    <div className="features">
                    <Stack spacing={10} direction={isMobile ? "column" : "row"}>
                            <Button component={Link} to="/ElderPortal" className="button-60">
                                <div style={{ textAlign: "center" }}>
                                    <FaHome size={50} />
                                    <div>Home</div>
                                </div>
                            </Button>
                            <Button component={Link} to="/ElderPortalDocuments" className="button-60">
                                <div style={{ textAlign: "center" }}>
                                    <FaFile size={50} />
                                    <div>Documents</div>
                                </div>
                            </Button>
                            <Button component={Link} to="/idRegistration" className="button-60">
                                <div style={{ textAlign: "center" }}>
                                    <FaIdCard size={50} />
                                    <div>Señior Citizen ID Registration</div>
                                </div>
                            </Button>
                            {/*<Button component={Link} to="/ElderPortalProfile" className="button-60">
                                <div style={{ textAlign: "center" }}>
                                    <FaUser size={50} />
                                    <div>Profile</div>
                                </div>
                                </Button>*/}
                            {/*<Button component={Link} to="/ElderPortalContact" className="button-60">
                                <div style={{ textAlign: "center" }}>
                                    <FaPhone size={50} />
                                    <div>Contact Us</div>
                                </div>
                            </Button>*/}
                            <Button className="button-60">
                            <a href="https://www.facebook.com/ManilaOSCA/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ textAlign: "center" }}>
                                    <FaFacebook size={50} />
                                    <div>Osca Manila Fb Page</div>
                                </div>
                            </a>
                        </Button>
                        <Button className="button-60">
                                <a href="https://manila.gov.ph" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ textAlign: "center" }}>
                                        <FaBuilding size={50} />
                                        <div>City Hall Website</div>
                                    </div>
                                </a>
                            </Button>
                        </Stack>
                    </div> 
                   
            </div>
            </div>
    )
}

export default ElderPortal