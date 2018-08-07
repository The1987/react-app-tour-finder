import React from "react";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
// import { Input, PhotoInput, TextArea, FormBtn } from "../../components/Form";
import "./Operator.css";

class Operator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      name: "",
      address: "",
      price: "",
      qty: "",
      date: "",
      time: "",
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
        this.setState({ books: res.data, name: "", address: "", price: "", qty: "", date: "", time: "", description: "" })
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
        qty: this.state.qty,
        date: this.state.date,
        time: this.state.time,
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
      <div className="dashboard-div">
      <h1 className="dashboard-h1"> Welcome back, Thomas Anderson!</h1>
      {/* <h2 className="dashboard-h2"> Plan your next adventure.</h2> */}
      <Container fluid>
        <Row>
          <Col size="md-4 sm-12">
            <div className="sections">
              <i className="far fa-envelope"></i> <h3 className="dashboard-h3">Inbox (4) </h3>
            </div>
          </Col>
          <Col size="md-4 sm-12">
            <div className="sections">
              <h3 className="dashboard-h3">Upcoming Tours (30)</h3>
            </div>
          </Col>
          <Col size="md-4 sm-12">
            <div className="sections">
            <h3 className="dashboard-h3">Pending Transactions: $3,120.00</h3> <br />
              <span className="payout"><h3 className="dashboard-h3">Next Payout: 5/17</h3></span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col size="lg-12 sm-12">
            <div className="booked-tours">
              <h2 className="dashboard-h2">Bookings</h2>
              {/* <hr /> */}
              <table className="booked-tours-table">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Tour Name</th>
                    <th>Tour Date</th>
                    <th>Tour Time</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>Qty</th>
                    <th>{/*<!-- Checkout Box -->*/}</th>
                  </tr>
                  <tr className="booked-tours-data">
                    <td>038</td>
                    <td>Central Park Bike Tour</td>
                    <td>9/5/18</td>
                    <td>10 AM</td>
                    <td>Molly Smith</td>
                    <td><a href="">msmith@gmail.com</a></td>
                    <td>3</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                  <tr className="booked-tours-data">
                    <td>038</td>
                    <td>Central Park Bike Tour</td>
                    <td>9/5/18</td>
                    <td>10 AM</td>
                    <td>Molly Smith</td>
                    <td><a href="">msmith@gmail.com</a></td>
                    <td>3</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                  <tr className="booked-tours-data">
                    <td>038</td>
                    <td>Central Park Bike Tour</td>
                    <td>9/5/18</td>
                    <td>10 AM</td>
                    <td>Molly Smith</td>
                    <td><a href="">msmith@gmail.com</a></td>
                    <td>3</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                  <tr className="booked-tours-data">
                    <td>038</td>
                    <td>Central Park Bike Tour</td>
                    <td>9/5/18</td>
                    <td>10 AM</td>
                    <td>Molly Smith</td>
                    <td><a href="">msmith@gmail.com</a></td>
                    <td>3</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                  <tr className="booked-tours-data">
                    <td>038</td>
                    <td>Central Park Bike Tour</td>
                    <td>9/5/18</td>
                    <td>10 AM</td>
                    <td>Molly Smith</td>
                    <td><a href="">msmith@gmail.com</a></td>
                    <td>3</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                </tbody>
              </table>
                    <button className="float-right btn-primary cancel-refund">Cancel & Refund</button>
            </div>
          </Col>
        </Row>


        <Row>
          <Col size="md-4 sm-12">
            <div className="add-tour">
              <h2 className="dashboard-h2">Add Tour</h2>
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
                  type="number"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  name="price"
                  placeholder="Price ($ USD)"
                  pattern="[0-9]*"
                />
                <Input
                  type="number"
                  value={this.state.qty}
                  onChange={this.handleInputChange}
                  name="qty"
                  placeholder="Number of Available Tickets"
                  pattern="[0-9]*"
                />
                <Input
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  name="date"
                  placeholder="Date"
                />
                <Input
                  type="number"
                  value={this.state.time}
                  onChange={this.handleInputChange}
                  name="time"
                  placeholder="Time"
                />
                <TextArea
                  className="tour-description-form-dashboard"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  name="description"
                  placeholder="Tour Description"
                />
                <FormBtn
                className="save-tour-btn"
                  disabled={!(this.state.name && this.state.address)}
                  onClick={this.handleFormSubmit}
                >
                  Save & Publish Tour
              </FormBtn>
              </form>
            </div>
          </Col>
          <Col size="md-8 sm-12">
            <div className="preview-tour">
            <div className="h2-panel">
              <h2 className="dashboard-h2">Preview Tour</h2> </div>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => {
                    return (
                      <ListItem key={book._id}>
                        <Row>
                          <Col size="sm-2 md-2" >
                            <div className="image">
                              {book.pictures}
                            </div>
                          </Col>
                          <Col size="sm-7 md-7">
                            <strong>Tour Name:</strong> {book.name} <br />
                            <strong> Starting Location:</strong>  {book.address} <br />
                            <a href={"/tours/" + book._id}>More Details</a>
                          </Col>
                          <Col size="sm-3 md-3" >
                            <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                            <div className="price">
                              <span className="ad-price">
                                <strong> $ {book.price} </strong>
                              </span>
                              <br />
                              <span className="per-price"> per person </span>
                            </div>
                            <br />
                            <Link to={`/tours/book-now/${book._id}`} className="text-white float-right book-now" >Book Now</Link>
                          </Col>
                        </Row>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                  <h2>No Results to Display</h2>
                )}
            </div>
          </Col>
        </Row>

      </Container>
      </div>
    );
  }
}

export default Operator;
