import React from "react";
import "./Detail.css";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API"
import { Image } from 'react-bootstrap';

import image from "../../assets/images/new-york-bike-tour.jpg";
import calendar from "../../assets/images/calendar.png";
import GoogleMaps from "../../components/GoogleMaps";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      isUpdate: false,
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
  }

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
    <Container fluid  >
      <div className="header">
        <Row>
          <Col size="md-12">
            <div className="header2">
              <div className="price float-right">
                <span className="ad-price mr-2">
                  <strong> <span className="details-dollar-sign">$</span> {this.state.books.price} </strong>
                </span>
                <br />
                <span className="details-per-person per-price mr-2"> per person </span>
              </div>
              <h2 className="details-tour-title ml-2">
                {this.state.books.name} <br />
              </h2>
              <span className="operated-by ml-2">Operated by:    <a className="operator-name-link" href=""> ACME Company</a></span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col size="md-8 sm-12">

            <Row>
                <Col size="md-12 sm-12">
                <div className="tour-details tour-picture">
                  <Image src={image} alt="" className="tour-image" />
                </div>
                </Col>

                <Col size="md-12 sm-12">
                  <Link className="book-btn hvr-fade-2 hvr-grow-shadow-2 btn btn-success btn-block btn-lg hvr-shadow" to={`/tours/book-now/${this.state.books._id}`}>Book Now</Link>
                </Col>

                <Col size="md-12 sm-12">
                <p className="tour-details tour-details-p">
                  <strong className="about-this-tour-detail">About this Tour:</strong> <span className="about-this-tour-detail-description"> {this.state.books.description} </span> <br />
                  {/* Tour Name: {this.state.books.name} <br /> */}
                  {/* Starting Location: {this.state.books.address} <br /> */}
                </p>
                </Col>
  
                {/* <Col size="md-12">
                <Link to="/operator" className="text-white back-link">← Back to Tour Operator Screen</Link>
                <button className="btn-primary float-right mb-4 pl-2 pr-2 " onClick={() => this.handleUpdate(true)}>Update Tour</button>
                </Col> */}
          </Row>
          
        </Col>
          
        <Col size="md-4 sm-12" >
          <Row>
            <Col size="md-12 sm-12">
            <div className="tour-details tour-calendar">
              <Image src={calendar} alt="" className="tour-image" />
              {/* Tickets Available: {this.state.books.qty} */}
            </div>
          </Col>

          <Col size="md-12 sm-12" >
            <GoogleMaps />
          </Col>
        </Row>

        
          </Col>
        </Row>
      </div>
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
