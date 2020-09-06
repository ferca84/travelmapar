import React, { useEffect, useState } from 'react'
import Head from 'next/head'


const arPage = (props) => {

	return (
        <div>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
            <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
            <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
        </Head>

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

      </div>
	)
}


export default arPage