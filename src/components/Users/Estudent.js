import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { base_url, api } from '../../base_url'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default class Estudent extends React.Component {

	constructor(props) {
		super(props);
	}




	state = {
	    auth : true,
	    lists: []
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
		});
	}



	editar(id){
		this.props.history.push('/estudent/edit/'+id);
	}


	delete(id){
		axios({
			method: 'delete',
			url: base_url+api+"/Estudent/delete/"+id,
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {
				this.props.history.push('/estudent/');

				alert(datos.data);
				this.list();
			}
		});
	}

	





	componentDidMount(){
	    this.verify();
	    this.list();


	   // console.log(this.state.lists.length)
	}


	listar(){
		if (this.state.lists.length > 0) {
			return this.state.lists.map(
				(e, i) => 
				<tr key={i}>
					<td>{e.nombre}</td>
					<td>{e.edad}</td>
					<td>{e.name_curso}</td>
					<td>
						<button onClick = { () => {this.editar(e.id_estudiante)} } className="btn btn-primary">Editar</button>
						&nbsp;
						<button onClick = { () => {this.delete(e.id_estudiante)} }  className="btn btn-danger">Eliminar</button>
					</td>
				</tr>
			);
		}
	}


	thead(){
		return (
			<div>
			<br /><br />

			     <h1>Estudiantes</h1>
				<div className="row">
	         	 	
	         	</div>
	         	<div className="row">
	         	 	
	         	</div>
				<div className="col-md-12">
					<br /><br />
	         	 	<Link className="btn btn-primary" to="/create-estudiante">Add</Link>
	         	 	<br /><br />
	         	</div>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Edad</th>
							<th>Curso</th>
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
