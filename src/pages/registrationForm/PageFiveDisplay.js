import React from "react";
//import SCapplication from "./PageFive";
import Navbar from "../../components/landingPageNavbar/Navbar";
import IdRegistration from "./IdRegistration";
import Footer from "../Footer/Footer";
import ElderPortalNavbar from "../ElderPortal/ElderPortalNavbar";


function PageFiveDisplay() {
  return (
    <>
      <ElderPortalNavbar />
      {/*<SCapplication />*/}
      {<IdRegistration /> }
      {/*<Footer />*/}
    </>
  );
}

export default PageFiveDisplay;
