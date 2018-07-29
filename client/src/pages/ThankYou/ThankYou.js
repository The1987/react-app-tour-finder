import React from "react";
import Jumbotron from "../../components/Jumbotron";
import PresentGoogleMaps from "../../components/PresentGoogleMap";

class ThankYou extends React.Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1>
                                Thank you for your purchase!!!
                            </h1>
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Link to="../../../../">Return Home</Link>
                        <br />
                        <Link to="../../../tours">Return to Tours</Link>
                        <PresentGoogleMaps />
                    </Col>
                </Row>
                <Row>
                </Row>
            </Container>
        );
    }
}

export default ThankYou;