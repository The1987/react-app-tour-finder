import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./BookNow.css";
import { Input } from "../../components/Form";
// import PresentGoogleMap from "../../components/PresentGoogleMap";
// import { List, ListItem } from "../../components/List";
import { Link } from "react-router-dom";
import aws from 'aws-sdk';


// var fetchData = [];
// import AWS from "../../components/AWS";
// import Math from "./Match";
// Load the AWS SDK for Node.js

// const Config = require('Config');
const Amazon_accessKeyId = fetch(process.env.Amazon_accessKeyId);
const Amazon_secretAccessKey = fetch(process.env.Amazon_secretAccessKey);

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

    render() {
        return (
            // getConfirmationForm = () => (
            <Container fluid>
                <Row>
                    <Col size="md-7">
                        <div className="divStyle tour-info">
                            <h4>Tour Information</h4>
                            <strong>Tour Name:</strong> {this.state.books.name} <br />
                            <strong>Tour Date:</strong> {this.state.books.date} <br />
                            <strong>Start Location:</strong> {this.state.books.address} <br />
                            <strong>Start Time:</strong> {this.state.books.time}
                        </div>

                        <div className="divStyle bill-info">
                            <h4>Billing Information</h4>
                            <form>
                                <Input size="sm-2"
                                    // value={this.state.billname}
                                    onChange={this.handleInputChange}
                                    // name="billname"
                                    placeholder="Full Name"
                                />
                                <Input
                                    type="email"
                                    // value={this.state.billemail}
                                    onChange={this.handleInputChange}
                                    // name="billemail"
                                    placeholder="Email"
                                />
                                <Input
                                    type="tel"
                                    // value={this.state.billphone}
                                    onChange={this.handleInputChange}
                                    // name="billphone"
                                    placeholder="Phone Number"
                                    pattern="[0-9]*"
                                />

                                <Input
                                    // value={this.state.billaddress1}
                                    onChange={this.handleInputChange}
                                    name="billaddress1"
                                    placeholder="Address Line 1"
                                />
                                <Input
                                    // value={this.state.billaddress2}
                                    onChange={this.handleInputChange}
                                    name="billaddress2"
                                    placeholder="Address Line 2"
                                />

                                <Row>
                                    <Col size="sm-12 md-4">
                                <Input
                                    // value={this.state.billcity}
                                    onChange={this.handleInputChange}
                                    name="billcity"
                                    placeholder="City"
                                />
                                </Col>

                                <Col size="sm-12 md-4">

                                <Input
                                    type="number"
                                    // value={this.state.billzip}
                                    onChange={this.handleInputChange}
                                    // name="billzip"
                                    placeholder="Zipcode"
                                    pattern="[0-9]*"
                                />
                                </Col>
                                <Col size="sm-12 md-4">
                                {/* <Input
                                type="select" 
                                name="select" ></Input
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            > */}
                            </Col>
                            </Row>
                            </form>
                        </div>

                        <div className="divStyle pay-info">
                            <h4>Payment Information</h4>
                            <p>Stripe goes here</p>
                        </div>

                    </Col>

                    <Col size="md-5">
                        <div className="divStyle cart-info">
                            <h4>Cart</h4>
                            <table>
                                <tbody>
                                    <tr className="line">
                                        <th>Admission</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th> Amount</th>
                                    </tr>
                                    <tr className="line">
                                        <td>General</td>
                                        <td>$ {this.state.books.price} </td>
                                        <td>
                                            <Input
                                                className="qty"
                                                type="number"
                                                onChange={this.handleInputChange}
                                                name="qty"
                                                pattern="[0-9]*"
                                            />
                                        </td>
                                        <td>$ {this.state.books.price * this.state.books.qty}</td>
                                    </tr>

                                    <tr className="total">
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
                                        <th>Total</th>
                                        <th>$ XX.XX</th>
                                    </tr>
                                </tbody>
                            </table >
                        </div>
                    </Col>




                    <Col size="md-7">
                        <button className="book-btn btn btn-success btn-block" onClick={this.handleConfirmBook}><h4>Buy Now</h4></button>
                        <Link to="../../tours" className="book-btn btn btn-danger btn-block previous-btn" onClick={this.onClick}>
                            Previous </Link>
                    </Col>

                </Row>
            </Container>
        );


        //     getPurchaseForm = () => (
        // <Container fluid>
        //         <Row>
        //             <Col size="md-12">
        //                 <h4 className="text-white">
        //                     <span color="grey">
        //                         1. Confirm Tour Selection </span>
        //                     2. Purchase Tour
        //                 <span color="grey">
        //                         3. Thank You For Your Purchase
        //             </span>
        //                 </h4>
        //             </Col>
        //         </Row>

        //         <Row>
        //             <Col size="md-12">
        //                 <List>
        //                     <ListItem>
        //                         <h2>
        //                             <strong>
        //                                 Name:
        //                         </strong>
        //                             <br />
        //                             {this.state.books.name}
        //                             <br />
        //                         </h2>
        //                         <h4>
        //                             <strong>
        //                                 Operator:
        //                         </strong>
        //                             <br />
        //                         </h4>
        //                         <br />
        //                         <h4>
        //                             <strong>
        //                                 Address:
        //                         </strong>
        //                             <br />
        //                             {this.state.books.address}
        //                             <br />
        //                         </h4>
        //                         <h4>
        //                             <strong>
        //                                 Price:
        //                         </strong>
        //                             <br />
        //                             $ {this.state.books.price}
        //                             <br />
        //                         </h4>
        //                         <h4>
        //                             Quantity:
        //                         <br />
        //                             {this.state.books.Qty}
        //                             <br />
        //                         </h4>
        //                         <h3>
        //                             <br />
        //                             <strong>
        //                                 Total:
        //                         </strong>
        //                             <br />
        //                         </h3>
        //                     </ListItem>
        //                 </List>
        //             </Col>
        //         </Row>

        //         <Row>
        //             <Col size="md-12">
        //                 <form>
        //                     <Input
        //                         type="number"
        //                         value={this.state.qty}
        //                         onChange={this.handleInputChange}
        //                         name="qty"
        //                         placeholder="Number of Available Tickets"
        //                         pattern="[0-9]*"
        //                     />
        //                     <Input
        //                         type="number"
        //                         value={this.state.qty}
        //                         onChange={this.handleInputChange}
        //                         name="qty"
        //                         placeholder="Number of Available Tickets"
        //                         pattern="[0-9]*"
        //                     />
        //                     <Input
        //                         value={this.state.date}
        //                         onChange={this.handleInputChange}
        //                         name="date"
        //                         placeholder="Date"
        //                     />
        //                     <button className="book-btn btn btn-success btn-block" onClick={this.handlePurchaseSubmit}>
        //                         Purchase
        //                     </button>
        //                     <Link to="../../tours" className="book-btn btn btn-danger btn-block" onClick={this.handleBackBook}> Previous </Link>

        //                 </form>
        //             </Col>
        //         </Row>
        //     </Container>
        //     );

        // render() {
        //     if (this.state.isConfirmed === true) return this.getPurchaseForm();
        //         else return this.getConfirmationForm();
    }
};


export default BookNow;
