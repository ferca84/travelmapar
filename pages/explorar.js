import React, { useState, useEffect } from 'react'
import GlobalProvider from "../components/context/globalContext";
import { getPosts, getCountries, getTags } from '../lib/api'
import Layout from '../components/Layout';
import MapContainer from '../components/MapContainer';

import { Row, Col } from 'react-bootstrap';
import FiltrosMap from '../components/FiltrosMap';


const postsMapPage = ({ posts, countries, tags }) => {

    const [expanded, setExpanded] = useState(false);
    const [postsClone, setPostsClone ] = useState(posts);
    const [filters, setFilters] = useState([]);

    const handleClickAplicar = event => {
        let postFiltered = posts;
        if (filters.length > 0) {
            postFiltered = posts.filter(post => filters.some(fil => 
                    (fil.type === 'country' && post.pais.name === fil.name) || 
                    (fil.type === 'tag' && post.tags.includes(fil.name)) 
                )
            );
            setPostsClone(postFiltered)
        } else {
            setPostsClone(posts)
        }
    };

    useEffect(() => {
        handleClickAplicar();
    }, [filters]);

    return (
        <Layout>
            <GlobalProvider.Provider value={{ postsClone, setPostsClone, expanded, setExpanded, countries, tags }}>
                
                <section>
                <Row>
                    <Col md={2} xs={0}>
                        <FiltrosMap 
                            filters={filters} 
                            setFilters={setFilters} 
                            onClickAplicar={handleClickAplicar}
                        />
                    </Col>
                    <Col md={10} xs={12}>
                        <MapContainer />
                    </Col>
                   
                </Row>
                   
                </section>
               
            </GlobalProvider.Provider>
        </Layout>
    )
}

//function que es llamada en cada request de la página. Solo será renderizada cuando esten los datos (mejor para el SEO)
export async function getStaticProps(context) {
    const posts = await getPosts();
    const countries = await getCountries();
    const tags = await getTags();
    // Le envio a la página los articulos via props
    return { props: { posts, countries, tags } }
}

export default postsMapPage