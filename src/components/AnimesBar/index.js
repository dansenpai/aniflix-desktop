import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

class AnimesBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animes-container">
        {this.props.animes.map(anime => (
          <Link to={`/anime/${anime.Id}`} key={anime.Id} className="anime">
            <img className="anime-imagem" src={anime.Imagem}></img>
            <div className="anime-nome">{anime.Nome}</div>
          </Link>
        ))}
      </div>
    )
  }
}

export default AnimesBar;
