import React from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import CategoriasSelect from './../../components/CategoriasSelect';
import axios from 'axios';

import { base_url, api } from '../../base_url'

const LoginSchema = Yup.object().shape({

  nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .required('Required'),

});





export default class Login extends React.Component {
	
	constructor() {
		super();
	}


	producto = {
     	nombre    : '',
     	password  : ''

	}

	save(value){
		axios({
			method: 'POST',
			url: base_url+api+"/Auth/User",
			data: value,
			//crossDomain: true,
			
		}).then(respuesta => {

			console.log(respuesta);
			let datos = respuesta.data;

			if (datos.success) {
				this.producto = {
			     	nombre    : '',
			     	password  : ''
				}
				alert("REGISTRO EXITOSO");
			}
		});
	}

	render() {

		return (
			<div>
			    <Formik
			      initialValues={this.producto}
			      validationSchema={LoginSchema}
			      onSubmit={value => {
			      	this.save(value);
			      }}
			    >
			      {({ errors, touched }) => (
			        <Form>

			        	<br /><br /><br /> <br />

			        	<h1>Login</h1>

			          	<div className="row">
			          		<div className="col-md-6 form-group">
				          	  <label>Nombre</label>
					          <Field name="nombre" className="form-control"/>
					          {errors.nombre && touched.nombre ? (
					            <div className="text-danger">{errors.nombre}</div>
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
