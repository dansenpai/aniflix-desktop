import React, {Component} from 'react';
// import {debounce} from 'lodash';
import './styles.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="search-input-wrapper">
        <input value={this.props.value} onChange={this.props.onChange} placeholder="Buscar animes" className="search-input"></input>
      </div>
    )
  }
}

export default SearchBar;
