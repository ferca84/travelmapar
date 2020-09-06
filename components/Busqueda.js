import React from 'react'
import { Form, Col, Row, Button, Container } from 'react-bootstrap';


const Busqueda = (props) => {
    return (
        <Row style={{margin: '5px'}}>
             <Col xs={8}>
                <Form inline>
                    <Form.Control style={{width: '100%'}} type="text" placeholder="Buscar Pais"  />
                </Form>
            </Col>
            <Col xs={4}>
                <Button>
                    Agregar Post
                </Button>
            </Col>
            {/*
            <Col>
                <Form.Group controlId="formGridState">
                    <Form.Control as="select" defaultValue="Rubros">
                        <option>Peluqueria</option>
                        <option>Gimnasio</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            */}
           
        </Row>
    );
}

export default Busqueda