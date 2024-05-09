import React from 'react'
import Navbar from "../../components/landingPageNavbar/Navbar";
import Footer from "../Footer/Footer";
import ElderPortalLogin from './ElderPortalLogin';



function ElderLoginDisplay() {
  return (
    <div>
    <Navbar/>
    <ElderPortalLogin/>
    <Footer/>
    </div>
  )
}

export default ElderLoginDisplay