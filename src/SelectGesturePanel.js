import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

/*
*  Компонент отвечает за отрисовку поля выбора жеста
*/
export class SelectGesturePanel extends React.Component {
  render() {

    const gestureElementsArray = this.props.gestures.map((data,index) => {
      // получаем правильный путь к иконке
      let src = "icons/"+data;
      // добавляем отступ для первого элемента
      let offset = index===0?1:0;
      return (
        <Col xs={4} sm={3} md={2} lg={2} smOffset={offset} key={index} >
          <Image src={src} responsive className="select_gesture_element" onClick={()=>this.props.selectGesture(index)}/>
        </Col>   
      );
    });

    return(
            <Row>
        <Col xs={12} md={12} lg={12}  className="select_gesture_element_text">
          Выберите жест:
        </Col>
        <Col xs={12} md={12} lg={12}>
          {gestureElementsArray}
        </Col>
      </Row>
    ) 
  }
}