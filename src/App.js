import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Main from './Main'

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8888",
      room: 0,
      redirect:0
  };
    this.socket = socketIOClient(this.state.endpoint);
    this.secondPlayerJoin = this.secondPlayerJoin.bind(this);
    this.createGame = this.createGame.bind(this);

    // когда подключился второй игрок, редирект первого игрока на игровое поле
    this.socket.on('player1', () => { 
      this.setState({'redirect':1});
    })  
}


// Инициируем новую игру
createGame() {
  this.socket.emit('createGame');
  this.socket.on('newGame', data => {
    this.setState({'room':data.room });
   })
}
  
// Второй  игрок присоединяется
secondPlayerJoin(room) {
  this.setState({"room":room});
    this.socket.emit('joinGame',{'room':room});  
}

  render() {
    return (
      <div>
        <Main socket={this.socket} redirect={this.state.redirect} room={this.state.room} createGame={this.createGame} secondPlayer={this.secondPlayerJoin}/>
      </div>
    )
  }
}
export default App;
