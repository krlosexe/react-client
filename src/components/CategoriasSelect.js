import React from 'react';
import axios from 'axios';
import {URL} from './../config/config';


import {Field } from 'formik';


export default class CategoriasSelect extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			categorias : []
		}
	}

	componentDidMount(){
		axios({
			method: 'get',
			url: 'http://127.0.0.1:8000/api/categorias_select',
			headers : {
				"Authorization" : "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU2MDAwNjQ3OCwiZXhwIjoxNTYwMDEwMDc5LCJuYmYiOjE1NjAwMDY0NzksImp0aSI6IlN6ZnlVQ3h1bWFJMnZtdloiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.sYgDNP01m7fwYc311bosC-_DV8Ps5G6HHIPQP_Rs05U"
			}
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {
				this.setState({
					categorias : datos.data
				});
			}
		});
	}


	listar(){

		if (this.state.categorias.length > 0) {
			return this.state.categorias.map((e, i) =>
				<option value = { this.props.categoria_id } value={e.id} key = { i } > {e.nombre}</option>
			);
		}
	}



	render() {
		return (
			
			<Field component="select" name="categoria" className="form-control">
			  <option value="">Seleccionar</option>
	            { this.listar() }
	        </Field>
			
		);
	}
}
