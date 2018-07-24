import React, { Component } from 'react';
import { withScriptjs,withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


// const MapWithAMarker = withScriptjs(withGoogleMap(props =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     <Marker
//       position={{ lat: -34.397, lng: 150.644 }}
//     />
//   </GoogleMap>
// ));

// <MapWithAMarker
//   googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
//   loadingElement={<div style={{ height: `100%` }} />}
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
// />

class CreateGoogleMap extends Component {
  renderGoogleMap() {
    const key = "Rutgers Coding Bootcamp";
    const lat = 40.731843;
    const lng = -74.062608; 
    const markers = [{
      position: {
        lat,
        lng,
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
           <div style={{ height: "400px", width: "345px" }} />
          }
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={
            <div style={{ height: '100%' }} />
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