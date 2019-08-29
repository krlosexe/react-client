import React from 'react';
import axios from 'axios';

import {Field } from 'formik';

import { base_url, api } from '../../base_url'



export default class CursosSelect extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cursos : [],
			name: null
		}
	}

	componentDidMount(){
		axios({
			method: 'get',
			url: base_url+api+"/Cursos/list/",
		}).then(respuesta => {
			let datos = respuesta.data;
			this.setState({
				cursos : datos.data
			});
		});



		if (!this.props.curso_id) {
			this.setState({
				name : "curso"
			});
		}else{
			this.setState({
				name :"id_curso"
			});
		}



	}


	listar(){

		if (this.state.cursos.length > 0) {
			return this.state.cursos.map((e, i) =>
				<option value = { this.props.curso_id } value={e.id} key = { i } > {e.nombre}</option>
			);
		}
	}



	render() {

		return (
			
			<Field component="select" name={ this.state.name } className="form-control">
			  <option value="">Seleccionar</option>
	            { this.listar() }
	        </Field>
			
		);
	}
}
