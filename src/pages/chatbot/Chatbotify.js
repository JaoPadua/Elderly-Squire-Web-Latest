import ChatBot from "react-chatbotify";
import botAvatar from "../img/lolo bot avatar.jpg"
import botAvatar2 from "../img/lolo_bot_avatar_2.jpg"
import React, { useState, useEffect } from 'react';



const Chatbotify = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const helpOptions = [
    "What age i can get a senior ID?",
    "What are the requirements for Applying to Senior Citizen ID",
    "How to Apply for Senior ID application",
    "What would i do after registrations success?",
    "What are the accepted Valid ID's",
    "What do to if i have ID from other city then i want to apply for city of manila",
    "How can i Contact OSCA Manila?",
    "What are the requirements if i'm a dual citizenship?",
    "What this Documents",
  ];

  const YesorNohelpOptions = [
  "YES",
  "NO",
  ];

  const flow = {
    start: {
      message: "Hello, I am LOLO Bot 👋! Welcome to Elderly Squire.",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message: "Do you need help with information regarding Senior Citizen ID and services?",
      options: YesorNohelpOptions,
      path: "handle_yes_no",
    },
    handle_yes_no: {
      transition: { duration: 1000 },
      chatDisabled: true,
      path: async (params) => {
        
        if (params.userInput === "YES") {
          // If the user clicks 'Yes', proceed to display the help options.
          return "show_help_options";
        } else if (params.userInput === "NO") {
          // If the user clicks 'No', thank the user and end the conversation or loop back.
          await params.injectMessage("Thank you for using our service. Have a great day!");
          return "end"; // You could also loop back to 'start' or another appropriate state.
        } else {
          // Handle any unexpected input in the yes/no decision.
          await params.injectMessage("Please select Yes or NO.");
          return "show_options"; // Redirect back to show_options for a valid response.
        }
      },
    },
    show_help_options: {
      message: "Here are some topics you might find helpful:",
      options: helpOptions,
      path: "process_options",
    },
    process_options: {
      transition: { duration: 1000 },
      chatDisabled: true,
      path: async (params) => {
        let response = "";
        switch (params.userInput) {
          case "What age i can get a senior ID?":
            response = "People who are 60 years old and above can apply for a Senior Citizen ID.";
            break;
          case "What are the requirements for Applying to Senior Citizen ID":
            response = `One valid ID, original and newly issued Barangay Certifications 
            (for Senior Citizen Application)
            and residence in Manila City for more than 6 months are required. Must be 60 years old and above. 
            Also Naturalizations Papers/Dual Citizenship Certificate(For Dual Citizenship only) `;
            break;
          case "How to Apply for Senior ID application":
            response = "To apply, please fill up the Senior ID application form available on our website.";
            break;
          case "What would i do after registrations success?":
            response = "Wait for a text from OSCA after they have verified your registration.";
            break;
          case "What are the accepted Valid ID's":
            response = "Accepted IDs include Voter's ID, Birth Certificate (PSA copy), UMID ID, SSS ID, Driver's License, Postal ID.";
            break;
          case "What do to if i have ID from other city then i want to apply for city of manila":
            response = "Our ID registrations are only for incoming Senior Citizens of Manila. For concerns, contact OSCA.";
            break;
          case "How can i Contact OSCA Manila?":
            response = "Contact OSCA via their FB page, email at oscamanila@manila.gov.ph, or phone at (02) 8-571-3878 / 5-310-3371 / 5-310-3372.";
            break;
          case "What this Documents":
            response = "The Document Page is where you can find forms to fill up depending on your needs, like a form for a lost ID.";
            break;
          default:
            return "unknown_input";
        }
        await params.injectMessage(response);
        return "prompt_again";
      },
    },
    prompt_again: {
      message: "Do you need any other help?",
      options: YesorNohelpOptions,
      path: "handle_yes_no",
    },
    unknown_input: {
      message: "Sorry, I do not understand your message. If you require further assistance, please select an option or contact OSCA Manila.",
      options: helpOptions,
      path: "process_options",
    },
  };
  
  const defaultOptions = {
    theme: {
      primaryColor: "#42b0c5",
      secondaryColor: "#491d8d",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      showHeader: true,
      showFooter: false,
      showInputRow: true,
      embedded: false,
      desktopEnabled: true,
      mobileEnabled: true,
    },
    tooltip: {
      mode: "START",
      text: "Need help? Ask me Questions! 😊",
    },
    chatButton: {
      icon: botAvatar,
  },
    header: {
      title: (
        <h3 className="chatbot-title"
          style={{ cursor: "pointer", color: "white", // Set text color to white
          fontSize: "18px", // Text size
          fontWeight: "bold", // Text weight
            }}
          onClick={() => window.open("https://www.facebook.com/ManilaOSCA/")}
        >
          LOLO Bot
        </h3>
      ),
      showAvatar: true,
    avatar: botAvatar2,
    },
    notification: {
      disabled: false,
      defaultToggledOn: true,
      volume: 0.2,
    },
    // Continue to define all other properties as needed
  };
  return <ChatBot options={defaultOptions} flow={flow} />;
};

export default Chatbotify
