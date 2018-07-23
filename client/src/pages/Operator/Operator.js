import React from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
// import { Input, PhotoInput, TextArea, FormBtn } from "../../components/Form";

class Operator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      name: "",
      address: "",
      price: "",
      description: "",
      // selectedFile: ""
      // isUpdate: false
    };
  }

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  // uploadHandler = () => {
  //   console.log(this.state.selectedFile)
  // }

  // uploadHandler = () => {
  //   axios.post('my-domain.com/file-upload', this.state.selectedFile)
  // }




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

  // handleUpdate(isUpdate) {
  //   this.setState({ isUpdate: isUpdate })
  // }

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
        description: this.state.description
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
    // API.patchBook(this.props.match.params.id, this.state.book)
    //     .then(res => this.setState({ isUpdate: false }))
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4 sm-12">
            <Jumbotron>
              <h1>Add Tour</h1>
            </Jumbotron>
            <form>

              {/* Adding functionality to upload image to rEact.js
              Source: https://academind.com/learn/react/snippets/image-upload/#select-a-file*/}
              {/* <PhotoInput type="file" onChange={this.fileChangedHandler} /> */}
              {/* <button onClick={this.uploadHandler}>Upload!</button> */}



              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Tour Name (required)"
              />
              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                name="address"
                placeholder="Meet Up Address(required)"
              />
              <Input
                value={this.state.price}
                onChange={this.handleInputChange}
                name="price"
                placeholder="Price ($)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Tour Description"
              />
              <FormBtn
                disabled={!(this.state.name && this.state.address)}
                onClick={this.handleFormSubmit}
              >
                Save & Publish Tour
              </FormBtn>
            </form>
          </Col>
          <Col size="md-8 sm-12">
            <Jumbotron>
              <h1>Preview Tour</h1>
            </Jumbotron>
            {this.state.books.length ? (

              <List>

                {this.state.books.map(book => {
                  return (

                    <ListItem key={book._id}>
                      <a href={"/operator/" + book._id}>
                        <strong>

                          {this.state.book.name} | {this.state.book.address} | $ {this.state.book.price} per person

                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Operator;
