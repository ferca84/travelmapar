import { Button, Form, Image, Badge, Col, Spinner, Toast } from 'react-bootstrap'
import { useState } from 'react';
import SearchCountry from './SearchCountry';
import Tags from './Tags';
import { isValidUrl } from '../utils/functions';
import LeafletPicker from './LeafletPicker';
import { addPost } from '../firebase/client';
import { useRouter } from 'next/router';

const FormPublishArticle = ({ user }) => {

    const [post, setPost] = useState({
        description: '',
        image: '/images/placeholder.png',
        title: '',
        url: '',
        tags: [],
        country: '',
        location: { lat: -34.590541197071914, lng: -58.498916011300615 }
    });
    const [validated, setValidated] = useState(false);
    const [spinerSearch, setSpinerSearch] = useState(false);
    const [mensaje, setMensaje] = useState({ url: '' });
    const [show, setShow] = useState(false);
    
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        const urlToCrawl = decodeURI(post.url);
        if (!isValidUrl(urlToCrawl)) {
            setMensaje(state => { return { ...state, url: 'Por favor ingrese una url valida' } });
            return;
        }
        setShow(true);
        //setStatus(COMPOSE_STATES.LOADING)
        addPost(post, user)
            .then(() => {
                router.push("/explorar")
            })
            .catch((err) => {
                console.error(err)
                //setStatus(COMPOSE_STATES.ERROR)
            })
    };

    const handleChange = event => {
        event.persist();
        setPost(state => {
            return { ...state, [event.target.name]: event.target.value }
        });
    };

    const handleLocationChange = latLng => {
        setPost(state => {
            return { ...state, location: latLng }
        });
    };

    const handleSelectTag = (type, id, name) => {
        if (post.tags.includes(name)) {
            setPost(state => {
                return { ...state, tags: state.tags.filter(tag => tag !== name) }
            });
        } else {
            setPost(state => {
                return { ...state, tags: state.tags.concat(name) }
            });
        }
    };


    const handleSelectCountry = (type, country) => {
        setPost(state => {
            return { 
                ...state, 
                country: {code: country.code, name: country.name}, 
                location: {lat: country.lat, lng: country.lng} 
            }
        });
    };

    const handleClickSearchUrl = () => {

        const urlToCrawl = decodeURI(post.url);
        if (!isValidUrl(urlToCrawl)) {
            setMensaje(state => { return { ...state, url: 'Por favor ingrese una url valida' } });
            return;
        }
        setSpinerSearch(true)
        const options = { method: 'POST', body: JSON.stringify(urlToCrawl) };
        fetch('/api/crawl', options)
            .then(res => res.json())
            .then(data => {
                let message = '';

                if (data.url === '')
                    message = 'No se han encontrado Metadatos para esa web';

                setMensaje(state => { return { ...state, url: message } });
                setSpinerSearch(false);
                setPost(state => {
                    return {
                        ...state,
                        url: data.url,
                        description: data.description,
                        image: data.image,
                        title: data.title
                    }
                });

            })
            .catch(error => {
                setSpinerSearch(false);
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >

            <p>Si cuentas con un artículo en un blog, ingresa la url y presiona BUSCAR. Aguarda unos segundos para que se autocompleten 
                varios campos del formulario.</p>

            <Form.Group controlId="exampleForm.ControlUrl">
                <Form.Row style={{ alignItems: 'flex-end' }}>
                    <Col xs={10}>
                        <Form.Label>Ingrese la URL del articulo</Form.Label>
                        <Form.Control type="text" placeholder="Ej: https://www.google.com" name='url' onChange={handleChange} />
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" onClick={handleClickSearchUrl} >
                            {spinerSearch ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                : <span>Buscar</span>
                            }
                        </Button>
                    </Col>
                </Form.Row>
                <span style={styles.invalid}>{mensaje.url}</span>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTitle">
                <Form.Label>Titulo <span style={styles.invalid}>*</span></Form.Label>
                <Form.Control type="text" value={post.title} name='title' onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un titulo
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlDescription">
                <Form.Label>Descripcion <span style={styles.invalid}>*</span></Form.Label>
                <Form.Control as="textarea" rows="2" value={post.description} name='description' onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese una descripción
                </Form.Control.Feedback>
            </Form.Group>

            <Col className="text-center" md={{ span: 6, offset: 3 }}>
                <Form.Label>Imagen</Form.Label>
                <div>
                    <Image src={post.image} thumbnail fluid />
                </div>

            </Col>

            <Form.Group controlId="formBasicPais">
                <Form.Label>País <span style={styles.invalid}>*</span></Form.Label>
                <SearchCountry onSelect={handleSelectCountry}  />
                <Form.Control.Feedback type="invalid">
                    {mensaje.country}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPais">
                <Form.Label>Marca la ubicación en el mapa (Latitud: {post.location.lat}. Longitud: {post.location.lng})</Form.Label>
                <LeafletPicker latlng={post.location} onLocationChange={handleLocationChange} />
            </Form.Group>

            <Form.Group controlId="formBasicTags">
                <Form.Label>Categorias</Form.Label>
                {post.tags.map((tag, i) => {
                    return <Badge key={i} variant="secondary" style={{ margin: '0 5px' }}>{tag}</Badge>
                })}
                <Tags onSelect={handleSelectTag} />
            </Form.Group>



            <div className="text-center">
                <Button variant="light" onClick={() => setPost({ tags: [] })} size="md">Limpiar</Button>{' '}{' '}
                <Button variant="primary" type="submit" size="md">Publicar</Button>
            </div>

            <Col md={12} style={styles.toast}>
                <Toast onClose={() => setShow(false)} show={show} delay={8000} autohide >
                    <Toast.Header>
                        <strong className="mr-auto">Articulo Creado</strong>
                        <small>recién</small>
                    </Toast.Header>
                    <Toast.Body>Has creado tu articulo. En un rato podras verlo en el mapa.</Toast.Body>
                </Toast>
            </Col>


            <Form.Text className="text-muted text-center">
                Al enviar estás aceptando los  Términos y Condiciones de Uso
            </Form.Text>

        </Form>

    );
}

const styles = {
    invalid: {
        width: '100%',
        marginTop: '.25rem',
        fontSize: '80%',
        color: '#dc3545'
    },
    toast: {
        position: 'absolute',
        bottom: 10,
        right: 0
    }
}

export default FormPublishArticle;