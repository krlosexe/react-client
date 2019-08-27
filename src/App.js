import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './Routes'
import Navbars from './components/Navbar/Navbars'
import Login from './components/Login/Login'



class App extends Component {

  constructor(props) {
    super(props);

   
  }
  


  render() {
    return (
      <Router>
        <div>

          <Navbars/>

          <div className="container">
            <Routes/>
            <Login/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
