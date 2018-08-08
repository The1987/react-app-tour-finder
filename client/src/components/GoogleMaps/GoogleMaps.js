import React from 'react';
// import propTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';

class GoogleMaps extends React.Component {
    render() {
        let { address, latitude, longitude } = this.props;

        const MyMapComponent = compose(
            withProps({
                googleMapURL: ('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=' + process.env.REACT_APP_GOOGLEMAPS),
                loadingElement: (<div style={{ height: '100%' }} />),
                containerElement: (<div style={{ height: '600px', width: "345px" }} />),
                mapElement: (<div style={{ height: '100%', borderRadius: "1%" }} />)
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentWillMount() {
                    let geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ address: `${address}` }, function (results, status) {
                        // geocoder.geocode({ 'address': '605 jersey ave jersey city nj' }, function (results, status) {
                        if (status === 'OK') {
                            console.log('here result of geocoder', results)
                        } else {
                            console.log('Geocode was not successful for the following reason: ' + status);
                        };
                        let latitude = parseFloat(results[0].geometry.location.lat(),12);
                        let longitude = parseFloat(results[0].geometry.location.lng(),12);
                        console.log("address: " + address);
                        console.log("lat: " + latitude);
                        console.log("lng: " + longitude);
                    });
                }
            })
        )(props =>

            <GoogleMap
                defaultZoom={8}
                defaultCenter={new window.google.maps.LatLng(latitude, longitude)}
            >
                <Marker
                    position={{ latitude, longitude }} />
            </GoogleMap>
        );
        return (
            <MyMapComponent />
        );
    };
};

export default GoogleMaps;
