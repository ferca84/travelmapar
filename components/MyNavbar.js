import React, { useContext } from 'react';
// import Nav from 'react-bootstrap/Nav';
import { Navbar, NavDropdown, Nav, Form, FormControl, Button, Dropdown, Image } from 'react-bootstrap'
import Link from 'next/link';
// import GlobalContext from './context/globalContext';
import { signOut } from '../firebase/client';
import useUser from '../hooks/useUser';
// import logo from '../styles/logo.png'
// import logo2x from '../styles/logo@2x.png'
// import Busqueda from './Busqueda';
const MyNavbar = () => {
    // const { user } = useContext(GlobalContext);
    const user = useUser();

    return (
        <Navbar bg="light" variant="light" expand="lg" style={{ boxShadow: '0 1px 5px 0 hsla(0,0%,44.3%,.4)' }} >
            <Navbar.Brand href="/explorar">Travel Map</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                    <Link href="/explorar" ><a>Mapa</a></Link>
                    {/*<Link href="/agendarTurno/[comercio]" as={`/agendarTurno/don-mateo`} >
                <a>Agregar Articulo</a>
            </Link>
                <Form inline>
                    <Busqueda />
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>*/}
                </Nav>
                <Nav style={{alignItems: 'center'}}>
                    <Link href="/publicarArticulo"  ><a className="nav-link">Publicar Artículo</a></Link>
                    <Link href="/login" ><a className="nav-link" >Ingresar</a></Link>
                    {user && user.email &&
                        <Dropdown alignRight>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                <Image src={user.photoURL} style={styles.avatar} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Mi Cuenta</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="/explorar" onClick={() => signOut()}>Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {/*<Nav.Link href="/administracion-notas">Admin</Nav.Link>*/}
                </Nav>

            </Navbar.Collapse>
        </Navbar >
    )
};

const styles = {
    avatar: {
        verticalAlign: 'middle',
        width: '50px',
        height: '50px',
        borderRadius: '50%'
    }
}

export default MyNavbar;