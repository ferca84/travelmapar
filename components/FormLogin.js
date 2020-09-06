import React, { useState, useEffect, useContext } from 'react'
import { validarMail } from '../utils/functions';
import Link from 'next/link'
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { loginWithEMAIL, loginWithGMAIL, onAuthStateChanged } from '../firebase/client';
import GlobalContext from './context/globalContext';
import { useRouter } from 'next/router'
import useUser from '../hooks/useUser';
// import ReactGA from 'react-ga';

const FormLogin = (props) => {

    // ReactGA.initialize('UA-54854159-9');

    const [formulario, setFormulario] = useState({ email: '', password: '' });
    const [mensaje, setMensaje] = useState('');
    const [validated, setValidated] = useState(false);
    const user = useUser()
    const router = useRouter()
  
    useEffect(() => {
      user && router.replace("/explorar")
    }, [user])
  
    const handleChange = (event) => {
        event.persist()
        setFormulario(prevState => {
            return { ...prevState, [event.target.id]: event.target.value }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) return;

        setValidated(true);
        props.login(formulario.email, formulario.password)
        setMensaje('');

		/*ReactGA.event({
            category: 'Usuarios',
            action: 'Login'
        });*/
    }

    const handleGMAILClick = () => {
        loginWithGMAIL().then().catch(err => {
            console.log(err)
        });
    }

    const handleEMAILClick = () => {
        // TODO: validar campos
        createUserWithEmail(formulario.email, formulario.password);
    }
    

    /*useEffect(() => {
        if (typeof window !== 'undefined' ) {
            startFirebaseUI()
        }
       
    }, [startFirebaseUI])*/

       /* if (typeof window !== 'undefined' ) {
            window.addEventListener('load', function() {
                initApp();
            });
        }*/
        
      

    return (
        <Row className="justify-content-md-center">
            {user && 
            <div>
            <h1>Welcome to My Awesome App</h1>
            <div id="sign-in-status"></div>
            <div id="sign-in">{user.email}</div>
            <pre id="account-details"></pre>
            <div id="firebaseui-auth-container"></div>
            </div>
        }
            <Col>
                <Card style={{ margin: 'auto' }}>
                    <Card.Body>
                        <Card.Title>Iniciar sesión</Card.Title>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} >
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese su email" onChange={handleChange} required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un email valido
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese su password" onChange={handleChange} required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese su password
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className='text-center'>
                                <Button type="submit" variant="primary">Iniciar Sesión</Button>
                                <Button variant="primary" onClick={handleGMAILClick}>GMAIL</Button>
                                <Button variant="primary" onClick={handleGMAILClick}>FACEBOOK</Button>
                                <Button variant="primary" onClick={handleEMAILClick}>EMAIL</Button>
                                <br />
                                <Link href="/registrar">
                                    <a>Registrarse</a>
                                </Link>
                            </div>
                        </Form>







                        <p style={{ color: 'red' }}>{mensaje}</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}


export default FormLogin

