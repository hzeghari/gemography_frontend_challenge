import React, { Component } from 'react';
import './index.css';
import FetchRepos from "./components/FetchRepos";

class App extends Component{
  state={

  };

  render(){
    return(
      <div>
        <FetchRepos />
      </div>
    );
  }
}

export default App;