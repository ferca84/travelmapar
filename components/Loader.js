import React from 'react'
import loaderGif from '../../imagenes/loader3.gif'

const Loader = (props) => {
    return (
      <div className="loader">
          <p>
            <img src={loaderGif} alt="Cargando..." />
          </p>
            
           
      </div>
    );
}

export default Loader
