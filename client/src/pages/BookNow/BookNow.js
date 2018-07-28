import React from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./BookNow.css";
import { Input } from "../../components/Form";
import PresentGoogleMap from "../../components/PresentGoogleMap";
import { List, ListItem } from "../../components/List";
// import Math from "./Match";

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

    render() {
        return (
            <Container fluid>

                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>Almost Done!!!<br />
                                Please Confirm Your Purchase below....</h1>
                        </Jumbotron>
                    </Col>
                </Row>

                <Row>
                    <Col size="md-8 sm-12">

                        <div style={divStyle}>
                            <strong>Name:</strong> John Doe
                            <br />

                            <strong>Billing Address:</strong> {this.state.books.address}
                            <br />

                            <strong>You Are Purchasing</strong> 2 Tickets
                            <br />
                            <br />

                            {/* <strong>Tour Stops:</strong>
                        <ul>
                            <li>Marvin's Wonderful House of Pancakes</li>
                            <li>Marvin's Wonderful House of Pancakes</li>
                            <li>Marvin's Wonderful House of Pancakes</li>
                        </ul> */}

                            <table>

                                <tr>
                                    <th style={colStyle}>Admission</th>
                                    <th style={colStyle}>Price</th>
                                    <th style={colStyle}>Qty</th>
                                    <th style={colStyle}> Amount</th>
                                </tr>

                                <tr>
                                    <td style={colStyle}>Senior (65+)</td>
                                    <td style={colStyle}> $ {this.state.books.price} </td>
                                    <td style={colStyle}><button>-</button>4<button>+</button></td>
                                    <td style={colStyle}>$ <span>{this.state.books.price * 4}</span></td>
                                </tr>

                                <tr>
                                    <td style={colStyle}>Adult (18+)</td>
                                    <td style={colStyle}> $ {this.state.books.price} </td>
                                    <td style={colStyle}><button>-</button>2<button>+</button></td>
                                    <td style={colStyle}>$ <span>{this.state.books.price * 2}</span></td>
                                </tr>

                                <tr>
                                    <td style={colStyle}>Kids (Under 18)</td>
                                    <td style={colStyle}> $ {this.state.books.price} </td>
                                    <td style={colStyle}><button>-</button>1<button>+</button></td>
                                    <td style={colStyle}>$ <span>{this.state.books.price * 1}</span></td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Ticket Total</td>
                                    <td>$ XX.XX</td>
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

                            </table >
                            

                            {console.log("BookPrice:" + typeof this.state.books.price)}
                            {console.log("Qty:" + typeof this.state.Qty)}


                            <br />
                            <button className="btn-danger btn-block" onClick={this.props.onClick}>
                                Confirm Purchase
                            </button>

                        </div>

                    </Col>

                    <Col size="sm-12 md-4">
                        <PresentGoogleMap />
                    </Col >

                </Row>
            </Container>
        );
    }
}
export default BookNow;
