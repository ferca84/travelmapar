import React, { useEffect, useState } from 'react'
import Head from 'next/head'
// import {Entity, Scene} from 'aframe-react';

const arPage = (props) => {
  const [appRendered, setAppRendered] = useState(false)
  const [color, setColor] = useState('red')

  useEffect(() => {
    //require('aframe')
    setAppRendered(true)
  })

  const changeColor = () => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    setColor(
      colors[Math.floor(Math.random() * colors.length)]
    );
  }

  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
        <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
      </Head>
      {
        appRendered &&
        <a-scene
          vr-mode-ui="enabled: false"
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
        >
          <a-text
            value="HOLA FER QUERIDOOOOOOOOOo. MIRAME EN CUENCA"
            look-at="[gps-camera]"
            scale="50 50 50"
            gps-entity-place="latitude: -34.590887; longitude:-58.504165;"
          ></a-text>
            <a-text
            value="HOLA FER QUERIDOOOOOOOOOo. MIRAME EN JOSE CUBAS"
            look-at="[gps-camera]"
            scale="50 50 50"
            gps-entity-place="latitude: -34.590901; longitude:-58.503977;"
          ></a-text>
          <a-camera gps-camera rotation-reader> </a-camera>
        </a-scene>

      }



    </div>
  )
}


export default arPage

/*
 <a-assets>
                <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
                <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
              </a-assets>

              <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
              <Entity primitive="a-light" type="ambient" color="#445451"/>
              <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
              <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>


              <Entity id="box"
                geometry={{primitive: 'box'}}
                material={{color: color, opacity: 0.6}}
                animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
                animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
                position={{x: 0, y: 1, z: -3}}
                events={{click: changeColor}}>
                <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                        geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                        material={{color: '#24CAFF'}}/>
              </Entity>

               <Scene  vr-mode-ui="enabled: false"
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;">




              <Entity primitive="a-camera" gps-camera rotation-reader>
              <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} look-at="[gps-camera]"  gps-entity-place="latitude: -34.590887; longitude:-58.504165;"/>
                </Entity>

            </Scene>

 <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
            <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
            <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>

             <a-scene
            vr-mode-ui="enabled: false"
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
            >
            <a-text
                value="This content will always face you."
                look-at="[gps-camera]"
                scale="50 50 50"
                gps-entity-place="latitude: -34.590887; longitude:-58.504165;"
            ></a-text>
            <a-camera gps-camera rotation-reader> </a-camera>
            </a-scene>

*/