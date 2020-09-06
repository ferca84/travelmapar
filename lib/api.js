import React from 'react'
import { posts } from '../test/dummy-posts'
import { countries } from '../test/dummy-countries'
import { tags } from '../test/dummy-tags'
import { API_URL } from './constants';
import { firestore } from "../firebase/admin"

async function fetchAPI(url, options) {

  try {
    const res = await fetch(url, options)

    if (res.status !== 200) {
      return { status: 'error', message: 'Ha ocurrido un error' }
    }

    //res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    const data = await res.json()

    return data;

  } catch (err) {
    console.log('Catch error: ' + err);
  }

}

export async function getPosts() {
  // const data = await fetchAPI(API_URL, { method: 'GET' });
  const data = posts;
  return data;
}

export async function getCountries() {
  // const data = await fetchAPI(API_URL, { method: 'GET' });
  const data = countries;
  return data;
}

export async function getTags() {
  return tags;
  /*const tagsReference = firestore.collection("tags");
  
  return tagsReference
          .get()
          .then(({docs}) => {
            console.log(docs);
            return docs.map(doc => {
              const props = doc.data();
              return {id: doc.id, ...props };
            });
          })
          .catch(err => {
            console.log('Error getting tags', err);
            return [];
          });
*/
}

export async function crawlURL(urlToCrawl) {

  try {
    const urlMetadata = require('url-metadata')
    const metadata = await urlMetadata(urlToCrawl)
    return metadata;

  } catch (err) {
    console.log('Catch error: ' + err.message);
    return { description: '', image: '', title: '', url: '', tags: [], country: '' };
  }

}
/*
export function getSlugs() {
  // Tengo que devolver un array de objetos donde cada uno tenga el parametro slug
  return comercios.map(comercio => {
    return {
      params: {
        comercio: comercio
      }
    }
  })
}*/

