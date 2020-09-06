import React, { useState } from 'react'
import { Table, Row, Col } from 'react-bootstrap';
import FilaTablaTurno from './FilaTablaTurno';
import MyModal from '../MyModal';
import FormEditTurnoAdmin from './FormEditTurnoAdmin';


const TablaTurnos = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccioando] = useState({});

  const turnos = [
    {
      id: 1,
      horario: '9:00',
      cliente: { nombre: 'Horacio Fontova' },
      servicio: { nombre: 'Corte de Pelo' },
      estado: { nombre: 'Pendiente', variant: 'warning' }
    },
    {
      id: 2,
      horario: '10:00',
      cliente: { nombre: 'Marcelo Bielsa' },
      servicio: { nombre: 'Corte de Pelo' },
      estado: { nombre: 'Confirmado', variant: 'success' }
    },
    {
      id: 3,
      horario: '11:00',
      cliente: { nombre: 'Jose Perez' },
      servicio: { nombre: 'Corte de Pelo' },
      estado: { nombre: 'Cancelado', variant: 'danger' }
    }
  ];

  const handleClickTurno = (turno) => {
    setTurnoSeleccioando(turno);
    setModalShow(!modalShow);
  }

  return (
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {turnos.map(turno => {
              return <FilaTablaTurno key={turno.id} turno={turno} handleClick={handleClickTurno} />
            })}
          </tbody>
        </Table>
        <MyModal
          titulo='Editar turno'
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <FormEditTurnoAdmin turno={turnoSeleccionado} />
        </MyModal>
      </Col>
    </Row>

  );
}

export default TablaTurnos