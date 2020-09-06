import React, { useContext } from 'react';
// import Article from './Article'
import ArticlesContext from '../components/context/articlesContext'

const ListArticle = () => {

    const {articles, expanded} = useContext(ArticlesContext)

    const articlesFiltered = articles.filter((art => art.subtype === "7"))

    const renderArticles = articles => {
        //Si el usuario presiono el botón ver mas articulos, se muestran todos, sino solo los primeros 8
        const articlesToShow = expanded ? articles : articles.slice(0, 8);
        return articlesToShow.map(article => {
            return <></>
        })
    }

    return (
        <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
            {articlesFiltered.length === 0 && <p className="row">No se han encontrado articulos</p>}
            {renderArticles(articlesFiltered)}
            <div className="transparency" ></div>
        </section>
    )

};

export default ListArticle;