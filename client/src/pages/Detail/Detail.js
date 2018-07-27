import React from "react";
import "./Detail.css";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import BookBtn from "../../components/BookBtn";
import PresentGoogleMap from "../../components/PresentGoogleMap";


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      isUpdate: false
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc

  
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  handleUpdate(isUpdate) {
    this.setState({ isUpdate: isUpdate })
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;

    const updatedBook = { ...this.state.books }
    updatedBook[name] = value

    this.setState({
      books: updatedBook
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.books.name && this.state.books.address) {
      API.patchBook(this.props.match.params.id, this.state.books)
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
              {this.state.books.name} by {this.state.books.address}
            </h1>
          </Jumbotron>
        </Col>
      </Row>

      <Row>
        <Col size="md-8 sm-12">
          <article className="tour-details">
          <p>Cost: $ {this.state.books.price} per person</p> <br />
          <p>About This Tour: {this.state.books.description} </p>
          </article>
        </Col>

        <Col size="md-4 sm-12">
        <article className="map-details">
        <PresentGoogleMap />
        </article>
        </Col >

        <Col size="md-12">
        <BookBtn />
        </Col>
      </Row>

      <Row>
        <Col size="md-2">
          <Link to="/operator">← Back to Tour Operator Screen</Link>
          <button onClick={() => this.handleUpdate(true)}>Update</button>
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
              value={this.state.books.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Tour Name (required)"
            />
            <Input
              value={this.state.books.address}
              onChange={this.handleInputChange}
              name="address"
              placeholder="Meet Up Location (required)"
            />
            <Input
              value={this.state.books.price}
              onChange={this.handleInputChange}
              name="price"
              placeholder="Price ($)"
            />
            <TextArea
              value={this.state.books.description}
              onChange={this.handleInputChange}
              name="description"
              placeholder="Tour Description"
            />
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.books.name && this.state.books.address)}
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
