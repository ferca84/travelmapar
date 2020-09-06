import { Button, Form, InputGroup } from 'react-bootstrap'
import { useState } from 'react';
import { deJSAFechaAmericana } from '../../utils/functions';

const FormEditTurnoAdmin = ({ turno, ...props }) => {
    const [turnoEditado, setTurno] = useState({ fecha: deJSAFechaAmericana(new Date()) });
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

        }

        setValidated(true);
    };

    const styles = {
        inputGroupText: { width: '85px' },
        buttons: { margin: '0 10px' }
    };

    return (

        <Form noValidate validated={validated} onSubmit={handleSubmit} >

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={styles.inputGroupText}>Servicio:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" defaultValue={turno.servicio.nombre}>
                    <option>Corte de Pelo</option>
                    <option>Lavado</option>
                </Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={styles.inputGroupText}>Fecha:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="date" defaultValue={turno.fecha} value={turno.fecha} onChange={(e) => setTurno({ ...turno, fecha: e.target.value })} required />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={styles.inputGroupText}>Horario:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" defaultValue={turno.horario} required>
                    <option>9:00 - 9:30</option>
                    <option>9:30 - 10:00</option>
                    <option>10:00 - 10:30</option>
                    <option>10:30 - 11:00</option>
                </Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={styles.inputGroupText}>Estado:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" defaultValue={turno.estado.nombre}>
                    <option>Confirmado</option>
                    <option>Pendiente</option>
                    <option>Cancelado</option>
                    <option>Ausente</option>
                </Form.Control>
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={styles.inputGroupText}>Mensaje:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="textarea" rows="2" defaultValue={turno.mensaje} />
            </InputGroup>

            <div className="text-center">
                <Button className={styles.buttons} variant="light" size="lg" onClick={props.onHide}>Cerrar</Button>
                <Button className={styles.buttons} variant="primary" size="lg" type="submit">Guardar</Button>
            </div>
        </Form>

    );
}

export default FormEditTurnoAdmin;