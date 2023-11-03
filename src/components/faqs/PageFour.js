import React from 'react';
import '../featureDisplay/PageTwo.css';
import { Collapse, Button } from 'antd';


const { Panel } = Collapse;

function AppFaq() {
    return (
        <div id="faq" className="block faqBlock">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h2>Frequently Asked Questions</h2>
                    <p>Common Questions regarding to the office of senior citizens affairs</p>
                </div>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Do I need to go to Office of Senior Citizen Affairs to ask on when the benefits will be released?" key="1">
                        <p>No, if you have contact information of the OSCA you can just call and ask them through the phone on when it will be released.</p>
                    </Panel>
                    <Panel header="How will i know if my name is on the list of release of the benefits from the city hall?" key="2">
                        <p>due to the privacy, we cannot divuldge any personal information on the list but we can do is direct you to a contact information of the DCS office to confirm your name is on the list.</p>
                    </Panel>
                    <Panel header="Does the information you provide have legitimacy?" key="3">
                        <p>Our information is 100% legitimate due to the data's we've gathered are directly from government agencies and also from Office of Senior Citizen Affairs in Manila.</p>
                    </Panel>
                    <Panel header="What or where do you get this information about government giving assistance to the Elderly People?" key="4">
                        <p>our system fetch information directly from OSCA or the Office of Senior Citizen Affairs.</p>
                    </Panel>
                    <Panel header="Do you cover/provided informations on government assistance througout the country?" key="5">
                        <p>Our goal is to create a mobile reminder and web application that could help individuals remind themselves of medication intake with innovative technology.</p>
                    </Panel>
                    <Panel header="How does your mobile app works?" key="6">
                        <p>The Elderly Squire aims to design a module that can be used by everyone especially the elder users for their medication to easily monitor their medicine intake, notify them about the schedule to take their medication, and provide additional information, health tips and chat support.</p>
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
}

export default AppFaq;