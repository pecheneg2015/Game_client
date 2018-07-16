import React from "react";
import { Row, Col, Grid } from "react-bootstrap";
import {Panel} from "react-bootstrap"

/*
*  Компонент отвечает за отрисовку экрана с ссылкой для приглашения второго игрока
*/
export class InviteFriend extends React.Component {

    componentDidMount() {
        this.props.createGame();
    }

    render() {
        return (
        <Grid>
            <Row>
                <Col xs={12} md={12} lg={12} >
                    <Panel className="invite_position">
                        <Panel.Body className="invite">Поделись ссылкой с другом:<span className="invite_link"> http://localhost:3000/{this.props.roomID} </span></Panel.Body>
                    </Panel>
                </Col>      
            </Row>  
        </Grid>
        );
    }
}