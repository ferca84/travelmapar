import React, { useState } from 'react'
// import SidebarMain from '../components/SidebarMain'
import GlobalContext from "../components/context/globalContext";
import { getPosts } from '../lib/api'
import Layout from '../components/Layout';


const indexPage = ({ post }) => {

    const [expanded, setExpanded] = useState(false)

    return (
        <Layout>
            <GlobalContext.Provider value={{ post, expanded, setExpanded }}>
              {/*   <SidebarMain /> */}
            </GlobalContext.Provider>
        </Layout>
    )
}

//function que es llamada en cada request de la página. Solo será renderizada cuando esten los datos (mejor para el SEO)
export async function getStaticProps(context) {
    const post = await getPosts();
    // Le envio a la página los articulos via props
    return { props: { post } }
}

export default indexPage