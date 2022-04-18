import './App.css';
import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  apiKey =process.env.REACT_APP_NEWS_API_KEY;
  pageSize = 8;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Navbar />
        <Switch>
          <Route exact key="general"  path="/"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="general"/></Route>
          <Route exact key="business"  path="/business"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="business"/></Route>
          <Route exact key="entertainment" path="/entertainment"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="entertainment"/></Route>
          <Route exact key="general" path="/general"><News  apiKey={this.apiKey}setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="general"/></Route>
          <Route exact key="health" path="/health"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="health"/></Route>
          <Route exact key="science"  path="/science"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="science"/></Route>
          <Route exact key="sports" path="/sports"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="sports"/></Route>
          <Route exact key="technology"  apiKey={this.apiKey} path="/technology"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="technology"/></Route>
        </Switch>
           
        </Router>     
      </div>
    )
  }
}
