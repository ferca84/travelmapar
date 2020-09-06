import GlobalContext from "../../components/context/globalContext";
import { getPosts } from '../../lib/api'
import Layout from '../../components/Layout';
import FormPublishArticle from "../../components/FormPublishArticle";
//import { getSlugs } from '../../lib/api';
import { Container, Row, Col } from "react-bootstrap";

export default ({ posts }) => {

    console.log(JSON.stringify(posts))
    return (
        <Layout>
            <GlobalContext.Provider value={{ posts }}>
               
                  <h1>Publicá un articulo {posts} </h1>
               
               <FormPublishArticle />
                
               
            </GlobalContext.Provider>
        </Layout>
    )
  }

//function que es llamada en cada request de la página. Solo será renderizada cuando esten los datos (mejor para el SEO)
export async function getStaticProps({params}) {
    const articles = await getPosts();
    //const { params } = context;
    console.log(JSON.stringify(params))
    // Le envio a la página los articulos via props
    return { props: { articles, posts: params.posts } }
}

export async function getStaticPaths() {
    //Retorna una lista de posibles valores de slug (por ahora dummy slugs)
    const paths = [{
      params: {
        posts: {}
      }
    }];//getSlugs();
    return {
      paths,
      fallback: true,// Habilita generación de paginas staticas adicionales
    }
  }