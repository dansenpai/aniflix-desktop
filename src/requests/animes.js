import axios from 'axios';
const url_base = "http://aniflix-api.herokuapp.com/";

export const getByLetter = (letter, skip = 0 ) => {
  return new Promise((resolve, reject) => {
    axios.get(url_base + `animes/${letter}?skip=${skip}`)
      .then(response => {
        resolve(response.data);
      }).catch(erro => reject(erro));
  })
};

export const getLancamentos = (letter, skip = 0 ) => {
  return new Promise((resolve, reject) => {
    axios.get(url_base + 'lancamentos')
    .then(response => {
      resolve(response.data);
    }).catch(erro => reject(erro));
  })
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    axios.get(url_base + 'api/categoria')
    .then(response => {
      resolve(response.data)
    }).catch(erro => reject(erro));
  });
};

export const getMoreViewed = () => {
  return new Promise((resolve, reject) => {
    axios.get(url_base + '/odata/Animesdb?%24select=Id%2CNome%2CImagem%2CRank&%24orderby=Rank%20desc&%24skip=0&%24inlinecount=allpages')
    .then(response => {
      resolve(response.data);
    }).catch(erro => reject(erro));
  });
};

export const getAnimeById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(url_base + `odata/Animesdb?$filter=Id%20eq%20${id}`)
    .then(anime => {
      axios.get(url_base + 'api/episodioexes/' + anime.data.value[0].Id)
      .then(episodios => {
        resolve({anime: anime.data, episodios: episodios. data});
      }).catch(erro => reject(erro));
    });
  });
};

export const getEpisodesById = (id) => {
  return  new Promise((resolve, reject) => {
    axios.get(url_base + 'api/episodioexes/' + id)
    .then(response => {
      resolve(response.data);
    }).catch(erro => reject(erro));
  });
};

export const searchByName = (name, skip = 0) => {
  return  new Promise((resolve, reject) => {
    axios.get(url_base + `search/${name}`)
    .then(response => {
      console.log(response);
      resolve(response.data.value);
    }).catch(erro => reject(erro));
  });
};

export const getLinkByEpisodeId = (id) => {
  return  new Promise((resolve, reject) => {
    axios.get(url_base + 'api/episodioexes/links?id='+id)
    .then(response => {
      resolve(response.data);
    }).catch(erro => reject(erro));
  });
};

