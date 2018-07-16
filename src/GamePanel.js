import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";


/*
*  Компонент отвечает за отрисовку поля с выбранными игроками жестами
*/
export class GamePanel extends React.Component {

  render() {
    return (
      <Row>
        <Col xs={12} md={12} lg={12}  className="game_panel_element_text">
          Выбранные игроками жесты:
        </Col>
        <Col xs={6} md={6} lg={6} >
          <Image src={`icons/${this.props.selectedIcons[0]}`} responsive className="gamepanel_info_image"/>
        </Col>   
        <Col xs={6} md={6} lg={6} >
          <Image src={`icons/${this.props.selectedIcons[1]}`} responsive className="gamepanel_info_image"/>
        </Col>   
      </Row>
    );
  }
}