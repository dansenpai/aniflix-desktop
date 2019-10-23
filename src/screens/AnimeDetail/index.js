import React from 'react';
import Sidebar from '../../components/Sidebar';
import {Link, withRouter} from 'react-router-dom';
import {getAnimeById, getLinkByEpisodeId} from '../../requests/animes';
import './styles.css';

class AnimeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anime: {
        Imagem: '',
        Desc: ''
      },
      episodios: [],
      episodioIndex: 0,
      activeEpisodio: {},
      episodioLinks: [],
      activeLink: '',
      playing: false
    }

    this.changeQuality = this.changeQuality.bind(this);
    this.nextEpisode = this.nextEpisode.bind(this);
    this.backEpisode = this.backEpisode.bind(this);
  }

  async componentDidMount(){
    const {id} = this.props.match.params
    const anime = await getAnimeById(id);
    this.setState({anime: anime.anime, episodios: anime.episodios})
  }

  async playEpisodio(episodio, index){
    const episodioLinks = await getLinkByEpisodeId(episodio.Id);
    this.setState({playing: true, episodioLinks, activeLink: episodioLinks[0].Endereco, activeEpisodio: episodio, episodeIndex: index});
  }

  nextEpisode(){
    const index = this.state.episodeIndex - 1;
    if(index <= -1) {
      return false;
    };
    this.playEpisodio(this.state.episodios[index], index);
  }

  backEpisode(){
    const index = this.state.episodeIndex + 1;
    if(index >= this.state.episodios.length) {
      return false;
    };
    this.playEpisodio(this.state.episodios[index], index);
  }

  changeQuality(event){
    const item = event.target.value;
    this.setState({activeLink: item});
  }

  render() {
    const {anime, episodios} = this.state;
    return (
      <div>
        <Sidebar />
        <div className="container-player">
          <div>
            <Link to="/">{'< Voltar'}</Link>
            <h1>{anime.Nome}</h1>
            <div className="anime-detail">
              <img className="imagem" src={anime.Imagem} />
              <p className="description">{anime.Desc}</p>
            </div>
          </div>

          <div className="player-padding">
            {this.state.episodioLinks && this.state.playing && (
              <div className="player-content">
                <label>Alterar qualidade</label>
                <select name="active-link" onChange={this.changeQuality}>
                  {this.state.episodioLinks.map(link => (
                    <option value={link.Endereco} key={link.Id}>{link.Nome}</option>
                  ))}
                </select>
                <h2>{this.state.activeEpisodio.Nome}</h2>
                <video autoPlay className="video-player" controls src={this.state.activeLink}></video>
                <br></br>
                <div className="buttons">
                  <div className="next-button" onClick={this.backEpisode}>{'< BACK'}</div>
                  <div className="next-button" onClick={this.nextEpisode}>NEXT ></div>
                </div>
              </div>
            )}

            <h1>Episódios</h1>
            <div className="episodios">
              {episodios.map((episodio, index) => (
                <div key={index} className="anime-square" onClick={() => this.playEpisodio(episodio, index)}>
                  <img src="https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/play-icon-14-256.png" />
                  {episodio.Nome}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AnimeDetail);
