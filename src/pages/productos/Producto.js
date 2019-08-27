import React from 'react';
import axios from 'axios';

export default class Producto extends React.Component {
	
	constructor() {
		super();

		this.state = {
			productos : []
		}
	}


	list(){
		axios({
			method: 'get',
			url: 'http://127.0.0.1:8000/api/productos',
			headers : {
				"Authorization" : "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU2MDAyNzMwNywiZXhwIjoxNTYwMDMwOTA3LCJuYmYiOjE1NjAwMjczMDcsImp0aSI6IjVNT1VPbjFtTFlSWUpWYzYiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.vCJbzJNdFbzlaSGEgGy91E_uyK_oko-ptY2q22qY6qQ"
			}
		}).then(respuesta => {
			let datos = respuesta.data;

			this.setState({
				productos : datos.data
			});
		});
	}

	

	status(id){
		axios({
			method: 'delete',
			url: 'http://127.0.0.1:8000/api/productos/'+id,
			headers : {
				"Authorization" : "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU2MDAyNzMwNywiZXhwIjoxNTYwMDMwOTA3LCJuYmYiOjE1NjAwMjczMDcsImp0aSI6IjVNT1VPbjFtTFlSWUpWYzYiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.vCJbzJNdFbzlaSGEgGy91E_uyK_oko-ptY2q22qY6qQ"
			}
		}).then(respuesta => {
			let datos = respuesta.data;

			if (datos.success) {
				alert("Actualizado");

				this.list();
			}
		});
	}


	editar(id){
		this.props.history.push('/producto/modificar/'+id);
	}

	componentDidMount(){
		this.list();
	}

	listar(){
		if (this.state.productos.length > 0) {
			return this.state.productos.map(
				(e, i) => 
				<tr key={i}>
					<td>{e.nombre}</td>
					<td>{e.precio}</td>
					<td>{e.cantidad}</td>
					<td>{e.nombre_categoria}</td>
					<td>{e.estado == 1 ? "Activo" : 'Inactivo'}</td>
					<td>
						{
							e.estado == 1 ? 
								<button onClick = { () => {this.status(e.id)} } className="btn btn-danger">Inactivar</button>
							:
								<button onClick = { () => {this.status(e.id)} } className="btn btn-success">Activar</button>
						}

						<button onClick = { () => {this.editar(e.id)} } className="btn btn-primary">Editar</button>
						
					
					</td>
				</tr>
			);
		}
	}

	render() {
		return (
			<div>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Precio</th>
							<th>Cantidad</th>
							<th>Categoria</th>
							<th>Estado</th>
							<th>Opciones</th>
						</tr>
					</thead>
					<tbody>
						{this.listar()}
					</tbody>
				</table>
			</div>
		);
	}
}
