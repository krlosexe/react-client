import React from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import CategoriasSelect from './../../components/CategoriasSelect';
import axios from 'axios';
const ProductoSchema = Yup.object().shape({

  nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  precio: Yup.string()
    .required('Required'),

  categoria: Yup.string()
    .required('Required'),

  cantidad: Yup.string()
    .required('Required'),

});





export default class ModificarProducto extends React.Component {
	
	constructor() {
		super();
		
		this.state = {
			producto : null
		}
	}


	guardar(value){
		let id = this.props.match.params.id;
		axios({
			method: 'put',
			url: 'http://127.0.0.1:8000/api/productos/'+id,
			data: value,
			headers : {
				"Authorization" : "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU2MDAyNzMwNywiZXhwIjoxNTYwMDMwOTA3LCJuYmYiOjE1NjAwMjczMDcsImp0aSI6IjVNT1VPbjFtTFlSWUpWYzYiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.vCJbzJNdFbzlaSGEgGy91E_uyK_oko-ptY2q22qY6qQ"
			}
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {


				this.props.history.push('/producto/');
			}
		});
	}



	list(){
		let id = this.props.match.params.id;
		axios({
			method: 'get',
			url: 'http://127.0.0.1:8000/api/productos/'+id,
			headers : {
				"Authorization" : "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU2MDAyNzMwNywiZXhwIjoxNTYwMDMwOTA3LCJuYmYiOjE1NjAwMjczMDcsImp0aSI6IjVNT1VPbjFtTFlSWUpWYzYiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.vCJbzJNdFbzlaSGEgGy91E_uyK_oko-ptY2q22qY6qQ"
			}
		}).then(respuesta => {
			let datos = respuesta.data;

			this.setState({
				producto : datos.data
			});
		});
	}

	formulario(){
		return (
			<Formik
		      initialValues={this.state.producto}
		      validationSchema={ProductoSchema}
		      onSubmit={value => {
		      	this.guardar(value);
		      }}
		    >
		      {({ errors, touched }) => (
		        <Form>

		        	<h1> Modificar Producto</h1>

		          <div className="row">
		          	<div className="col-md-6 form-group">
		          	  <label>Nombre</label>
			          <Field name="nombre" className="form-control"/>
			          {errors.nombre && touched.nombre ? (
			            <div className="text-danger">{errors.nombre}</div>
			          ) : null}
		         	 </div>

		         	 <div className="col-md-6 form-group">
		         	 <label>Precio</label>
			          <Field name="precio" className="form-control"/>
			          {errors.precio && touched.precio ? (
			            <div className="text-danger">{errors.precio}</div>
			          ) : null}
		         	 </div>


		         	 <div className="col-md-6 form-group">
		         	 <label>Categoria</label>
			          <CategoriasSelect categoria_id = { this.state.producto.categoria } />
			          {errors.categoria && touched.categoria ? (
			            <div className="text-danger">{errors.categoria}</div>
			          ) : null}
		         	 </div>



		         	 <div className="col-md-6 form-group">
		         	 <label>Cantidad</label>
			          <Field name="cantidad" type="text" className="form-control"/>
		         	 {errors.cantidad && touched.cantidad ? <div className="text-danger">{errors.cantidad}</div> : null}
		         	 </div>

		         	 <br />
		         	 <br />


		         	 <div className="col-md-12">
		         	 	<button type="submit" className="btn btn-success">Modificar</button>
		         	 </div>
		          </div>

		        </Form>
		      )}
		    </Formik>
		)
	}

	
	componentDidMount(){
		this.list();
	}



	render() {


		return (

			<div>
				{ this.state.producto != null ? this.formulario() : 'Cargando'}
			</div>
		);
	}
}
