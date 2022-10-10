import React, { Component } from 'react';
// import logo from './logo.svg';
import Pages from './pages/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2>Employee Dashboard</h2>

        <Pages/>
        {/* <div className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* </div> */}
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}

export default App;
