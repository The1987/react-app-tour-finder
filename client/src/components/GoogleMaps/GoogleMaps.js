// import React from "react";
// import PropTypes from "prop-types";
// import {
//     withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     Marker,
// } from "react-google-maps";

// let map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });

// class GoogleMaps extends React.Component {
//     render () {

//         return (

// <div>{<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=161%20Newkirk%2C%20Jersey%20City%20NJ&key=AIzaSyBPXkPNnkgMPqpYXUfGcTXcyyuKEjYnn8A" allowfullscreen></iframe>}</div>
        
//         );
    
// }

//         const GoogleMaps = withScriptjs(withGoogleMap(props =>
//             <GoogleMap
//                 defaultZoom={8}
//                 defaultCenter={{ lat: -34.397, lng: 150.644 }}
//             >
//                 <Marker
//                     position={{ lat: -34.397, lng: 150.644 }}
//                 />
//             </GoogleMap>
//         ));
//         return (
//             <div>
//                 <GoogleMaps
//                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPXkPNnkgMPqpYXUfGcTXcyyuKEjYnn8A&v=3.exp&libraries=geometry,drawing,places"
//                     loadingElement={< div style={{
//                         height: `100%`
//                     }} />}
//                     containerElement={< div style={{ height: `400px` }} />}
//                     mapElement={< div style={{ height: `100%` }} />}
//                 />
//             </div>
//         )
//     }
// }


// GoogleMaps.props = {
//     GoogleMapURL: PropTypes.string,
//     loadingElement: PropTypes.element
// }

// export default GoogleMaps;