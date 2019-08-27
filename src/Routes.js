import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Producto from  "./pages/productos/Producto";
import CrearProducto from  "./pages/productos/CrearProducto";
import ModificarProducto from  "./pages/productos/ModificarProducto";

export default class Routes extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
				<Route path="/producto" exact component={Producto} />
				<Route path="/producto/crear" exact component={CrearProducto} />
				<Route path="/producto/modificar/:id" exact component={ModificarProducto} />
			</Switch>
		);
	}
}
