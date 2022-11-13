import React from 'react';
import PageOne from '../../PageOne';
import PageTwo from '../../PageTwo';
import AboutUs from '../../PageThree';
import AppContact from '../../ContactUs';
import AppFaq from '../../PageFour';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';

function Home() {
    return (
        <>
            <PageOne {...homeObjOne} />
            <PageOne {...homeObjTwo} />
            <PageOne {...homeObjThree} />   
            <PageTwo />
            <AboutUs />
            <AppFaq />
            <AppContact />
            <PageOne {...homeObjFour} />
        </>
    )
}

export default Home