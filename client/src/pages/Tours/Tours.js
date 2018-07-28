import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import PresentGoogleMaps from "../../components/PresentGoogleMap";
// import { Input, TextArea, FormBtn } from "../../components/Form";



class Tours extends React.Component {
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
  };

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="md-12">
              <h2 className="text-white">Tours In Your Area</h2>
            </Col>
            </Row>

      <Row>
      <Col size="md-8 sm-12 pb-6">
            {this.state.books.length ? (
                 <List>
                
                  {this.state.books.map(book => {
                    
                    return (

                  //     <div key={book._id}>
                  //     <h1></h1>
                  //     <a href={"/tours/" + book._id}> 

                  //     <p>{book.title} <br /> {book.author} <br /> {book.location} </p></a>
                  //     <button>Book Now</button>
                  //     </div>
                     
                  //  );
                   
                // } 
                      <ListItem key={book._id} >
                         
                        {/* Seperate out Detail page or put switch statement in place 
                         so that when you go to the /tours/ + book_id page you do not see
                         an update or delete button when you are a customer*/}
                         <strong> 

                          Tour Name: {book.name} <br />
                          Starting Location: {book.address} <br />
                          Ticket Price: $ {book.price} per person <br />
                          Tickets Available: {book.qty} <br />
                          Date: {book.date} <br />
                          Time: {book.time} AM <br />

                        </strong>
                        <a href={"/tours/" + book._id}>More Details</a> 
                        <Link to={`/tours/book-now/${book._id}` }className="float-right" >Book Now</Link>
                        {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                        </ListItem>      
                    );
                
                    
                   })} 
                 </List>
             ) : (
                <h3 className="text-white">No Results to Display</h3> 
              )}
               
          </Col>
          <Col size="lg-4 md-4 sm-12">
      <PresentGoogleMaps />
      </Col>
        </Row>
      </Container>
    );
  }
}

export default Tours;
