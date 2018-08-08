import React from "react";
import "./Home.css";
import SearchBar from "../../components/SearchBar";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";


class Home extends React.Component {
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

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, name: "", address: "", price: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.address) {
      API.saveBook({
        name: this.state.name,
        address: this.state.address,
        price: this.state.price,
        description: this.state.location
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };



  render() {
    return (
      <Container fluid>
      <ul class="cb-slideshow">
          <li style={{listStyleType: "none;"}}><span></span></li>
          <li style={{listStyleType: "none;"}}><span></span></li>
          <li style={{listStyleType: "none;"}}><span></span></li>
          <li style={{listStyleType: "none;"}}><span></span></li>
          <li style={{listStyleType: "none;"}}><span></span></li>
          <li style={{listStyleType: "none;"}}><span></span></li>
      </ul>
        <Row>
          <Col size="md-12 sm-12" >
              <SearchBar className="justify-content-center" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
