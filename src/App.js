import React from 'react';
import './App.css';
import Home from './components/pages/Home/Home';
import Application from './components/pages/Application/Application'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/pages/Footer/Footer';
import BlogApp from './components/pages/Blog/BlogApp';
import NewsApp from './components/pages/News/NewsApp';
import SCapplication from './components/PageFive';
import Benedisplay from './components/pages/Benefits/Benedisplay';
import ListDisplay from './components/pages/Elderlist/ListDisplay';
import LoginDisplay from './components/pages/Login/LoginDislay';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/application' component={Application} />
        <Route path='/blogApp' component={BlogApp} />
        <Route path='/newsApp' component={NewsApp} />
        <Route path='/benedisplay' component={Benedisplay} />
        <Route path='/registerID' component={SCapplication} />
        <Route path='/listDisplay' component={ListDisplay} />
        <Route path='/logindisplay' component={LoginDisplay} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;