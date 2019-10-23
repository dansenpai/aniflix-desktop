import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-wrapper is-hidden-mobile">
        <div className="logo">
          <Link to="/">
            <span className="title has-text-white">Anime Planet</span>
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/anime/daniel">Favoritos</Link>
            </li>
            <li>Downloads</li>
            <li>Chat</li>
            <li>Meu Perfil</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
