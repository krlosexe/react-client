import React, { Component } from 'react';
import axios from 'axios';

import { base_url, api } from './base_url'

import './App.css';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './Routes'
import Navbars from './components/Navbar/Navbars'
import Login from './components/Login/Login'
import { Redirect } from 'react-router-dom';





class App extends Component {

  constructor(props) {
    super(props);
  }


  state = {
      auth: false
  }




  verify(){
    let token    = window.localStorage.getItem("token");
    let id_user  = window.localStorage.getItem("id_user");

    axios({
      method: 'GET',
      url: base_url+api+"/Auth/User/"+id_user,
      //crossDomain: true,
      
    }).then(respuesta => {

      let datos = respuesta.data;

      if (datos.success) {

        if (datos.data.token == token) {
          this.setState({ auth: true })
        }else{
          this.setState({ auth: false })
        }

      }else{
         
      }

      this.login = {
            username  : '',
            password  : ''
        }
    });
  }


  login(){
    //console.log("LOGN "+this.state.auth);
    return (
      <div>
        <Login/>
      </div>
    )
  }



  componentDidMount(){
    this.verify();
  }
  



  render() {

    return (
      <Router>
        <div>
          <Navbars auth={ this.state.auth }/>
          <div className="container">
            <Routes/>
            {

              !this.state.auth ? this.login() : <Redirect to='/dashboard'/>
            }

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
