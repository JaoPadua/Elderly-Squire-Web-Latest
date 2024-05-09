import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Application from "./pages/Application/Application";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BlogApp from "./pages/Blog/BlogApp";
import NewsApp from "./pages/News/NewsApp";
import Benedisplay from "./pages/Benefits/Benedisplay";
import LoginDisplay from "./pages/Login/LoginDislay";
import DashboardDisplay from "./pages/adminDashboard/DashboardDisplay";
import PageFiveDisplay from "./pages/registrationForm/PageFiveDisplay";
import IDverificationDisplay from "./pages/adminIDverification/IDverificationDisplay";
import NewsDisplay from "./pages/adminNews/NewsDisplay";
import AddAdminDisplay from "./pages/admin/AddAdminDisplay";
import AdminElderDisplay from "./pages/adminElder/AdminElderDisplay"
import { useAuthContext } from "./hooks/useAuthContext";
//import { useEldersAuthContext } from "./hooks/useEldersAuthContext"
import ImportDataDisplay from "./pages/importDataPage/ImportDataDisplay";
import ElderLoginDisplay from "./pages/ElderPortalLogin/ElderLoginDisplay";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ElderPortalSignUpDisplay from "./pages/ElderPortalSignUp/ElderPortalSignUpDisplay";
import ElderPortalDisplay from "./pages/ElderPortal/ElderPortalDisplay";
import ElderPortalContact from "./pages/ElderPortal/ElderPortalContact";
import ElderPortalProfile from "./pages/ElderPortal/ElderPortalProfile";
import ElderPortalDocuments from "./pages/ElderPortal/ElderPortalDocuments";
import ActionDisplay from "./pages/ActionLogs/ActionDisplay";
import ErrorPageDisplay from "./pages/utils/ErrorPageDisplay"
import AdminDocumentsDisplay from "./pages/adminDocuments/AdminDocumentsDisplay"
// import DashboardCharts from "./components/charts/Charts";
// import IdRegistration from "./pages/registrationForm/IdRegistration";
import ResetPasswordDisplay from "./pages/resetPassword/ResetPassword";
import ForgotAdminpassDisplay from "./pages/admin/ForgotAdminpass";
import ResetAdminpassDisplay from "./pages/admin/ResetAdminpass";
import { ToastContainer } from 'react-toastify';

function App() {

    const {user,elderUser} =useAuthContext()
    //const {elderUser} = useEldersAuthContext()


    
  return (
    <BrowserRouter>
    <Routes>
        {/* Routes for Landing Page */}
        <Route path="/" element={<Home />} />
        <Route path="/application" element={<Application />} />
        <Route path="/blogApp" element={<BlogApp />} />
        <Route path="/newsApp" element={<NewsApp />} />
        <Route path="/benedisplay" element={<Benedisplay />} />
        <Route path="/ElderPortalSignUp" element={<ElderPortalSignUpDisplay />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/idRegistration" element={<PageFiveDisplay />} />
        <Route path="/reset-password/:id/:token" element={<ResetPasswordDisplay/>} />


        {/* Route for Elder Portal Login */}
        <Route path="/ElderPortalLogin"  element={!elderUser ? <ElderLoginDisplay  /> : <Navigate to="/ElderPortal" />} />

        {/* Routes for Elder Portal */}
        {elderUser && (
          <>
           <Route path="/ElderPortal" element={<ElderPortalDisplay />} />
          
            <Route path="/ElderPortalContact" element={<ElderPortalContact />} />
            <Route path="/ElderPortalProfile" element={<ElderPortalProfile />} />
            <Route path="/ElderPortalDocuments" element={<ElderPortalDocuments />} />
          </>
        
        )}


         {/* Route for Admin Login */}
         <Route path="/LoginAdmin" element={!user ? <LoginDisplay /> : <Navigate to="/admin" />} />

        {/* Routes for Admin/OSCA Employee */}
        <Route path="/ForgotAdminPassword" element={<ForgotAdminpassDisplay/>}/>
        <Route path = "/reset-AdminPassword/:id/:token" element={<ResetAdminpassDisplay/>}/>

        {user && (
          <>
            <Route path="/admin" element={<DashboardDisplay />} />
            <Route path="/IDverification" element={<IDverificationDisplay />} />
            <Route path="/ImportData" element={<ImportDataDisplay />} />
            <Route path="/AdminElder" element={<AdminElderDisplay />} />
            <Route path="/PublishNews" element={<NewsDisplay />} />

            {user.role === 'admin' && (
              <>
                <Route path="/RegisterAdmin" element={<AddAdminDisplay />} />
                <Route path="/Documents" element={<AdminDocumentsDisplay />} />
                <Route path="/ActionLogs" element={<ActionDisplay />} />
              </>
            )}
          </>
        )}

        {/* Redirect to Error Display if no route matches */}
        <Route path="*" element={<ErrorPageDisplay/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
