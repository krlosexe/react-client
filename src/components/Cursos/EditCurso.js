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
	



export default class EditCurso extends React.Component {

 
	constructor(props) {
		super(props);
	}

	state = {
	    auth: true,
	    curso: null
	}

	data = {
	 	nombre  : '',
	}





	list(){
		let id = this.props.match.params.id;
		axios({
			method: 'get',
			url: base_url+api+"/Cursos/curso/"+id,
			
		}).then(respuesta => {
			let datos = respuesta.data;

			this.setState({
				curso : datos.data
			});
		});
	}





	guardar(value){
		let id = this.props.match.params.id;
		axios({
			method: 'put',
			url: base_url+api+"/Cursos/edit/"+id,
			data: value,
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {
				this.data = {
				 	nombre  : '',
				}
				this.props.history.push('/cursos/');

				alert(datos.data);
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



	form(){
		return (
			<div>
				<Formik
			      initialValues={this.state.curso}
			      validationSchema={Schema}
			      onSubmit={value => {
			      	this.guardar(value);
			      }}
			    >
			      {({ errors, touched }) => (
			        <Form>

			        	<h1> Editar Curso</h1>

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
	              this.state.auth ? '' : <Redirect to='/'/>
	            }

	            { this.state.curso != null ? this.form() : 'Cargando'}


			</div>
		);
	}
}
