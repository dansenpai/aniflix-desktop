import React from "react";
import "./styles.css";

const Episodios = props => {
  const { episodios } = props;

  return (
    <div>
      <div className="episodio-list">
        {episodios.map((episodio, index) => (
          <div
            key={index}
            className="episodio-list-item"
            onClick={() => props.playEpisodio(episodio, index)}
          >
            <img src="https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/play-icon-14-256.png" />
            <span>{episodio.Nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodios;
