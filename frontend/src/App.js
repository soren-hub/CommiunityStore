
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";


import 'bootswatch/dist/pulse/bootstrap.min.css';


export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
