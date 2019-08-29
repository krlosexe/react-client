import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';



export default class Navbars extends React.Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
	    this.state = {
	      isOpen: false
	    };
	}

	toggle() {
	    this.setState({
	      isOpen: !this.state.isOpen
	    });
	}


	render() {
		return (
			<div>
				<Navbar color="light" light expand="md">
		            <NavbarBrand href="/">Mi App Client</NavbarBrand>
		            <NavbarToggler onClick={this.toggle} />
		            <Collapse isOpen={this.state.isOpen} navbar>
		              	<Nav className="ml-auto" navbar>
							<NavItem>
			              		<Link className="nav-link" to="/estudent">Estudiantes</Link>
			            	</NavItem>

			            	<NavItem>
			              		<Link className="nav-link" to="/cursos">Cursos</Link>
			            	</NavItem>


			            	<NavItem>
			              		<Link className="nav-link" to="/notas">Cargar Notas</Link>
			            	</NavItem>

			           </Nav>
		            </Collapse>
		        </Navbar>
			</div>
		);
	}
}
