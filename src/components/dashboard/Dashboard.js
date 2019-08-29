import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { base_url, api } from '../../base_url'



export default class Dashboard extends React.Component {
	
	constructor(props) {
		super(props);
	}


	login = {
     	username  : '',
     	password  : ''
	}


	state = {
	    auth: true
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

	componentDidMount(){
	    this.verify();
	}



	render() {

		return (
			<div>
			    {
	              this.state.auth ? "Dashboard" : <Redirect to='/'/>
	            }
			</div>
		);
	}
}
