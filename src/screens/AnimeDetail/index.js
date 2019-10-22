import React from 'react';
import Sidebar from '../../components/Sidebar';
import {Link} from 'react-router-dom';

class AnimeDetail extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="container">
          <Link to="/">Voltar</Link>
        </div>
      </div>
    )
  }
}

export default AnimeDetail;
