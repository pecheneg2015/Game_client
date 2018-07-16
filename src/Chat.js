import React from "react";
import { Col, Form, FormGroup, FormControl, Button} from "react-bootstrap"
import {MessageList} from "./MessageList"

/*
*  Компонент отвечает за отрисовку чата
*/
export class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages:[],
            value:'' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);   
    }

    
    componentWillMount() {

        // на newmessage добавляем сообщение в список сообщений
        this.props.socket.on('newmessage', (data) => { 
            this.setState(prevState => ({
                 messages: [...prevState.messages, {'message':data.message,'player':data.player}]
            }))
        }) 
    }
       
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        // сообщаем на сервер о наличии нового сообщения
        this.props.socket.emit('messagetoserver',{message:this.state.value,room:this.props.room,player:this.props.player});
        this.setState({value:''})
    }
  
    render() { 
    return (
        <Col xs={12} smOffset={3} sm={6}  mdOffset={3} md={6} className={"chat"}>
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup controlId="messageText">
                <FormControl type="text" value={this.state.value}  onChange={this.handleChange} placeholder="Сообщение" />
                </FormGroup>{' '}
                <Button type="submit">Отправить</Button>
            </Form>
            <MessageList messages={this.state.messages} ></MessageList>
        </Col>
    );
  }
}