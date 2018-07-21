import React from "react";
import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
// import Card from "../../components/Card";


class Tours extends React.Component {
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
        title: this.state.name,
        author: this.state.address,
        location: this.state.price,
        synopsis: this.state.location
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Tours In Your Area</h1>
            </Jumbotron>
      
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
                        <a href={"/tours/" + book._id}>  
                        {/* Seperate out Detail page or put switch statement in place 
                         so that when you go to the /tours/ + book_id page you do not see
                         an update or delete button when you are a customer*/}
                         <strong> 

           {book.name} | {book.address} | $ {book.price} per person
           

                        </strong>
                        </a> 
                        <button className="float-right">Book Now</button>
                        {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
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

export default Tours;
