import React, { Component } from 'react';
import '../index.css';
import ResultsContainer from '../containers/ResultsContainer';
import Splash from '../components/Splash/Splash';

class App extends Component {
  render() {
    if(this.props.site === "") {
      return <Splash />
    }

    return (
      <div className="App">
        <ResultsContainer site={this.props.site} url='http://localhost:3001/api/results' pollInterval={20000} />
      </div>
    );
  }
}

export default App;