import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DomainIcon from '@mui/icons-material/Domain';
//import { Button } from '@mui/material';
import "./adminsidebar.css";
import { BrowserRouter, Routes, Route, Navigate,Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';


function AdminSidebar(){
    const {logout} = useLogout()
    const { user } = useAuthContext()

    const handleClick  =() =>{
        logout();
        //Navigate('/loginDisplay')
    }
    return(
    <div className="sidebar">
        <div className="top">
        <Link to="/" style={{textDecoration:"none" }}>
        <span className="logo">Elderly <span className="logo" style={{color:"#0047AB"}}>Squire</span></span>

        </Link>
        </div>
        
        <div className="center">
            <ul>
            <p className="title">Dashboard</p>
            <Link to="/admin" style={{textDecoration:"none"}}>
                <li>
                <DashboardIcon className="icons" />
                <span>Home</span>
                </li>
                </Link>
                
                <li>
                <Link to="/IDverification" style={{textDecoration:"none"}}>
                
                <DomainVerificationIcon className="icons" />
                <span>ID Verification</span>
                </Link>
                </li>
                

                <Link to="/AdminIDRegistrations" style={{textDecoration:"none"}}>
                <li>
                <AppRegistrationIcon className="icons" />
                <span>ID Registration</span>
                </li>
                </Link>
                <p className="title">Database</p>
                <Link to="/AdminElder" style={{textDecoration:"none"}}>
                <li>
                <DomainIcon className="icons" />
                <span>Database</span>
                </li>
                </Link>
                
                <Link to="/ImportData" style={{textDecoration:"none"}}>
                <li>
                <ImportExportIcon className="icons" />
                <span>Import Data</span>
                </li>
                </Link>

                <Link to="/PublishNews" style={{textDecoration:"none"}}>
                <li>
                <NewspaperIcon className="icons" />
                <span>Publish News</span>
                </li>
                </Link>

                <p className="title">ACCOUNT</p>
                <Link to="/RegisterAdmin" style={{textDecoration:"none"}}>
                <li>
                <PersonIcon className="icons"/>
                <span>Register Admin</span>
                </li>
                </Link>
                       {user && (
                        <div>
                        <span>Hello, {user.email}</span>
                        </div>
                    )}
                   <li>
                    <button className='logout-button' onClick={handleClick}>Logout</button>
                    </li>
            </ul>
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