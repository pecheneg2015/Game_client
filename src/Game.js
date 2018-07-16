import React, { Component } from "react";
import { GamePanel } from "./GamePanel";
import { SelectGesturePanel } from "./SelectGesturePanel";
import { Row, Col, Modal, Button } from "react-bootstrap";
import {Redirect} from "react-router"
import { Chat } from "./Chat";

/*
*  Компонент отвечает за отрисовку игрового поля
*/
export class Game extends Component {

  constructor() {
    super();
    this.state = {
      gestures:       ['lizard_icon.jpg','paper_icon.jpg','rock_icon.jpg','scissors_icon.jpg','spock_icon.jpg'],
      defaultIcon:    "question-mark.png", 
      selectedIcons:  ["question-mark.png","question-mark.png"],
      player:         1,
      turn:           0,
      show:           false,
      resultText:     '',
      redirect:       0,
      room:           0};
    this.selectGesture =this.selectGesture.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  componentDidMount() {
      this.props.roomID===0?this.setState({room:this.props.match.params.roomID}):this.setState({room:this.props.roomID})
      
    // При получении playerTurnBroadcast  перерисовываем выбранные иконки
      this.props.socket.on('playerTurnBroadcast', (data) => { 
        let temp = this.state.selectedIcons;
        temp[0]=this.state.gestures[data[0]]
        temp[1]=this.state.gestures[data[1]]
        this.setState({selectedIcons:temp})
    })

    this.props.socket.on('gameResult', (data) => { 
      // При получении gameResult сообщаем информацию о победителе
      let text =''
      if (data!==0){
        text = "Выиграл Игрок "+data;
      }else{text="Ничья "}
      this.setState({resultText:text});
      this.setState({show:true})
    })

    if(this.props.match.params.roomID){
      this.props.secondPlayer(this.props.match.params.roomID);
      this.setState({player:2});}

      this.props.socket.on('restart', (data) => { 
        // При получении restart сбрасываем игровое состояние для повторной игры
        this.setState({selectedIcons:[this.state.defaultIcon , this.state.defaultIcon]})
        this.setState({turn:0});
      })

    this.props.socket.on('err', () => { 
      // При наличии сообщения err от сервера переадресация к созданию новой игры
      this.setState({redirect:1})
    })

  }

  selectGesture(index){
    // если игрок ещё не ходил, подтверждаем выбор фигуры и с помощью playerTurn сообщаем на сервер, что игрок походил
    // после этого меняем состояние turn,чтобы игрок не ходил повторно
    if(this.state.turn===0){     
        let temp = this.state.selectedIcons;
        temp[this.state.player-1]=this.state.gestures[index];
        this.setState({selectedIcons:temp})
        this.props.socket.emit('playerTurn', { player:this.state.player, gesture: index,room:this.state.room });
        this.setState({turn:1});
    }
  }

  handleClose() {
    // При закрытии модального окна отправляем на сервер restartGame информируя, что игрок готов к новой игре. Новая игра начинается когда от обоих игроков поступит данное событие
    this.setState({ show: false });
    this.props.socket.emit('restartGame',{ room:this.state.room });
  }

  render() {
    if(this.state.redirect!==0){
      return (<Redirect to="/" />)
      
    }

      return (
  <Row className="show-grid">

    <Col  xs={12} smOffset={4}  sm={4} mdOffset={3} md={6}>
        <Row>
     <GamePanel selectedIcons={this.state.selectedIcons}/>
     </Row>
     <Row>
     <SelectGesturePanel gestures={this.state.gestures} selectGesture={this.selectGesture}/>
     </Row>
    </Col>

     <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Результат игры</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {`${this.state.resultText}`}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Col xs={12} smOffset={3} sm={6} mdOffset={3} md={6}>
         <Chat room={this.state.room} socket={this.props.socket} player={this.state.player}></Chat>
        </Col>
  </Row>
    )
  }
}
