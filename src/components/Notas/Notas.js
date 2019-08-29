import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { base_url, api } from '../../base_url'
import { BrowserRouter as Router, Link } from 'react-router-dom'

import { CSVLink, CSVDownload } from "react-csv";

const headers = [
  { label: "Nombre", key: "nombre" },
  { label: "Curso", key: "name_curso" },
  { label: "Calificacion", key: "calificacion" }
];

const data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];



export default class Notas extends React.Component {

	constructor(props) {
		super(props);
	}


	state = {
	    auth  : true,
	    lists : [],
	    csv   : []
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

	      this.login = {
	            username  : '',
	            password  : ''
	        }
	    });
	}




	list(){
		axios({
			method: 'get',
			url: base_url+api+"/Estudent/list/",
		}).then(respuesta => {
			let datos = respuesta.data;
			this.setState({
				lists : datos.data
			});


			console.log(datos.data)
		});
	}



	csv(){
		axios({
			method: 'get',
			url: base_url+api+"/Estudent/csv/",
		}).then(respuesta => {
			let datos = respuesta.data;
		

			this.setState({ csv: datos.data })

				console.log(this.state.csv)
		});
	}





	listar(){
		if (this.state.lists.length > 0) {
			return this.state.lists.map(
				(e, i) => 
				<tr key={i}>
					<td>{e.nombre}</td>
					<td>{e.name_curso}</td>
					<td>{e.nombre_evaluacion}</td>
					<td>{e.calificacion}</td>
					<td>
						<button onClick = { () => {this.cargar(e.id_estudiante)} } className="btn btn-primary">Cargar Nota</button>
					</td>
				</tr>
			);
		}
	}


	cargar(id){
		this.props.history.push('/notas/cargar/'+id);
	}



	delete(id){
		axios({
			method: 'delete',
			url: base_url+api+"/Cursos/delete/"+id,
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {
				this.props.history.push('/cursos/');

				alert(datos.data);
				this.list();
			}
		});
	}












	componentDidMount(){
	    this.verify();
	    this.list();
	    this.csv();
	}




	thead(){
		return (
			<div>
			<br /><br />

			     <h1>Notas</h1>


			     <CSVLink className="btn btn-primary" data={this.state.csv} headers={headers} >Reporte de notas mayores a 3.5 Formato .CSV</CSVLink>
			     <br />
			     <br />

				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Estudiante</th>
							<th>Curso</th>
							<th>Nombre Evaluacion</th>
							<th>Calificacion</th>
							<th>Opciones</th>
						</tr>
					</thead>
					<tbody>
						{this.listar()}
					</tbody>
				</table>
			</div>
		)
	}



	render() {
		return (
			<div>
			    {
	              this.state.auth ? this.thead() : <Redirect to='/'/>
	            }
			</div>
		);
	}
}
