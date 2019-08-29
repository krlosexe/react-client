import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { base_url, api } from '../../base_url'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default class Cursos extends React.Component {

	constructor(props) {
		super(props);
	}


	state = {
	    auth: true,
	    cursos : []
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
			url: base_url+api+"/Cursos/list/",
		}).then(respuesta => {
			let datos = respuesta.data;
			this.setState({
				cursos : datos.data
			});
		});
	}



	listar(){
		if (this.state.cursos.length > 0) {
			return this.state.cursos.map(
				(e, i) => 
				<tr key={i}>
					<td>{e.nombre}</td>
					<td>
						<button onClick = { () => {this.editar(e.id)} } className="btn btn-primary">Editar</button>
						&nbsp;
						<button onClick = { () => {this.delete(e.id)} }  className="btn btn-danger">Eliminar</button>
					</td>
				</tr>
			);
		}
	}


	editar(id){
		this.props.history.push('/cursos/edit/'+id);
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
	}




	thead(){
		return (
			<div>

				<br /><br />

			     <h1>Cursos</h1>


				<div className="row">
	         	 	
	         	</div>
	         	<div className="row">
	         	 	
	         	</div>
				<div className="col-md-12">
				<br /><br />
	         	 	<Link className="btn btn-primary" to="/cursos/create">Add</Link>
	         	 	<br /><br />
	         	</div>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Nombre</th>
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
