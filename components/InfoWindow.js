import { Button, Card } from 'react-bootstrap'
import styles from './InfoWindow.module.css'

const InfoWindow = (props) => {
    const { post } = props;

    const handleClose = () => {
        props.onCloseClick(post.id);
    }

    const handleAgendar = () => {
        props.onAgendarClick(post.id);
    }

    return (
        <Card className={styles.infoWindowStyle} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={post.image} />
            <span className={styles.btnCancel} onClick={handleClose}>
                <i className="icon-g icon-g-close">x</i>
            </span>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text className={styles.postingInfo}>
                    {post.description}
                </Card.Text>
                <Button variant="success" className={styles.btnLeerNota} onClick={handleAgendar}>Ir al Blog</Button>
            </Card.Body>
            <Card.Footer className={styles.postingAutor}>
                <small className="text-muted">Por: {post.author.name}</small>
            </Card.Footer>
        </Card>
       
    );
};

export default InfoWindow;

/*
 <div className={styles.infoWindowStyle} >
            <span className={styles.btnCancel} onClick={handleClose}>
                <i className="icon-g icon-g-close">X</i>
            </span>
            <div className="slide-content is-selected" >
                <img src={post.image} width='300' alt="1728661775.jpg" className="flickity-lazyloaded" />
            </div>
            <div className={styles.contenedor}>
                <div className={styles.postingTitle}>
                    <span>{post.title}</span>
                </div>
                {/*<div className="text-center">
                    <img src="http://0.gravatar.com/avatar/0671e6fd4bbee3b67bbdc83f5c0812cf" alt="logo publisher" />
                    <span>El Prisma de Fer</span>
                </div>
                <div>
                    <span className={styles.postingInfo}>{post.description}</span>
                </div>
                <div>
                    <span className={styles.postingAutor}>Autor: {post.author.name}</span>
                </div>
            </div>
            <div className="text-center">
                <Button className={styles.btnLeerNota} variant="success" onClick={handleAgendar}>
                    Leer Nota
                </Button>
            </div>
        </div>


*/