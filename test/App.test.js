import { shallow, mount } from 'enzyme'
import React from "react";

import Title from "../components/Title.js";
import SidebarMain from '../components/SidebarMain.js';
import {data} from './dummy-articles'
import ArticlesContext from '../components/context/articlesContext.js';
import TagsMenu from '../components/TagsMenu.js';
import TagItem from '../components/TagItem.js';
import ListArticle from '../components/ListArticle.js';
import Article from '../components/Article.js';
import { dateConvertByHand } from '../utils/functions.js';



describe("<Conversor de Fecha>", () => {
  it('>>>> Deberia mostrar la fecha en el formato esperado', () => {
    const input = "2020-05-14";
    const output = "14 de Mayo de 2020";
    expect(dateConvertByHand(input)).toEqual(output);
  });
});

describe("<SidebarMain>", () => {
    it('>>>> Deberia tener un titulo que diga "Acumulado Grilla"', () => {
      const wrapper = shallow(<SidebarMain />);
  
      expect(wrapper.contains(<Title>Acumulado Grilla</Title>)).toEqual(true);
    });
  });

describe("<TagsMenu>", () => {
    it(">>>> Deberia haber 10 Tags", () => {
        const wrapper = mount(
        <ArticlesContext.Provider value={{articles: data.articles }}>
            <TagsMenu />
          </ArticlesContext.Provider>);

        expect(wrapper.find(TagItem)).toHaveLength(10);
      });

     it(">>>> Deberia ser Huevo el primer Tag", () => {
        const wrapper = mount(
        <ArticlesContext.Provider value={{articles: data.articles }}>
            <TagsMenu />
        </ArticlesContext.Provider>);

        expect(wrapper.find(TagItem).first().props().slug).toBe("huevo-tid47236");
      });
  });

  describe("<ListArticle>", () => {
    it(">>>> Deberia haber 8 Articulos primero", () => {
        const wrapper = mount(
        <ArticlesContext.Provider value={{articles: data.articles }}>
            <ListArticle />
          </ArticlesContext.Provider>);

        expect(wrapper.find(Article)).toHaveLength(8);

      });

  });
  

