import React from "react";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import "./Operator.css";
import InboxLogo from '../../assets/images/inbox.png';
import TourLogo from '../../assets/images/tour-logo.png';

class Operator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      tourName: "",
      tourDescription: "",
      tourPlace: "",
      tourAddress1: "",
      tourAddress2: "",
      tourCity: "",
      tourState: "",
      tourZipcode: "",
      tourDays: "",
      tourTimes: "",
      tourAdmission: "",
      admissionType: "",
      admissionTickets: "",

      purchases: [],
      purchaseName: "",
      purchaseAddress1: "",
      purchaseAddress2: "",
      purchaseCity: "",
      purchaseState: "",
      purchaseZipcode: "",
      purchaseTickets: "",
      purchaseEmail: "",
      purchasePhone: ""
    };
  }

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  componentWillMount() {
    this.loadPurchases();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, tourName: "", tourDescription: "", tourPlace: "", tourAddress1: "", tourAddress2: "", tourCity: "", tourState: "", tourZipcode: "", tourDays: "", tourTimes: "", admissionType: "", tourAdmission: "", admissionTickets: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  loadPurchases = () => {
    API.getPurchases()
      .then(res =>
        this.setState({ books: res.data, purchaseName: "", purchaseAddress1: "", purchaseAddress2: "", purchaseCity: "", purchaseState: "", purchaseZipcode: "", purchaseTickets: "", purchaseEmail: "", purchasePhone: "", checkouttotal: "" })
      )
      .catch(err => console.log('I have an error',err));
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
    if (this.state.tourName && this.state.tourAddress1) {
      API.saveBook({
        tourName: this.state.tourName,
        tourDescription: this.state.tourDescription,
        tourPlace: this.state.tourPlace,
        tourAddress1: this.state.tourAddress1,
        tourAddress2: this.state.tourAddress2,
        tourCity: this.state.tourCity,
        tourState: this.state.value,
        tourZipcode: this.state.tourZipcode,
        tourDays: this.state.tourDays,
        tourTimes: this.state.tourTimes,
        admissionType: this.state.admissionType,
        tourAdmission: this.state.tourAdmission,
        admissionTickets: this.state.admissionTickets,
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="dashboard-div">
        <h1 className="dashboard-h1"> Welcome back, Thomas Anderson! </h1>
        {/* <h2 className="dashboard-h2"> Plan your next adventure.</h2> */}
        <Container fluid>
          <Row>
            <Col size="md-4 sm-12">
              <div className="sections">
                {/* <i className="far fa-envelope"></i>  */}
                <h3 className="dashboard-h3">Inbox <strong>(14)</strong> </h3>
                <img id="inbox-logo" src={InboxLogo} alt="inbox logo" />

              </div>
            </Col>
            <Col size="md-4 sm-12">
              <div className="sections">
                <h3 className="dashboard-h3">Upcoming Tours <strong>(30)</strong></h3>

                <img id="tour-logo" src={TourLogo} alt="tour logo" />
              </div>
            </Col>
            <Col size="md-4 sm-12">
              <div className="sections">
                <h3 className="dashboard-h3">Pending Transactions: <br /><span className="payout-price">$3,120.00</span></h3>
                <span className="payout"><h3 className="dashboard-h3-2">Next Payout: 08/17</h3></span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col size="md-12 sm-12">
              <div className="booked-tours">
                <h2 className="dashboard-h2">Bookings</h2>
                {this.state.books.purchaseName}
              </div>
              {/* {this.state.books.length ? (
                  <List>
                    {this.state.books.map(book => {
                      return (
                        <ListItem key={book._id}>
                          <Row>
                            <Col size="lg-12">
                              <div>
                                <span>{book.tourName}</span> <br />
                                <span>
                                {book.purchaseName}<br />
                                {book.purchaseAddress1}<br />
                                {book.purchaseAddress2}<br />
                                </span> 
                              </div>
                            </Col>
                          </Row>
                        </ListItem>
                      )
                    })}
                  </List>
                )} */}

              {/* <Col size="md-12"> */}
              <div>
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
                <br />
                <br />
                <br />
                <br />
              </div>
            </Col>
          </Row>

          <Row>
            <Col size="md-6 sm-12">
              <div className="add-tour">
                <h2 className="dashboard-h2">Add Tour</h2>
                <form>
                  <h3>1. Tour Details </h3>
                  <Input
                    value={this.state.tourName}
                    onChange={this.handleInputChange}
                    name="tourName"
                    placeholder="Tour Name (required)"
                  />
                  <TextArea
                    className="tour-description-form-dashboard"
                    value={this.state.tourDescription}
                    onChange={this.handleInputChange}
                    name="tourDescription"
                    placeholder="Tour Description"
                  />
                  {/* <label>Upload any waivers, releases or documents the customer may need.
                  <Input type="file" />
                  <Input type="file" />
                  <Input type="file" />
                  </label> */}


                  <hr />
                  <br />
                  <h3>2. Tour Location</h3>
                  <Input
                    value={this.state.tourPlace}
                    onChange={this.handleInputChange}
                    name="tourPlace"
                    placeholder="Meeting Place (Restaurant, Hotel, Monument, etc)"
                  />
                  <Input
                    value={this.state.tourAddress1}
                    onChange={this.handleInputChange}
                    name="tourAddress1"
                    placeholder="Address 1"
                  />
                  <Input
                    value={this.state.tourAddress2}
                    onChange={this.handleInputChange}
                    name="tourAddress2"
                    placeholder="Address 2"
                  />

                  <Row>
                    <Col size="md-4">
                      <Input
                        value={this.state.tourCity}
                        onChange={this.handleInputChange}
                        name="tourCity"
                        placeholder="City"
                      />
                    </Col>
                    <Col size="md-4">
                      <Select
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="tourState"
                      >
                        <option value="">State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </Select>
                    </Col>
                    <Col size="md-4">
                      <Input
                        value={this.state.tourZipcode}
                        onChange={this.handleInputChange}
                        name="tourZipcode"
                        placeholder="Zipcode"
                      />
                    </Col>
                  </Row>
                  <hr />
                  <br />

                  <h3>3. Hours Of Operation</h3>
                  <Row>
                    <Col size="lg-12">
                      <Row>
                        <Col size="md-12">
                          <Input
                            value={this.state.tourDays}
                            onChange={this.handleInputChange}
                            name="tourDays"
                            placeholder="Days We're Open (Mon, Tue - Fri, etc)"
                          />
                          {/* <Select value={this.state.value} onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </Select> */}
                        </Col>

                        <Col size="md-12">
                          <Input
                            value={this.state.tourTimes}
                            onChange={this.handleInputChange}
                            name="tourTimes"
                            placeholder="Times We're Open (8AM - 9PM)"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <hr />
                  <br />

                  <h3>4. Admission</h3>
                  <Row>
                    <Col size="md-12">
                      <Input
                        value={this.state.admissionType}
                        onChange={this.handleInputChange}
                        name="admissionType"
                        placeholder="Admission Type (General, Adult, Kid, etc)"
                      />
                    </Col>
                    <Col size="md-12">
                      <Input
                        value={this.state.tourAdmission}
                        onChange={this.handleInputChange}
                        name="tourAdmission"
                        placeholder="Admission Price ($) - Price Per Person"
                      />
                    </Col>
                    <Col size="md-12">
                      <Input
                        value={this.state.admissionTickets}
                        onChange={this.handleInputChange}
                        name="admissionTickets"
                        placeholder="Tickets - Number of tickets available every time the tour runs"
                      />
                    </Col>
                  </Row>

                  <FormBtn
                    className="save-tour-btn"
                    disabled={!(this.state.tourName && this.state.tourAddress1)}
                    onClick={this.handleFormSubmit}
                  >
                    Save & Publish Tour
              </FormBtn>
                </form>
              </div>
            </Col>

            <Col size="md-6 sm-12">
              <div className="preview-tour">
                <div className="h2-panel">
                  <h2 className="dashboard-h2">Preview Tour</h2> </div>
                {this.state.books.length ? (
                  <List>
                    {this.state.books.map(book => {
                      return (
                        <ListItem key={book._id}>
                          <Row>
                            <Col size="sm-7 md-7">
                              <div className="dashboard-preview-tour-info-div">
                                <span className="dashboard-preview-info">{book.tourName}</span> <br />
                                <span className="dashboard-preview-info">
                                  {book.tourPlace}<br />
                                  {book.tourAddress1}<br />
                                  {book.tourAddress2}<br />
                                  {book.tourCity},{book.tourState},{book.tourZipcode}</span>
                                <br />
                                <a href={"/tours/" + book._id}>More Details</a>
                              </div>
                            </Col>
                            <Col size="sm-3 md-3" >
                              <div className="preview-price-and-book">
                                <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                <div className="price">
                                  <span className="ad-price">
                                    <strong> $ {book.tourAdmission} </strong>
                                  </span>
                                  <br />
                                  <span className="per-price"> per person </span>
                                </div>
                                <br />
                                <Link to={`/tours/book-now/${book._id}`} className="text-white float-right book-now" >Book Now</Link>
                              </div>
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
