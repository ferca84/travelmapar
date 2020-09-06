const { default: InfoWindow } = require("./InfoWindow");
import styles from './Marker.module.css'

const truncate = (text = '', maxChar) => {
    return text.length > maxChar ? `${text.substr(0, maxChar - 1)}...` : text;
}

const Marker = ({ show, post, onCloseClick, onLeerNota }) => {

    return (
        <div className={styles.marker} >
            <div >
                <img className={styles.image} src={post.author.thumbnail} alt="foto del usuario" width="36" height="36" />
            </div>
            <span className={styles.speechBubble}>{truncate(post.title, 40)}</span>
            {show && <InfoWindow onCloseClick={onCloseClick} onLeerNota={onLeerNota} post={post} />}
        </div>
    );
};

export default Marker;