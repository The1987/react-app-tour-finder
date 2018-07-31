import React from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Link } from "react-router-dom";




class Dashboard extends React.Component {
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
                    <Col size="sm-2 md-2" >
                    <h2>Dashboard</h2>
                    <Link to={`/tours`} > Add Tours </Link>
                    <a href=""> Settings </a>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Dashboard;









// Adding Tours
//// CSV Import / Export

// Business Analytics
//// CSV Import / Export
/// Xero or QB Integration

// Settings
//// Tax Rate -> Option when "Adding Tours"
