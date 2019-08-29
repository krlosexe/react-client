import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from  "./components/dashboard/Dashboard";

import Cursos from  "./components/Cursos/Cursos";
import CreateCurso from  "./components/Cursos/CreateCurso";
import EditCurso from  "./components/Cursos/EditCurso";


import Estudent from  "./components/Users/Estudent";
import CrearEstudiante from  "./components/Users/CrearEstudiante";
import EditEstudent from  "./components/Users/EditEstudent";


import Notas from  "./components/Notas/Notas";
import Cargar from  "./components/Notas/Cargar";




export default class Routes extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
				<Route path="/dashboard" exact component={Dashboard} />

				<Route path="/cursos" exact component={Cursos} />
				<Route path="/cursos/create" exact component={CreateCurso} />
				<Route path="/cursos/edit/:id" exact component={EditCurso} />


				<Route path="/Estudent/" exact component={Estudent} />
				<Route path="/create-estudiante" exact component={CrearEstudiante} />
				<Route path="/estudent/edit/:id" exact component={EditEstudent} />

				<Route path="/notas" exact component={Notas} />
				<Route path="/notas/cargar/:id" exact component={Cargar} />

			</Switch>
		);
	}
}
