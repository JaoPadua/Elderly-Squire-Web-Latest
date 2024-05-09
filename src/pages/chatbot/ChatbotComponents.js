import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ChatbotComponents(){

  const theme = {
    background: '#f5f8fb',          // Light blue background
    fontFamily: 'Arial, sans-serif', // Default font family
    headerBgColor: '#41c0e3',       // Light blue header background
    headerFontColor: '#fff',        // White header font color
    headerFontSize: '15px',         // Header font size
    botBubbleColor: '#41c0e3',      // Light blue bot bubble color
    botFontColor: '#fff',           // White bot font color
    userBubbleColor: '#ffffff',     // White user bubble color
    userFontColor: '#41c0e3',       // Light blue user font color
  };
  const notify = () => {
    toast('You have a new message!', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const steps = [
    {
      id: '1',
      message: 'Welcome to Elderly Squire how may i help?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'What age i can get a senior ID', trigger: '3' },
        { value: 2, label: 'What are the requirements for Applying to Senior Citizen ID', trigger: '4' },
        { value: 3, label: 'How to Apply for Senior ID application', trigger: '5' },
        { value: 3, label: 'What would i do after registrations success?', trigger: '8' },
        {value: 4, label:"I have no more questions", trigger:'6'}
      ],
    },
    {
      id: '10',
      options: [
        { value: 1, label: 'Would you like to ask more questions', trigger: '7' },
        { value: 2, label: 'No, That is all', trigger: '6' },
      ],
    },
    {
      id: '7',
      message: 'Okay,what question would you like to ask',
      trigger: '2',
    },
    {
      id: '8',
      message: 'Wait for a Text from OSCA after they verified your registrations',
      trigger: '2',
    },
  
    {
      id: '3',
      message: 'People who are 60 Years old above Can apply for Senior Citizen ID.',
      trigger: '10',
    },
    {
      id: '4',
      message: 'One valid ID and must be 60 years old above and a citizen of manila city',
      trigger: '10'
    },
    {
      id: '5',
      message: 'To apply for Senior ID application you can click the Senior ID application and fill up the forms.',
      trigger: '10'
    },
    {
      id: '6',
      message: 'Thank you, Have a Nice Day',
      end: true,
    },
  ];

    return (
    <ThemeProvider theme={theme}>
       <ChatBot
        steps={steps}
        headerTitle={`LOLO BOT`}
        floating={true}
        onSendMessage={notify}
      />
      <ToastContainer />
        </ThemeProvider>
      );
    }

export default ChatbotComponents