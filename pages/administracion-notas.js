import GlobalContext from "../components/context/globalContext";
import { getPosts } from '../lib/api'
import Layout from '../components/Layout';
import TableroDeControl from "../components/Admin/TableroDeControl";
import BarraOpciones from "../components/Admin/BarraOpciones";
import TablaTurnos from "../components/Admin/TablaTurnos";



const administracionNotas = ({ posts }) => {

    return (
        <Layout>
            <GlobalContext.Provider value={{ posts }}>
                <TableroDeControl />
                <BarraOpciones />
                <TablaTurnos />
            </GlobalContext.Provider>
        </Layout>
    )
}

//function que es llamada en cada request de la página. Solo será renderizada cuando esten los datos (mejor para el SEO)
export async function getStaticProps(context) {
    const articles = await getPosts();
    // Le envio a la página los articulos via props
    return { props: { posts } }
}

export default administracionNotas