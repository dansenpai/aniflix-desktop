import React from "react";
import Sidebar from "../../components/Sidebar";
import { Link, withRouter } from "react-router-dom";
import { getAnimeById, getLinkByEpisodeId } from "../../requests/animes";
import BaseScreen from "../../components/BaseScreen";
import Episodios from "../../components/Episodios";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Player } from "video-react";
import "./styles.css";

const tabList = [
  { name: "episodios", label: "Episódios" },
  { name: "personagens", label: "Personagens" },
  { name: "galeria", label: "Galeria" },
  { name: "comentarios", label: "Comentários" }
];

class AnimeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.player = {};
    this.interval;
    this.state = {
      anime: {
        Imagem: "",
        Desc: ""
      },
      episodios: [],
      episodioIndex: 0,
      activeEpisodio: {},
      episodioLinks: [],
      activeLink: "",
      playing: false,
      activeTab: "episodios",
      showModal: false
    };

    this.changeQuality = this.changeQuality.bind(this);
    this.nextEpisode = this.nextEpisode.bind(this);
    this.backEpisode = this.backEpisode.bind(this);
    this.playEpisodio = this.playEpisodio.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const anime = await getAnimeById(id);
    this.setState({ anime: anime.anime, episodios: anime.episodios });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  async playEpisodio(episodio, index) {
    const episodioLinks = await getLinkByEpisodeId(episodio.Id);
    this.setState({
      playing: true,
      episodioLinks,
      activeLink: episodioLinks[1] && episodioLinks[1].Endereco ? episodioLinks[1].Endereco :  episodioLinks[0].Endereco,
      activeEpisodio: episodio,
      episodeIndex: index,
      showModal: true
    });
    this.player.load(this.state.activeLink);
    this.getEnd();
    
  }

  getEnd() {
    this.interval = setInterval(() => {
      console.log('iniciada contagem')
      if(this.player.getState().player.ended){
        this.nextEpisode();
        clearInterval(this.interval);
        console.log('removida contagem');
      }
    }, 1000);
  }

  nextEpisode() {
    const index = this.state.episodeIndex - 1;
    if (index <= -1) {
      return false;
    }
    this.playEpisodio(this.state.episodios[index], index);
    this.player.load(this.state.activeLink);
  }

  backEpisode() {
    const index = this.state.episodeIndex + 1;
    if (index >= this.state.episodios.length) {
      return false;
    }
    this.playEpisodio(this.state.episodios[index], index);
    this.player.load(this.state.activeLink);
  }

  changeQuality(event) {
    const item = event.target.value;
    this.setState({ activeLink: item });
    this.player.load(this.state.activeLink);
  }

  renderTab() {
    const { episodios, activeTab } = this.state;
    switch (activeTab) {
      case "episodios":
        return (
          <Episodios playEpisodio={this.playEpisodio} episodios={episodios} />
        );
      case "personagens":
        return <div>Personagens</div>;
      case "comentarios":
        return <div>Comentários</div>;
      case "galeria":
        return <div>Galeria</div>;
    }
  }

  handleClose() {
    this.player.pause();
    this.setState({ showModal: false });
  }

  render() {
    const { anime, activeTab, showModal } = this.state;
    return (
      <BaseScreen>
        <div className="anime-title">
          <Link className="back-button" to="/">
            <FaChevronLeft />
          </Link>
          <h1 className="title has-text-white">{anime.Nome}</h1>
        </div>

        <div className="anime-detail-content columns is-mobile is-multiline">
          <div className="column is-3-desktop is-5-tablet is-12-mobile">
            <div className="anime-detail">
              <img className="anime-detail-image" src={anime.Imagem} />
              <p className="description">{anime.Desc}</p>
            </div>
          </div>

          <div className="column is-9-desktop is-7-tablet is-12-mobile">
            <div className="tabs is-medium">
              <ul>
                {tabList.map(tab => (
                  <li
                    key={tab.name}
                    className={activeTab === tab.name ? "is-active" : ""}
                    onClick={() => this.setState({ activeTab: tab.name })}
                  >
                    <a>{tab.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            {this.renderTab()}
          </div>
        </div>

        <div className={`modal ${showModal ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-content">
            {this.state.episodioLinks && this.state.playing && (
              <div className="player-content">
                <label>Alterar qualidade</label>
                <div className="select">
                  <select name="active-link" onChange={this.changeQuality}>
                    {this.state.episodioLinks.map(link => (
                      <option value={link.Endereco} key={link.Id}>
                        {link.Nome}
                      </option>
                    ))}
                  </select>
                </div>
                <h2 className="subtitle has-text-white">
                  {this.state.activeEpisodio.Nome}
                </h2>
                <Player
                  autoPlay
                  ref={(player) => this.player = player}
                >
                  <source src={this.state.activeLink} />
                </Player>
                <br></br>
                <div className="control-buttons">
                  <button className="button" onClick={this.backEpisode}>
                    <span className="icon">
                      <FaChevronLeft />
                    </span>
                    <span>Anterior</span>
                  </button>

                  <button
                    className="button is-danger"
                    onClick={this.nextEpisode}
                  >
                    <span>Próximo</span>
                    <span className="icon">
                      <FaChevronRight />
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={this.handleClose}
            className="modal-close is-large"
            aria-label="close"
          ></button>
        </div>
      </BaseScreen>
    );
  }
}

export default withRouter(AnimeDetail);
