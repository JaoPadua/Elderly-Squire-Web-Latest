import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './PageThree.css';


const items = [
    {
        key: '1',
        icon: <i className="fas fa-chart-pie"></i>,
        title: 'High Performance',
        content: 'Elderly Squire can help you organized your medication intake in our app so that it would notify you whenever you want to take your medicine.',
    },
    {
        key: '2',
        icon: <i className="fas fa-desktop"></i>,
        title: 'Simple Design',
        content: 'Elderly Squire is user friendly specifically for the senior citizens of manila. it is a simple userinterface where senior citizen can see our system better to understand. ',
    },
    {
        key: '3',
        icon: <i className="fas fa-database"></i>,
        title: 'Smooth Workflow',
        content: 'Elderly Squire is very compact and very effective for the users who uses such functionality like medication reminder and support chat.',
    },
]

function AboutUs() {
    return (
        <div id="about" className="block aboutBlock">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h2>About Us</h2>
                    <p>Elderly Squire</p>
                </div>
                <div className="contentHolder">
                    <p>The Elderly Squire aims to design a module that can be used by everyone especially the elder users for their medication to easily monitor their medicine intake, notify them about the schedule to take their medication, and provide additional information, health tips and chat support. Our goal is to create a mobile reminder and web application that could help individuals remind
                        themselves of medication intake with innovative technology.</p>
                </div>
                <Row gutter={[16, 16]}>
                    {items.map(item => {
                        return (
                            <Col md={{ span: 8 }} key={item.key}>
                                <div className="content">
                                    <div className="icon">
                                        {item.icon}
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.content}</p>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
}

export default AboutUs;