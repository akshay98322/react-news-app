import './App.css';
import React,  {useState}  from 'react'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Navbar from './components/Navbar';
import News from './components/News';


export default function App() {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const pageSize = 8;
  const [progress, setProgress] = useState(0);

  return (
    <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Navbar />
        <Switch>
          <Route exact key="general"  path="/"><News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="general"/></Route>
          <Route exact key="business"  path="/business"><News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="business"/></Route>
          <Route exact key="entertainment" path="/entertainment"><News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="entertainment"/></Route>
          <Route exact key="general" path="/general"><News  apiKey={apiKey}setProgress={setProgress} pageSize={pageSize} country="in" category="general"/></Route>
          <Route exact key="health" path="/health"><News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="health"/></Route>
          <Route exact key="science"  path="/science"><News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="science"/></Route>
          <Route exact key="sports" path="/sports"><News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="sports"/></Route>
          <Route exact key="technology"  apiKey={apiKey} path="/technology"><News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} country="in" category="technology"/></Route>
        </Switch>
           
        </Router>     
      </div>
  )
}

