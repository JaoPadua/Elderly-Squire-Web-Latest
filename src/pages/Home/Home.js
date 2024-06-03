import React from 'react';
import PageOne from '../../components/landingPageAds/PageOne';
import PageTwo from '../../components/featureDisplay/PageTwo';
import AboutUs from '../../components/aboutUs/PageThree';
import AppContact from '../../components/contactUs/ContactUs';
import AppFaq from '../../components/faqs/PageFour';
import Navbar from '../../components/landingPageNavbar/Navbar';
import Footer from '../Footer/Footer';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';

function Home() {
    return (
        
        <>
        <Navbar />
            <PageOne {...homeObjOne} />
            <PageOne {...homeObjTwo} />
            <PageOne {...homeObjThree} />   
            <PageTwo />
            <AboutUs />
            {/*<AppFaq />*/}
            <PageOne {...homeObjFour} />
            <Footer />
        </>
    )
}

export default Home