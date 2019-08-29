import React from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import CategoriasSelect from './../../components/CategoriasSelect';
import axios from 'axios';

import { base_url, api } from '../../base_url'
import { Redirect } from 'react-router-dom';


const LoginSchema = Yup.object().shape({

  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .required('Required'),

});



export default class Login extends React.Component {
	
	constructor(props) {
		super(props);
	}

	login = {
     	username  : '',
     	password  : ''
	}


	state = {
	    redirect: false
	}


	auth(value){
		axios({
			method: 'POST',
			url: base_url+api+"/Auth/User",
			data: value,
			//crossDomain: true,
			
		}).then(respuesta => {


			let datos = respuesta.data;

			if (datos.success) {
				window.localStorage.setItem("token", respuesta.data.message.token);
				window.localStorage.setItem("id_user", respuesta.data.message.id_user);
				alert("Se autenticado exitosamente");

				this.setState({ redirect: true })

			}else{
				alert(respuesta.data.error);
			}

			this.login = {
			     	username  : '',
			     	password  : ''
				}
		});
	}


	render() {

		// console.log(window.localStorage.getItem("token"));
		 const { redirect } = this.state;
		 if (redirect) {
	       return <Redirect to='/dashboard'/>;
	     }

		return (
			<div>
			    <Formik
			      initialValues={this.login}
			      validationSchema={LoginSchema}
			      onSubmit={value => {
			      	this.auth(value);
			      }}
			    >
			      {({ errors, touched }) => (
			        <Form>

			        	<br /><br /><br /> <br />

			        	<h1>Login</h1>

			          	<div className="row">
			          		<div className="col-md-6 form-group">
				          	  <label>Nombre</label>
					          <Field name="username" className="form-control"/>
					          {errors.username && touched.username ? (
					            <div className="text-danger">{errors.username}</div>
					          ) : null}
				         	</div>

			         		 <div className="col-md-6 form-group">
				         	 	<label>Password</label>
					         	 <Field name="password" type="password" className="form-control"/>
					          	 {errors.password && touched.password ? (
					             <div className="text-danger">{errors.password}</div>
					          ) : null}
				         	 </div>
			         	

			         	 <br />
			         	 <br />


			         	 <div className="col-md-12">
			         	 	<button type="submit" className="btn btn-primary">Submit</button>
			         	 </div>
			          </div>

			        </Form>
			      )}
			    </Formik>
			</div>
		);
	}
}
