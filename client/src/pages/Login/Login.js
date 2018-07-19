import React from "react";
import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";
// import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      name: "",
      address: "",
      price: "",
      description: ""
    };
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <h1>Login</h1>
            </Jumbotron>
            <form>

              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Email (required)"
              />
              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                name="address"
                placeholder="Password (required)"
              />
            <FormBtn
                disabled={!(this.state.name && this.state.address)}
                onClick={this.handleFormSubmit}
              >
                Sign In
            </FormBtn>

            <p> Don't have an account create one <a href="">here</a></p>
            </form>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
