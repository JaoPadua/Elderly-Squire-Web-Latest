import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Application from "./pages/Application/Application";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BlogApp from "./pages/Blog/BlogApp";
import NewsApp from "./pages/News/NewsApp";
import SCapplication from "./pages/registrationForm/PageFive";
import Benedisplay from "./pages/Benefits/Benedisplay";
import LoginDisplay from "./pages/Login/LoginDislay";
import DashboardDisplay from "./pages/adminDashboard/DashboardDisplay";
import AdminSidebar from "./components/admin_sidebar/AdminSidebar";
import AdminNavbar from "./components/admin-navbar/AdminNavbar";
import PageFiveDisplay from "./pages/registrationForm/PageFiveDisplay";
import IDverificationDisplay from "./pages/adminIDverification/IDverificationDisplay";
import NewsDisplay from "./pages/adminNews/NewsDisplay";
import AddAdminDisplay from "./pages/admin/AddAdminDisplay";
import AdminIDRegisterDisplay from "./pages/adminIDRegistration/AdminIDRegDisplay"
import AdminElderDisplay from "./pages/adminElder/AdminElderDisplay"
import { useAuthContext } from "./hooks/useAuthContext";
import ImportDataDisplay from "./pages/importDataPage/ImportDataDisplay";
// import DashboardCharts from "./components/charts/Charts";
// import IdRegistration from "./pages/registrationForm/IdRegistration";


function App() {

    const {user} =useAuthContext()

  return (
    <BrowserRouter>
    <Routes>
      {/* ROUTES FOR USER */}
      <Route path="/" element={<Home />} />
      <Route path="/application" element={<Application />} />
      <Route path="/blogApp" element={<BlogApp />} />
      <Route path="/newsApp" element={<NewsApp />} />
      <Route path="/benedisplay" element={<Benedisplay />} />
      <Route path="/idRegistration" element={<PageFiveDisplay />} />
      
      {/* ROUTES FOR ADMIN */}
      <Route path="/logindisplay" element={!user ? <LoginDisplay /> : <Navigate to="/admin" />} />
      <Route path="/admin" element={user ? <DashboardDisplay /> : <Navigate to="/loginDisplay" />} />
      <Route path="/IDverification" element={user ? <IDverificationDisplay /> : <Navigate to="/loginDisplay" />} />
      <Route path="/AdminIDRegistrations" element={user ? <AdminIDRegisterDisplay /> : <Navigate to="/loginDisplay" />} />
      <Route path="/ImportData" element={user ? <ImportDataDisplay /> : <Navigate to="/loginDisplay" />} />
      <Route path="/AdminElder" element={user ? <AdminElderDisplay /> : <Navigate to="/loginDisplay" />} />
      <Route path="/PublishNews" element={user ? <NewsDisplay /> : <Navigate to="/loginDisplay" />} />
      <Route path="/RegisterAdmin" element={user ? <AddAdminDisplay /> : <Navigate to="/loginDisplay" />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
