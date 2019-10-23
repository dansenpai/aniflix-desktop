import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

class AnimesBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="columns is-1 is-mobile is-multiline">
        {this.props.animes.map(anime => (
          <div
            className="anime-column column is-2-widescreen is-3-desktop is-4-tablet is-4-mobile"
            key={anime.Id}
          >
            <Link to={`/anime/${anime.Id}`}>
              <div className="anime">
                <img className="anime-imagem" src={anime.Imagem}></img>
                <div className="anime-nome">{anime.Nome}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default AnimesBar;
