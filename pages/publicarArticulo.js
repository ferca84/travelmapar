import React, { useState, useEffect } from 'react'
import GlobalProvider from "../components/context/globalContext";
import { getCountries, getTags } from '../lib/api'
import Layout from '../components/Layout';
import { Row, Col } from 'react-bootstrap';
import FormPublishArticle from '../components/FormPublishArticle';
import useUser from '../hooks/useUser';
import { useRouter } from 'next/router';


const publicarArticulo = ({ countries, tags }) => {

    const user = useUser();

   /* useEffect(() => {
        !user && router.push("/login")
      }, [])*/

    return (
        <Layout>
            <GlobalProvider.Provider value={{ countries, tags }}>
                <section>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1 className="text-center m-5">Publicar Articulo</h1>
                        <FormPublishArticle user={user} />
                    </Col>
                   
                </Row>
                   
                </section>
                </GlobalProvider.Provider>
        </Layout>
    )
}

//function que es llamada en cada request de la página. Solo será renderizada cuando esten los datos (mejor para el SEO)
export async function getStaticProps(context) {
    const countries = await getCountries();
    const tags = await getTags();
    // Le envio a la página los articulos via props
    return { props: { countries, tags } }
}

export default publicarArticulo