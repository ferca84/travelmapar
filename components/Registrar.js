import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import FormInput from './FormInput';
import paises from '../../utils/paises'
import { connect } from 'react-redux';
import {register} from '../store/actions/user.action'
import { ToastContainer } from 'react-toastify';
import { validarMail } from '../../utils/funcionesUtiles';
import ReactGA from 'react-ga';
import { Translate } from "react-localize-redux";

const Registrar = (props) => {

    ReactGA.initialize('UA-54854159-9');

    const [formulario, setFormulario] = useState({  usuario: '', password: '', email: '', 
                                                    pais: '', avatar: '' });

    const [mensaje, setMensaje] = useState('');

	const handleChange = (event) => {
		event.persist()
		setFormulario(prevState => {
			return { ...prevState, [event.target.id]: event.target.value }
		  });
    }
    
    const handleFoto = (event) => {
        event.persist()
        setFormulario(prevState => {
			return { ...prevState, [event.target.id]: event.target.files[0] }
		  });
		//setFoto(event.target.files[0]);
	}
	
	const handleSubmit = (event) => {
        event.preventDefault();

        if (!handleValidation(formulario))
            return;
        
        var formData = new FormData();
        Object.keys(formulario).forEach((key) => {
            formData.append(key, formulario[key]);  
        });

        props.register(formData);
        setFormulario({  usuario: '', password: '', email: '', pais: '', avatar: '' });
        setMensaje('');

        ReactGA.event({
            category: 'Usuarios',
            action: 'Registro'
        });
    }
    
    const handleValidation = (formulario) => {


        let formIsValid = true;

        //Campos vacios
        if(!formulario.usuario || !formulario.email || !formulario.password || !formulario.pais){
           formIsValid = false;
           setMensaje("Hay campos obligatorios sin completar");
           return;
        }

        //Email
        if(!validarMail(formulario.email)) {
            formIsValid = false;
            setMensaje("El formato del mail es inadecuado");
            return;
        }

        if(formulario.password.length < 5){
            formIsValid = false;
            setMensaje("El password debe tener al menos 5 caracteres");
            return;
         }

       return formIsValid;
   }
    

    return (
        <section id="content">

			<div className="content-wrap nopadding">

				<div className="section nopadding nomargin divFondoLogin"></div>

				<div className="section nobg full-screen nopadding nomargin">
					<div className="container vertical-middle divcenter clearfix" style={{'margin': '50px 0'}}>

						<div className="panel panel-default divcenter noradius noborder divPanelLogin" >
							<div className="panel-body" >
								<form id="register-form" name="login-form" className="nobottommargin" >
									<h3><Translate id="registrarse">Registrarse</Translate></h3>

                                    <FormInput label={<Translate id="registracion.usuario">Usuario:*</Translate>} onChange={handleChange} type="text" name="usuario" value={formulario.usuario} />

                                    <FormInput label="Password:* (min 5 caracteres)" onChange={handleChange} type="password" name="password" value={formulario.password} />

                                    <FormInput label="Email:*" onChange={handleChange} type="email" name="email" value={formulario.email} />

                                    <div className="col_full">
										<label htmlFor="login-form-username"><Translate id="registracion.usuario">Pais:*</Translate></label>
										<select id="pais" onChange={handleChange} className="select-hide form-control bottommargin-sm" value={formulario.pais} name="pais">
                                            <option value="">Seleccione su pais</option>
                                            {
                                                paises.map((p) => {
                                                    return <option key={p.code} value={p.code}>{p.name}</option>
                                                })
                                            }
                                        </select>
									</div>

                                        <FormInput label={<Translate id="registracion.usuario">Foto: (opcional)</Translate>} onChange={handleFoto} type="file" name="avatar" accept="image/*"  />                                   

									<div className="col_full nobottommargin" style={{textAlign: 'center', marginTop: '20px'}}>
										<button onClick={handleSubmit} className="button button-3d button-black nomargin" id="login-form-submit" name="login-form-submit" value="login"><Translate id="registrarse">Registrarse</Translate></button>	
									</div>
								</form>

                                <Link to="/login" className="linksFormularios">Login</Link>

                                <Link to="/recupero-password" className="linksFormularios"><Translate id="olvidarPassword">¿Olvidaste tu Password?</Translate></Link>
                                
                                <p style={{color: 'red'}}>{mensaje}</p>

							</div>
						</div>

					</div>
				</div>
			</div>
            <ToastContainer />
        </section>
    )
}

export default connect(null, {register})(Registrar)
