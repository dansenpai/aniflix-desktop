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
    axios.get(url_base + `anime/${id}`)
    .then(response => {
      resolve({anime: response.data.anime.value[0], episodios: response.data.episodios});
    }).catch(erro => reject(erro));
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
    axios.get(url_base + 'links/'+id)
    .then(response => {
      resolve(response.data);
    }).catch(erro => reject(erro));
  });
};

var query = `
  query($search: String) {
    Media(search: $search, type: ANIME){
      title{
        english
        native
      }
      episodes
      startDate {
        year
        month
        day
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
    }
  }
`;

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
  console.log(data)
    return data.data.Media;
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

export const getAnilistData = (name) => {
  var variables = {
    search: name
  };
  
  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };
    
  
  console.log(variables)
  // Make the HTTP Api request
  return fetch(url, options).then(handleResponse)
                     .then(handleData)
                     .catch(handleError);
}
