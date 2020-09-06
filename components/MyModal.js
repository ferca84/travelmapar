import { Modal } from 'react-bootstrap'


const MyModal = (props) => {
   

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.titulo}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {React.cloneElement(props.children, { onHide: props.onHide })}
            </Modal.Body>
            <Modal.Footer>
                {props.footer}
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;