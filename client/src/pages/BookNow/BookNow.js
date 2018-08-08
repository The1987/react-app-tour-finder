import React from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import "./BookNow.css";
import { Input } from "../../components/Form";
import { Link } from "react-router-dom";
import aws from 'aws-sdk';


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
            isPurchased: false,
            checkouttotal: ""
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
            this.setState({checkouttotal: 0,
             qty: 0});
    };


    // componentWillMount() { 
    //     this.this.state.books.price * this.state.books.qty 
    // };

    // checkout(){
    //     this.setState({
    //         checkouttotal
    //     });
    // }



    handleChange = event => {
        const { name, type, value } = event.target;
        // input value conditioner----integer to number
        const updatedBook = { ...this.state.books }
        // new add
        let Value = type === 'number' ? parseInt(value, 10) : value;
        // new add
        const Qty = parseInt(this.state.books.qty, 10);

        const updatedTotal = (Qty + 1) * this.state.books.price;
        console.log("Qty test on change: " + updatedTotal);

        // new add
        updatedBook[name] = Value
        this.setState({
            books: updatedBook,
            // new add
            checkouttotal: updatedTotal,
        });
    };

    handleInputChange = event => {
        const { name, type, value } = event.target;
        // input value conditioner----integer to number
        const updatedBook = { ...this.state.books }
        // new add
        let Value = type === 'number' ? parseInt(value, 10) : value;
        // new add
        // const Qty = parseInt(this.state.books.qty, 10);

        // const updatedTotal = (Qty + 1) * this.state.books.price;
        // console.log("Qty test on change: " + updatedTotal);

        // new add
        updatedBook[name] = Value
        this.setState({
            books: updatedBook,
            // new add
            // checkouttotal: updatedTotal,
        });
    };


    // handleTotalUpdate(checkouttotal) {
    //     // const { name, type, value } = event.target;
    //     // const updatedBookTotal = { ...this.state.books };
    //     // let Value = type === 'number' ? parseInt(value, 10) : value;
    //     const purchaseTotal =  {this.state.books.price * this.state.books.qty}
    //     this.setState({ checkouttotal: purchaseTotal })
    // };


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

    sendEmail = event => {
        aws.config.update({
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESSKEYID,
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
            Placeholder: ""
        });
        const ses = new aws.SES({ apiVersion: 'latest' });
        return new Promise((resolve, reject) => {
            ses.sendEmail(
                {
                    Source: 'developers.act@gmail.com',
                    Destination: {
                        CcAddresses: ['developers.act@gmail.com'],
                        ToAddresses: ['andrewmflak@gmail.com', 'mrchrishantis@gmail.com'],
                    },
                    Message: {
                        Subject: {
                            Data: "Tour Booker: Order # 55546 Thank you for your purchase!",
                        },
                        Body: {
                            Html: {
                                Data: "<h1>Thank you for your recent purchase</h1><p>Your card has been charged for the amount of <strong>$134.65</strong> for the <strong>" + this.state.books.name + "</strong> on <strong>" + this.state.books.date + "</strong>.<br /><br />Tour Company: ACME Corp Operates <br />Tour Guide: Steve M. <br />Phone Number: 1-800-734-6767 <br />Email: ACME@example.com<br />Website: www.ACME.com <br/><br/>Please arrive promptly at " + this.state.books.time + "AM at " + this.state.books.address + ". <br /><br />If you need help or assistance getting to the starting location please call 1-800-734-6767 or email ACME@example.com<br /><br />Enjoy,<br /><br />The Tour Booker Team"
                            },
                        },
                    },
                    ReplyToAddresses: ['developers.act@gmail.com'],
                },
                (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info);
                    }
                },
            );
        });
    };


    // node mailer nodeJS solution

    // event.preventDefault();
    // let name = this.state.books.name;
    // let email = this.state.purchase.email;



    //     axios({
    //     method: "POST",
    //     url: "http://localhost:3005/send",
    //     data: {
    //         name: name,
    //         email: email,
    //         messsage: message
    //     }
    // }).then((response) => {
    //     if (response.data.msg === 'success') {
    //         alert("Message Sent.");
    //         this.resetForm()
    //     } else if (response.data.msg === 'fail') {
    //         alert("Message failed to send.")
    //     }
    // })

    // angular AWS call SES

    // import * as aws from 'aws-sdk';
    // import { SES } from 'aws-sdk'
    // import { AwsConfig } from '../../../awsConfig';

    // @Component({
    //   selector: 'app-contact',
    //   templateUrl: './contact.component.html',
    //   styleUrls: ['./contact.component.scss']
    // })
    // export class ContactComponent {

    //   private _ses: SES;

    //   constructor() {
    //     this.configureSES();
    //   }

    //   public sendMessage(): void {
    //     let params;
    //       params = {
    //         Destination: {
    //           ToAddresses: [ 'recipient@sample.com' ]
    //         },
    //         Message: {
    //           Body: {
    //             Html: {
    //               Charset: 'UTF-8',
    //               Data: '<h1>HTML needed inside of your email</h1>'
    //             },
    //             Text: {
    //               Charset: 'UTF-8',
    //               Data: 'Or you can use plain text'
    //             }
    //           },
    //           Subject: {
    //             Charset: 'UTF-8',
    //             Data: 'Sample message subject'
    //           }
    //         },
    //         Source: 'sender@sample.com' // Must be registered with AWS
    //       };
    //       this.sendEmail(params);
    //     }
    //   }

    //   private configureSES(): void {
    //     aws.config.credentials = {
    //       accessKeyId: AwsConfig.accessKeyId,
    //       secretAccessKey: AwsConfig.secretAccessKey
    //     };
    //     aws.config.update({
    //       region: AwsConfig.region
    //     });
    //     this._ses = new SES({
    //       apiVersion: '2010-12-01'
    //     });
    //   }

    //   private sendEmail(params): void {
    //     this._ses.sendEmail(params, function(err, data) {
    //       if (err) {
    //         console.log(err, err.stack);
    //       } else {
    //         console.log(data);
    //       }
    //     });
    //   }
    // }


    // 


    handlePurchaseSubmit = event => {
        console.log("test-name: " + this.state.books.name);
        console.log("test-address: " + this.state.books.address);
        console.log("test Qty" + this.state.books.qty * this.state.books.price);
        let Qty = this.state.books.qty * this.state.books.price;
        event.preventDefault();
        if (this.state.books.name && this.state.books.address) {
            API.purchasePost({
                name: this.state.books.name,
                address: this.state.books.address,
                price: this.state.books.price,
                qty: this.state.books.qty,
                checkouttotal: Qty,
                isConfirmed: this.state.books.isConfirmed,
                isPurchased: this.state.books.isPurchased
                // checkouttotal: this.state.books.checkouttotal,
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
                <div className="cart">
                    <Link to="../../tours" className="btn buy-button-text previous-btn" onClick={this.handleBackBook}> {'<<<   '}Continue Browsing </Link>
                    <Row>
                        <Col size="md-7">
                            <div className="divStyle tour-info effect6">
                                <h4 className="cart-h4">Tour Information</h4>
                                <strong className="cart-info-label">Tour Name:</strong> {this.state.books.name} <br />
                                <strong className="cart-info-label">Tour Date:</strong> {this.state.books.date} <br />
                                <strong className="cart-info-label">Start Location:</strong> {this.state.books.address} <br />
                                <strong className="cart-info-label">Start Time:</strong> {this.state.books.time}
                            </div>

                            <div className="divStyle bill-info effect6">
                                <h4 className="cart-h4">Billing Information</h4>
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
                                        pattern="[1-0]*"
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
                                        <Col size="md-4">
                                            <Input
                                                // value={this.state.billcity}
                                                onChange={this.handleInputChange}
                                                name="billcity"
                                                placeholder="City"
                                            />
                                        </Col >
                                        <Col size="md-4">
                                            <Input
                                                // value={this.state.billzip}
                                                onChange={this.handleInputChange}
                                                name="billzip"
                                                placeholder="Zipcode"
                                                pattern="[1-0]*"
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

                            <div className="divStyle pay-info effect6">
                                <h4 className="cart-h4">Payment Information</h4>


                                {/* <StripeProvider className="example" apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR"> */}
                                {/* <div className="example">
                                    <Elements>
                                        <CheckoutForm />
                                    </Elements>
                                </div>
                            </StripeProvider>  */}
                            </div>

                        </Col>

                        <Col size="md-5">
                            <div className="divStyle cart-info effect6">
                                <h4 className="cart-h4">Cart</h4>
                                <table>
                                    <tbody>
                                        <tr className="line">
                                            <th className="cart-info-label">Admission</th>
                                            <th className="cart-info-label">Price</th>
                                            <th className="cart-info-label">Qty</th>
                                            <th className="cart-info-label"> Amount</th>
                                        </tr>
                                        <tr className="line">
                                            <td>General</td>
                                            <td>$ {this.state.books.price} </td>
                                            <td>
                                                <Input
                                                    className="qty"
                                                    min="1"
                                                    step="1"
                                                    type="number"
                                                    onChange={this.handleChange}
                                                    name="qty"
                                                    pattern="[1-0]*"
                                                />
                                            </td>
                                            <td>$ {this.state.books.price * this.state.books.qty}</td>
                                        </tr>

                                        <tr className="total">
                                            <td></td>
                                            <td></td>
                                            <td>Subtotal</td>
                                            <td>$ {this.state.books.qty * this.state.books.price}</td>
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
                                            <th>$ {this.state.books.qty * this.state.books.price}</th>
                                        </tr>
                                    </tbody>
                                </table >
                            </div>
                        </Col>

                        <Col size="md-7">
                            <button className="book-btn btn btn-success btn-block btn-lg hvr-grow-shadow-2" onClick={this.handlePurchaseSubmit}>
                                <span>Buy Now </span>
                            </button>



                            {/* <button className="book-btn btn btn-success btn-block" onClick={this.handleConfirmBook}><h4>Buy Now</h4></button>
                        <Link to="../../tours" className="book-btn btn btn-danger btn-block previous-btn" onClick={this.onClick}>
                            Previous </Link> */}
                        </Col>
                    </Row>
                </div>
            </Container>
        );

        // render() {
        //     if (this.state.isConfirmed === true) return this.getPurchaseForm();
        //         else return this.getConfirmationForm();
    }
};


export default BookNow;