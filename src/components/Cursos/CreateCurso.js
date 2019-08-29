import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { base_url, api } from '../../base_url'



const Schema = Yup.object().shape({

  nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

});
	



export default class CreateCurso extends React.Component {

 
	constructor(props) {
		super(props);
	}



	state = {
	    auth: true
	}


	 data = {
	 	nombre  : '',
	 }



	guardar(value){
		axios({
			method: 'post',
			url: base_url+api+"/Cursos/Create",
			data: value,
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {


				this.data = {
				 	nombre  : '',
				}

				this.props.history.push('/cursos/');


				alert("REGISTRO EXITOSO");
			}
		});
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
	         this.setState({ auth: false })
	      }
	    });
	}

	componentDidMount(){
	    this.verify();
	}


	listar(){
		return (
			<div></div>
		)
	}



	form(){
		return (
			<div>
				<Formik
			      initialValues={this.data}
			      validationSchema={Schema}
			      onSubmit={value => {
			      	this.guardar(value);
			      }}
			    >
			      {({ errors, touched }) => (
			        <Form>

			        	<h1> Crear Curso</h1>

			          <div className="row">
			          	<div className="col-md-6 form-group">
			          	  <label>Nombre</label>
				          <Field name="nombre" className="form-control"/>
				          {errors.nombre && touched.nombre ? (
				            <div className="text-danger">{errors.nombre}</div>
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
		)
	}





	render() {
		return (
			<div>
			    {
	              this.state.auth ? this.form() : <Redirect to='/'/>
	            }
			</div>
		);
	}
}
