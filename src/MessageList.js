import React from "react";
import { Row } from "react-bootstrap";

/*
*  Компонент отвечает за отрисовку списка сообщений в чате
*/
export class MessageList extends React.Component {

  render() {
    const messageElementsArray =   this.props.messages.map((data,index) => {
      return (<p className={data.player===1?'message_left':'message_right'} key={index}>{data.message}</p>);
    });
   
    return(
      <Row className={"message_list_area"} >
        {messageElementsArray}
      </Row>) ;
  }
}