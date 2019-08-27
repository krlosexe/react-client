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





export default class CrearProducto extends React.Component {
	
	constructor() {
		super();
	}


	producto = {
     	nombre       : '',
     	precio       : '',
     	categoria    : '',
     	cantidad     : '',

	}

	guardar(value){
		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/api/productos',
			data: value,
			headers : {
				"Authorization" : "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU1OTg1NDUyMCwiZXhwIjoxNTU5ODU4MTIwLCJuYmYiOjE1NTk4NTQ1MjAsImp0aSI6InBhckU5dFVJaEduaEdxTU4iLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.bcIs1BhSJ0nKrn2Fs8UZWRh-EF3WE2axjdSk4lIREmA"
			}
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {


				this.producto = {
			     	nombre       : '',
			     	precio       : '',
			     	categoria    : '',
			     	cantidad     : '',

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
			      validationSchema={ProductoSchema}
			      onSubmit={value => {
			      	this.guardar(value);
			      }}
			    >
			      {({ errors, touched }) => (
			        <Form>

			        	<h1> Crar Producto</h1>

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
				          <CategoriasSelect />
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
