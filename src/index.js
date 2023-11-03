import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*import { usersContextProvider } from './context/usersContext';*/
import { AuthContextProvider } from './context/authContext'
/*import { NewsContextProvider } from './context/newsContext';*/


ReactDOM.render(

<AuthContextProvider>
{/*<NewsContextProvider>*/}
<App />
{/*</AuthContextProvider>*/}
</AuthContextProvider>
,
document.getElementById('root'));

