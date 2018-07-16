import React, { Component }  from 'react'
import { Switch, Route } from 'react-router-dom'
import { Game } from "./Game";
import { InviteFriend } from "./InviteFriend";

export class Main extends Component {

  render() {
    // В зависимости от значения  this.props.redirect рендерим Game или InviteFriend
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => ( 
              this.props.redirect?(<Game{...props} socket={this.props.socket} roomID={this.props.room}  secondPlayer={this.props.secondPlayer}/>):(<InviteFriend  {...props} roomID={this.props.room}  createGame ={this.props.createGame}/>)
          )}/>
          <Route path='/:roomID' render={(props) => (
              <Game {...props}  socket={this.props.socket} roomID={this.props.room} secondPlayer={this.props.secondPlayer}/>
          )}/>
        </Switch> 
      </main>
        )
      }
}
export default Main;