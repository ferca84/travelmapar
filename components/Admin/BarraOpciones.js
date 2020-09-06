import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { deJSAFechaAmericana } from '../../utils/functions';
import { BsFillPlusCircleFill } from "react-icons/bs";


const BarraOpciones = (props) => {

  const [fecha, setFecha] = useState(deJSAFechaAmericana(new Date()));

  return (
    <Row>
      <Col xs={8} sm={8}>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="date" placeholder="Fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </Form.Group>
      </Col>
      <Col xs={4} sm={4}>
        <BsFillPlusCircleFill />
        <Button variant="light" >Nuevo</Button>
      </Col>
    </Row>
  );
}

export default BarraOpciones