import React from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./BookNow.css";
import { Input } from "../../components/Form";
import PresentGoogleMap from "../../components/PresentGoogleMap";
import { List, ListItem } from "../../components/List";
// import Math from "./Match";



class BookNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: {}
        };
    }

    // default function to populate content
    componentDidMount() {
        API.getBook(this.props.match.params.id)
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err));
        console.log(this.state.books);
        console.log("BookPrice:" + typeof this.state.books.price)
    }

    handleInputChange = event => {
        const { Qty, value } = event.target;
        const purchasedBook = { ...this.state.books }
        purchasedBook[Qty] = value;
        this.setState({
            [Qty]: value
        });

    }

    // handleTotalCalc = event => {
    //     const {Total, value}  = parseInt(this.state.Qty.value) * parseInt(this.state.books.price.value);
    //     const purchasedTotal = { ...this.state.books }
    //     purchasedTotal[Total] = value;
    //     this.setState({
    //         [Total]: value
    //     });

    // }

    // onChange={e => onChange(i, parseInt(e.target.value) || 0)}

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.books.Qty) {
            API.purchaseBook(this.props.match.params.id,
                this.state.isPurchased)
                .then(res => this.setState({ isPurchased: true }))
                .catch(err => console.log(err));
        }
    };

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
                            <ListItem>
                                Name: {this.state.books.name}
                                <br />
                                Address: {this.state.books.address}
                                <br />
                                Price: {this.state.books.price}
                                <br />
                                <Input
                                    value={this.state.Qty}
                                    onChange={this.handleInputChange}
                                    name="Qty"
                                    Placeholder="Qty of tickets (required)"
                                />
                                <br />
                                --------------------------------------
                                <br />
                                Your Total*: {this.state.books.price * this.state.Qty}
                                {console.log("BookPrice:" + typeof this.state.books.price)}
                                {console.log("Qty:" + typeof this.state.Qty)}
                                <br />
                                --------------------------------------
                                </ListItem>
                            <button className="confirm-btn" onClick={this.props.onClick}>
                                Confirm
                            </button>
                        </List>
                    </Col>
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

