import React, { Component } from 'react';
import { withScriptjs,withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
// import API from "../../utils/API";


class CreateGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      isUpdate: false
    };
  }

  // componentDidMount() {
  //   API.getBook(this.props.match.params.id)
  //     .then(res => this.setState({ books: res.data }))
  //     .catch(err => console.log(err));
  // }

  renderGoogleMap() {
    const key = "Rutgers Coding Bootcamp";
    // const formattedAddress = {this.state.address};
    const lat = 40.731843;
    const lng = -74.062608; 
    const markers = [{
      position: {
        lat,
        lng,
        // formatted_address
      },
      key,
      defaultAnimation: 2,
    }];

    const GettingStartedGoogleMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        defaultCenter={{ lat, lng }}
        onClick={props.onMapClick}
      >
        {props.markers.map(marker => (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(marker)}
        />
      ))}
      </GoogleMap>
    )));

    return (
        <GettingStartedGoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPXkPNnkgMPqpYXUfGcTXcyyuKEjYnn8A&v=3.exp&libraries=geometry,drawing,places"
          containerElement={
           <div style={{ height: "400px", width: "345px", backgroundColor: "transparent"}} />
          }
          loadingElement={<div style={{ height: `100%`, borderRadius: "1%", backgroundColor: "transparent" }} />}
          mapElement={
            <div style={{ height: '545px', borderRadius: "1%"  }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
     );
    }

  render() {
    return (
     <div>
      {this.renderGoogleMap()}
     </div>
    );
  }
}

export default CreateGoogleMap;