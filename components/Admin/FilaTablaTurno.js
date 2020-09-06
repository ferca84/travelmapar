import React from 'react'
import { Badge } from 'react-bootstrap';

import { BsFillGearFill } from "react-icons/bs";

const FilaTablaTurno = ({turno, handleClick}) => {

  return (
    <tr>
        <td>{turno.horario}</td>
        <td>{turno.cliente.nombre}</td>
        <td>{turno.servicio.nombre}</td>
        <td><Badge variant={turno.estado.variant}>{turno.estado.nombre}</Badge></td>
        <td>{<BsFillGearFill style={{ cursor: 'pointer', fontSize: '19px' }} onClick={() => handleClick(turno)} />}</td>
    </tr>
  );
}

export default FilaTablaTurno