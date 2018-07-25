import React from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./BookNow.css";
import { Input } from "../../components/Form";
import PresentGoogleMap from "../../components/PresentGoogleMap";
import { List, ListItem } from "../../components/List";




class BookNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: {},
            isPurchased: false
        };
    }
    componentDidMount() {
        API.getBook(this.props.match.params.id)
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { Qty, value } = event.target;
        // const purchasedBook = {...this.state.books}

        this.setState({
            [Qty]: value
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.books.Qty) {
            API.purchaseBook(this.props.match.params.id,
                this.state.purchase)
                .then(res => this.setState({ isPurchased: true }))
                .catch(err => console.log(err));
        }
    }

    getPurchaseform = () => (
        <Container fluid>
            <Row>
                <Col size="md-10">
                    <Jumbotron>
                        <h1>Almost Done!!!<br />
                            Please Confirm Your Purchase below....</h1>
                    </Jumbotron>
                </Col>
            </Row>
            <article>
                <Row>
                    <Col size="md-8 sm-12">
                        <List>
                            <ListItem>Name: {this.state.books.name}</ListItem>
                            <ListItem>Price: {this.state.books.price}</ListItem>
                            <ListItem>Address: {this.state.books.address}</ListItem>
                        </List>
                    </Col>
                </Row>
                <Row>
                    <h2>How Many would you like to book?</h2>
                    <Input
                        value={this.state.purchased}
                        onChange={this.handleInputChange}
                        name="Qty"
                        Placeholder="Qty (required)"
                    />
                </Row>
            </article>
            <Row>
            </Row>
            <PresentGoogleMap />
        </Container>
    );

    render() {
        return (
            this.getPurchaseform()
        );
    }
}

export default BookNow;

