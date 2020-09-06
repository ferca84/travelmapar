import React, { useState, useEffect, createRef } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet-universal'

const LeafletPicker = props => {

    const [hasLocation, setHasLocation] = useState(false)
   
    const mapRef = createRef()

    const handleClick = (e) => {
        console.log(e.latlng)
        const map = mapRef.current
        if (map != null) {
            props.onLocationChange(e.latlng)
            map.leafletElement.locate()
        }
    }

    const handleLocationFound = (e) => {
        //setHasLocation(true)
        //props.onLocationChange(e.latlng)
        //setLatlng(e.latlng)
    }

    return (
            <Map
                style={{width: '100%',height: '400px'}}
                center={props.latlng}
                length={4}
                onClick={handleClick}
                onLocationfound={handleLocationFound}
                leafletRef={mapRef}
                zoom={6}>
                {() => {
                    // const MarkerClusterGroup = require('react-leaflet-markercluster').default;
                    const L = require('leaflet');

                    const myIcon = L.icon({
                        iconUrl: '/images/marker-icon.png',
                        iconRetinaUrl: '/images/marker-icon.png',
                        iconAnchor: [5, 55],
                        popupAnchor: [10, -44],
                        iconSize: [25, 45],
                        shadowUrl: '/images/marker-shadow.png',
                        shadowSize: [80, 75],
                        shadowAnchor: [20, 82]
                    });

                    return (
                        <>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker icon={myIcon} position={props.latlng}>
                                <Popup>
                                    <span>Has marcado este punto</span>
                                </Popup>
                            </Marker> 
                        </>
                    );
                }}
            </Map>
    )
}

export default LeafletPicker;