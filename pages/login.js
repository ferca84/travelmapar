import React, { useEffect, useState } from 'react'

import { Card, Form, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import FormLogin from '../components/formLogin';
import GlobalProvider from "../components/context/globalContext";
import { onAuthStateChanged } from '../firebase/client';
// import ReactGA from 'react-ga';

const loginPage = (props) => {
/*
	const [user, setUser] = useState(null)

	useEffect(() => {
		 onAuthStateChanged(setUser)
	}, [])
	value={{ user, setUser }}
*/
	return (
		<GlobalProvider.Provider  >
			<Layout>
				<FormLogin />
			</Layout>
		</GlobalProvider.Provider>
	)
}


export default loginPage
