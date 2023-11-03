import React from "react";
//import SCapplication from "./PageFive";
import Navbar from "../../components/landingPageNavbar/Navbar";
import IdRegistration from "./IdRegistration";
import Footer from "../Footer/Footer";



function PageFiveDisplay() {
  return (
    <>
      <Navbar />
      {/*<SCapplication />*/}
      {<IdRegistration /> }
      <Footer />
    </>
  );
}

export default PageFiveDisplay;
