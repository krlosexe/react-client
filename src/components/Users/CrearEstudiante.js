import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { base_url, api } from '../../base_url'



import CursosSelect from '../Cursos/CursosSelect';





const EstudianteSchema = Yup.object().shape({

  nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  edad: Yup.string()
    .required('Required'),


    curso: Yup.string()
    .required('Required')


});
	



export default class CrearEstudiante extends React.Component {


	constructor(props) {
		super(props);
	}



	state = {
	    auth: true
	}


	estudiante = {
	 	nombre  : '',
	 	edad    : '',
	 	curso   : ''
	}



	guardar(value){
		axios({
			method: 'post',
			url: base_url+api+"/Estudent/Create",
			data: value,
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {


				this.estudiante = {
				 	nombre  : '',
				 	edad    : '',
				 	curso   : ''
				}

				this.props.history.push('/estudent/');


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
			      initialValues={this.estudiante}
			      validationSchema={EstudianteSchema}
			      onSubmit={value => {
			      	this.guardar(value);
			      }}
			    >
			      {({ errors, touched }) => (
			        <Form>

			        	<h1> Crear estudiante</h1>

			          <div className="row">
			          	<div className="col-md-6 form-group">
			          	  <label>Nombre</label>
				          <Field name="nombre" className="form-control"/>
				          {errors.nombre && touched.nombre ? (
				            <div className="text-danger">{errors.nombre}</div>
				          ) : null}
			         	 </div>

			         	 <div className="col-md-6 form-group">
				         	 <label>Edad</label>
					          <Field name="edad" className="form-control"/>
					          {errors.edad && touched.edad ? (
					            <div className="text-danger">{errors.edad}</div>
					          ) : null}
			         	 </div>



			         	 <div className="col-md-6 form-group">
				         	 <label>Cursos</label>
					          <CursosSelect curso_id = { false }/>
					          {errors.curso && touched.curso ? (
					            <div className="text-danger">{errors.curso}</div>
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
