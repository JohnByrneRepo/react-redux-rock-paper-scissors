import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuPage from '../pages/menu'
import GamePage from '../pages/game'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MenuPage} />
            <Route exact path="/game" component={GamePage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}