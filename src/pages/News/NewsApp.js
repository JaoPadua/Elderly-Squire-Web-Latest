import React from "react";
import News from "./News";
import Navbar from "../../components/landingPageNavbar/Navbar";
import Footer from "../Footer/Footer";

function NewsApp() {
  return (
    <>
      <Navbar />
      <News />
      <Footer />
    </>
  );
}

export default NewsApp;
