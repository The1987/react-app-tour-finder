import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      isUpdate: false
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  handleUpdate(isUpdate) {
    this.setState({ isUpdate: isUpdate })
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;

    const updatedBook = { ...this.state.book }
    updatedBook[name] = value

    this.setState({
      book: updatedBook
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.book.name && this.state.book.address) {
      API.patchBook(this.props.match.params.id, this.state.book)
        .then(res => this.setState({ isUpdate: false }))
        .catch(err => console.log(err));
    }
  };

  getReadOnly = () => (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {this.state.book.name} by {this.state.book.address}
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
          <p>Tour Cost Per Person: $ {this.state.book.price} per person</p> <br />
          <p>About This Tour: {this.state.book.description} </p>
          </article>
        </Col>
      </Row>
      <Row>
        <button onClick={() => this.handleUpdate(true)}>Update</button>
        <Col size="md-2">
          <Link to="/operator">← Back to Tour Operator Screen</Link>
        </Col>
      </Row>
    </Container>
  );

  getUpdateform = () => (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Update Your Tour</h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <form>
            <Input
              value={this.state.book.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Tour Name (required)"
            />
            <Input
              value={this.state.book.address}
              onChange={this.handleInputChange}
              name="address"
              placeholder="Meet Up Location (required)"
            />
            <Input
              value={this.state.book.price}
              onChange={this.handleInputChange}
              name="price"
              placeholder="Price ($)"
            />
            <TextArea
              value={this.state.book.description}
              onChange={this.handleInputChange}
              name="description"
              placeholder="Tour Description"
            />
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.book.name && this.state.book.address)}
              onClick={this.handleFormSubmit}
            >
              Save Tour
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
  );

  render() {
    if (this.state.isUpdate) return this.getUpdateform();
    else return this.getReadOnly();
  }
}

export default Detail;
