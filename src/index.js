import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AuthContextProvider } from './context/authContext'
//import {ElderAuthContextProvider} from './context/authContextElder'

ReactDOM.render(

<AuthContextProvider>

<App />

</AuthContextProvider>
,
document.getElementById('root'));

