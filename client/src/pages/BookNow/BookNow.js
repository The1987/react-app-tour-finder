import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./BookNow.css";
import { Input } from "../../components/Form";
// import PresentGoogleMap from "../../components/PresentGoogleMap";
import { List, ListItem } from "../../components/List";
import { Link } from "react-router-dom";
import aws from 'aws-sdk';

// import AWS from "../../components/AWS";
// import Math from "./Match";
// Load the AWS SDK for Node.js

const Config=require('Config')
const Amazon_accessKeyId = fetchData(Config.Amazon_accessKeyId);
const Amazon_secretAccessKey = fetchData(Config.Amazon_secretAccessKey);

var divStyle = {
    backgroundColor: 'white',
    paddingTop: '10px',
    marginBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
    height: '100%'
};

var colStyle = {
    width: '180px',
    padding: '2px',
    borderBottom: '1px solid grey'
}

class BookNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: {},
            purchase: {},
            name: "",
            operator: "",
            address: "",
            price: "",
            qty: "",
            date: "",
            time: "",
            isConfirmed: false,
            isPurchased: false
        };
    };


    fileChangeHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    };

    // default function to populate content
    componentDidMount() {
        API.getBook(this.props.match.params.id)
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err));
        console.log(this.state.books);
        console.log("BookPrice:" + typeof this.state.books.price)
    };

    // handleInputChange = event => {
    //     const { Qty, value } = event.target;
    //     const purchasedBook = { ...this.state.books }
    //     purchasedBook[Qty] = value;
    //     this.setState({
    //         [Qty]: value
    //     });

    // }

    handleInputChange = event => {
        const { name, value } = event.target;

        const updatedBook = { ...this.state.books }
        updatedBook[name] = value

        this.setState({
            books: updatedBook
        });
    };

    // resetOperator() {
    //         this.setState({ books: {}, name: "", address: "", price: "", qty: "", date: "", time: "", description: "" , isConfirmed: false, isPurchased: false})
    //       .catch(err => console.log(err));
    //   };

    // handleFormSubmit = event => {
    //     event.preventDefault();
    //     if (this.state.books.Qty) {
    //         API.purchaseBook(this.props.match.params.id,
    //             this.state.isPurchased)
    //             .then(res => this.setState({ isPurchased: true }))
    //             .catch(err => console.log(err));
    //     }
    // };

    handleUpdate(isUpdate) {
        this.setState({ isUpdate: isUpdate })
    };

    handleConfirmBook = event => {
        this.setState({ isConfirmed: true })
    };

    handleBackBook = event => {
        this.setState({ isConfirmed: false })
    };

    sendEmail() {
        aws.config.update({
            region: 'us-east-1',
            accessKeyId: Amazon_accessKeyId,
            secretAccessKey: Amazon_secretAccessKey,
        });
        const ses = new aws.SES({ apiVersion: 'latest' });
        return new Promise((resolve, reject) => {
            ses.sendEmail(
                {
                    Source: 'developers.act@gmail.com',
                    /* required */
                    Destination: {
                        CcAddresses: [
                            'andrewmflak@gmail.com'

                            /* more CC email addresses */
                        ],
                        ToAddresses: [
                            'andrewmflak@gmail.com',

                            /* more To email addresses */
                        ]
                    },
                    Message: {
                        Subject: {
                            Data: 'Tour Purchase Confirmation',
                        },
                        Body: {
                            Html: {
                                Data: `
                                <h1> 
                                Tour Finder Purchase Confirmation
                                </h1>
                                <p>
                                    Thank you for your purchase of "placeholder".
                                    </p>
                                    <p>
                                    Your card has now been billed for this purchase and the operator has been notified.
                                    </p>
                                    <p>
                                    Please make sure to rate your tour experience!
                                        </p>`,
                            },
                        },
                    },
                    ReplyToAddresses: [
                        'developers.act@gmail.com',
                    ]
                },
                (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info);
                        console.log(info);
                    }
                },
            );
        });
    };


    handlePurchaseSubmit = event => {
        console.log("test-name: " + this.state.books.name);
        console.log("test-address: " + this.state.books.address);
        event.preventDefault();
        if (this.state.books.name && this.state.books.address) {
            API.purchasePost({
                name: this.state.books.name,
                address: this.state.books.address,
                price: this.state.books.price
            })
                .then(res => this.setState({
                    isConfirmed: true, isPurchased: true
                }),
                    this.sendEmail(),
                    console.log(this),
            )
                .catch(err => console.log(err));

        }
    };


    // Step 1. Booking Confirmation
    getConfirmationForm = () => (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <h4 className="text-white">
                        1. Confirm Tour Selection
                    <span color="grey">
                            2. Purchase Tour
                            3. Thank You For Your Purchase
                    </span>
                    </h4>
                </Col>
            </Row>

            <Row>
                <Col size="md-12 sm-12">

                    <div style={divStyle}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Tour Name:</strong> {this.state.books.name}</td>
                                    <td><strong>Tour Date:</strong> {this.state.books.date}</td>
                                </tr>
                                <tr>
                                    <td><strong>Start Location:</strong> {this.state.books.address}</td>
                                    <td><strong>Start Time:</strong> {this.state.books.time}</td>
                                </tr>
                            </tbody>
                        </table>

                        <br />

                        <table>
                            <tbody>
                                <tr>
                                    <th style={colStyle}>Admission</th>
                                    <th style={colStyle}>Price</th>
                                    <th style={colStyle}>Qty</th>
                                    <th style={colStyle}> Amount</th>
                                </tr>
                                <tr>
                                    <td style={colStyle}>Adult (18+)</td>
                                    <td style={colStyle}>$ {this.state.books.price} </td>
                                    <td style={colStyle}>
                                        <Input
                                            type="number"
                                            onChange={this.handleInputChange}
                                            name="qty"
                                            placeholder="Qty"
                                            pattern="[0-9]*"
                                        />
                                    </td>
                                    <td style={colStyle}>$

                                  {/* <span>{this.state.books.price * this.state.books.qty}</span> */}

                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Ticket Total</td>
                                    <td>$ </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Tax</td>
                                    <td>$ XX.XX</td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><strong>Total</strong></td>
                                    <td><strong>$ XX.XX</strong></td>
                                </tr>
                            </tbody>
                        </table >
                        <br />


                        <button className="book-btn btn btn-success btn-block" onClick={this.handleConfirmBook}>Continue to Purchase</button>
                        <Link to="../../tours" className="book-btn btn btn-danger btn-block" onClick={this.onClick}>
                            Back </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );

    // Step 2. Checkout
    getPurchaseForm = () => (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <h4 className="text-white">
                        <span color="grey">
                            1. Confirm Tour Selection </span>
                        2. Purchase Tour
                        <span color="grey">
                            3. Thank You For Your Purchase
                    </span>
                    </h4>
                </Col>
            </Row>

            <Row>
                <Col size="md-12">
                    <List>
                        <ListItem>
                            <h2>
                                <strong>
                                    Name:
                                </strong>
                                <br />
                                {this.state.books.name}
                                <br />
                            </h2>
                            <h4>
                                <strong>
                                    Operator:
                                </strong>
                                <br />
                            </h4>
                            <br />
                            <h4>
                                <strong>
                                    Address:
                                </strong>
                                <br />
                                {this.state.books.address}
                                <br />
                            </h4>
                            <h4>
                                <strong>
                                    Price:
                                </strong>
                                <br />
                                $ {this.state.books.price}
                                <br />
                            </h4>
                            <h4>
                                Quantity:
                                <br />
                                {this.state.books.Qty}
                                <br />
                            </h4>
                            <h3>
                                <br />
                                <strong>
                                    Total:
                                </strong>
                                <br />
                            </h3>
                        </ListItem>
                    </List>
                </Col>
            </Row>

            <Row>
                <Col size="md-12">
                    <form>
                        <Input
                            type="number"
                            value={this.state.qty}
                            onChange={this.handleInputChange}
                            name="qty"
                            placeholder="Number of Available Tickets"
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
                        <button className="book-btn btn btn-success btn-block" onClick={this.handlePurchaseSubmit}>
                            Purchase
                            </button>
                        <Link to="../../tours" className="book-btn btn btn-danger btn-block" onClick={this.handleBackBook}> Back </Link>

                    </form>
                </Col>
            </Row>
        </Container>
    );

    render() {
        if (this.state.isConfirmed === true) return this.getPurchaseForm();
        else return this.getConfirmationForm();
    }
};


export default BookNow;
