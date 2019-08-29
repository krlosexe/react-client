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


    name_curso: Yup.string()
    .required('Required'),

    nombre_evaluacion: Yup.string()
    .required('Required'),


    calificacion: Yup.string()
    .required('Required')

});
	



export default class Cargar extends React.Component {

 
	constructor(props) {
		super(props);
	}



	state = {
	    auth: true,
	    estudiante: null
	}


	 list(){
		let id = this.props.match.params.id;
		axios({
			method: 'get',
			url: base_url+api+"/Estudent/data/"+id,
			
		}).then(respuesta => {
			let datos = respuesta.data;

			this.setState({
				estudiante : datos.data
			});
		});
	}




	guardar(value){
		let id = this.props.match.params.id;
		axios({
			method: 'put',
			url: base_url+api+"/Notas/Save/"+id,
			data: value,
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {


				this.data = {
				 	nombre  : '',
				}

				this.props.history.push('/notas/');


				alert("Operacion Exitosa");
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
	    this.list();
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
			      initialValues={this.state.estudiante}
			      validationSchema={Schema}
			      onSubmit={value => {
			      	this.guardar(value);
			      }}
			    >
			      {({ errors, touched }) => (
			        <Form>

			        	<h1> Cargar Notas</h1>

			          <div className="row">
			          	<div className="col-md-6 form-group">
				          	  <label>Nombre</label>
					          <Field name="nombre" className="form-control" disabled/>
					          {errors.nombre && touched.nombre ? (
					            <div className="text-danger">{errors.nombre}</div>
					          ) : null}
			         	 </div>


			         	 <div className="col-md-6 form-group">
				          	  <label>Curso</label>
					          <Field name="name_curso" className="form-control" disabled/>
					          {errors.name_curso && touched.name_curso ? (
					            <div className="text-danger">{errors.name_curso}</div>
					          ) : null}
			         	 </div>


			         	 <div className="col-md-6 form-group">
				          	  <label>Nombre de Evaluacion</label>
					          <Field name="nombre_evaluacion" className="form-control"/>
					          {errors.nombre_evaluacion && touched.nombre_evaluacion ? (
					            <div className="text-danger">{errors.nombre_evaluacion}</div>
					          ) : null}
			         	 </div>


			         	 <div className="col-md-6 form-group">
				          	  <label>Calificacion</label>
					          <Field name="calificacion" className="form-control"/>
					          {errors.calificacion && touched.calificacion ? (
					            <div className="text-danger">{errors.calificacion}</div>
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
	              this.state.auth ? '' : <Redirect to='/'/>
	            }


	            { this.state.estudiante != null ? this.form() : 'Cargando'}


			</div>
		);
	}
}
