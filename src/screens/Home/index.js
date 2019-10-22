import React, {Component} from 'react';
import './styles.css';
import AnimesBar from '../../components/AnimesBar';
import Sidebar from '../../components/Sidebar';
import {getLancamentos, searchByName} from '../../requests/animes';
import SearchBar from '../../components/SearchBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: [],
      lastSearch: localStorage.getItem('lastSearch') || '',
      lastSearchItems: JSON.parse(localStorage.getItem('lastSearchItems')) || [],
    }

    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount(){
    if(this.state.lastSearch) {
      const animes = this.state.lastSearchItems;
      this.setState({animes});
    } else {
      const animes = await getLancamentos();
      this.setState({animes})
    }
  }

  async onChange(event) {
    let text = event.target.value;
    this.setState({lastSearch: text});
    if(text.length > 3) {
      const animes = await searchByName(text);
      this.setState({animes});
      localStorage.setItem('lastSearch', text);
      localStorage.setItem('lastSearchItems', JSON.stringify(animes));
    } else {
      const animes = await getLancamentos();
      this.setState({animes});
      localStorage.removeItem('lastSearch');
      localStorage.removeItem('lastSearchItems');
    }
  }

  render() {
    return (
      <div>
        <Sidebar />
        <SearchBar value={this.state.lastSearch} onChange={this.onChange}/>
        <div className="container">
          <h1>Lançamentos</h1>
          <AnimesBar animes={this.state.animes} />
        </div>
      </div>
    )
  }
}

export default Home;
