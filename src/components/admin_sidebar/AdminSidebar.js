import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DomainIcon from '@mui/icons-material/Domain';    
//import { Button } from '@mui/material';
import "./adminsidebar.css";
import { BrowserRouter, Routes, Route, useNavigate,Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';




function AdminSidebar(){

    const navigate = useNavigate();
    const {logout} = useLogout()
    const { user } = useAuthContext()


    const handleClick  =() =>{
        logout();
    }



    //console.log('user',user)

    return(
    <div className="sidebar">
        <div className="top">
        <Link to="/admin" style={{textDecoration:"none" }}>
        <span className="logo">Elderly <span className="logo" style={{color:"#0047AB"}}>Squire</span></span>

        </Link>
        </div>
        <div className="center">
            <ul>
            <p className="titlesidebar">Dashboard</p>
            <Link to="/admin" style={{textDecoration:"none"}}>
                <li>
                <DashboardIcon className="icons" />
                <span>Home</span>
                </li>
                </Link>
                
                {user && (
                        <>
                            <p className="titlesidebar">Task Management</p>
                            <li>
                                <Link to="/IDverification" style={{ textDecoration: "none" }}>
                                    <DomainVerificationIcon className="icons" />
                                    <span>Unverified Elders</span>
                                </Link>
                            </li>

                          
                            <Link to="/AdminElder" style={{ textDecoration: "none" }}>
                                <li>
                                    <DomainIcon className="icons" />
                                    <span>Verified Elders</span>
                                </li>
                            </Link>

                            <Link to="/ImportData" style={{ textDecoration: "none" }}>
                                <li>
                                    <ImportExportIcon className="icons" />
                                    <span>Import Excel Data</span>
                                </li>
                            </Link>

                            <Link to="/PublishNews" style={{ textDecoration: "none" }}>
                                <li>
                                    <NewspaperIcon className="icons" />
                                    <span>Publish News</span>
                                </li>
                            </Link>

                            {user.role === 'TeamLeader' && (
                            <>
                            <p className="titlesidebar">Management Tools</p>
                            <Link to="/RegisterAdmin" style={{ textDecoration: "none" }}>
                            <li>
                            <PersonIcon className="icons" />
                            <span>Register Admin</span>
                            </li>
                            </Link>
                            <p className="titlesidebar">Documents</p>
                            <Link to="/Documents" style={{ textDecoration: "none" }}>
                            <li>
                            <NoteAddIcon className="icons" />
                            <span>Add Documents</span>
                            </li>
                            </Link>
                            <Link to="/ActionLogs" style={{ textDecoration: "none" }}>
                            <li>
                            <AssignmentIcon className="icons" />
                            <span>Activity logs</span>
                            </li>
                            </Link>
                            </>
                            )}
                        </>
                    )}
                    <div className="separator"></div> 
                        {user && (
                            <div className="user-info">
                                <span>Hello, {user.firstName} {user.lastName}</span>
                            </div>
                        )}
                 
            </ul>

                     <li>
                    <button className='logout-button' onClick={handleClick}>Logout</button>
                    </li>
            {/*<BrowserRouter>
                <Routes>
                    <Route path="/IDVerification" component={IDverificationDisplay}/>
                </Routes>
            </BrowserRouter>*/}
        </div>
        
    </div>
    );
}

export default AdminSidebar