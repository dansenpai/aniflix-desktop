import React from "react";
import Sidebar from "../Sidebar";
import "./styles.css";

class BaseScreen extends React.Component {
  render() {
    return (
      <div className="main">
        <Sidebar />
        <div className="main-content">{this.props.children}</div>
      </div>
    );
  }
}

export default BaseScreen;
