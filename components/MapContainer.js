import { useState, useContext } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap'
// import { Map, GoogleMap  } from 'google-maps-react';

import GoogleMap from './GoogleMap';
import Marker from './Marker';
import GlobalContext from './context/globalContext';


/*

//https://github.com/google-map-react/google-map-react
//https://github.com/google-map-react/google-map-react-examples/blob/master/src/examples/MarkerInfoWindow.js
//https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_simple/simple_map_page.jsx
//https://google-map-react.github.io/google-map-react/map/distance_hover
//https://github.com/google-map-react/old-examples/blob/master/web/flux/components/examples/x_events/events_map_page.jsx
*/

const MapContainer = props => {
    const { postsClone, setPostsClone } = useContext(GlobalContext)
    const [modalShow, setModalShow] = useState(false);

    const handleCloseInfo = (idPlace) => {
        onChildClickCallback(idPlace)
    };

    const handleLeerNotaClick = (idPlace) => {
        setModalShow(!modalShow)
    };

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };

    // onChildClick callback can take two arguments: key and childProps
    const onChildClickCallback = (key) => {
        console.log(key)
        setPostsClone(postsClone => {
            return postsClone.map(p => p.id === key ? { ...p, show: !p.show } : { ...p, show: false });
        });
    };

    const onMapClick = ({x, y, lat, lng, event}) => {
        setPostsClone(postsClone => {
            return postsClone.map(p => true && { ...p, show: false });
        });
       
    };

    return (
        <>
            <GoogleMap
                defaultZoom={2}
                defaultCenter={[-34.590305, -58.504212]}
                onChildClick={onChildClickCallback}
                onClick={onMapClick}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                {postsClone && postsClone.map((post) => (
                    <Marker
                        key={post.id}
                        lat={post.lat}
                        lng={post.lng}
                        show={post.show}
                        post={post}
                        clickable={true}
                        onCloseClick={handleCloseInfo}
                        onLeerNota={handleLeerNotaClick}
                    />
                ))}
            </GoogleMap>
        </>

    );
}

export default MapContainer