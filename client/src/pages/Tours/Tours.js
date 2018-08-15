import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import "./Tours.css";

class Tours extends React.Component {
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
      admissionTickets: ""
    };
  }

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // manage state accross file changes
  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
  }



  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, tourName: "", tourDescription: "", tourPlace: "", tourAddress1: "", tourAddress2: "", tourCity: "", tourState: "", tourZipcode: "", tourDays: "", tourTimes: "", tourAdmission: "", admissionType: "", admissionTickets: "" })
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

      <Container fluid>

        <Row>
          <Col size="md-12">
            <h2 className="tours-h2">Tours Near You</h2>
          </Col>
        </Row>

        <Row>


          {/* <Col size="lg-2">
            <p className="image mt-6 pb-6">
              This is where we add the filter <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
         </p>
          </Col> */}


          <Col size="lg-10 sm-12" className="pb-6">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id} >
                      <Row>
                        <Col size="sm-3 md-2" >
                          <div className="image">
                            <p className="image-p">Image</p>
                          </div>
                        </Col>

                        <Col size="sm-7 md-7">
                          <strong className="tour-name-location">Tour Name:</strong> <span className="tour-name-location-details">{book.tourName}</span> <br />
                          <strong className="tour-name-location"> Starting Location:</strong>  <span className="tour-name-location-details">{book.tourAddress1} </span> <br />
                          <a className="more-details hvr-underline-reveal" href={"/tours/" + book._id}>More Details</a>
                        </Col>

                        <Col size="sm-3 md-3" >

                          <div className="price">
                            <span className="ad-price">
                              <strong className="book-price"> <span id="tours-dollar-sign">$</span> {book.tourAdmission} </strong>
                            </span>
                            <br />
                            <span className="per-price"> per person </span>
                          </div>
                          <br />
                          <Link to={`/tours/book-now/${book._id}`} className="text-white float-right book-now hvr-grow-shadow" >Book Now</Link>

                        </Col>
                      </Row>
                    </ListItem>
                  );


                })}

              </List>
            ) : (
                <h3 className="text-white">No Results to Display</h3>
              )}


          </Col>
        </Row>

      </Container>
    );
  }
}

export default Tours;
