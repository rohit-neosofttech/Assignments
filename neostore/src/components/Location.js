import React from 'react'
import Header from './header/Header'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

function Location(props) {
    const mapStyles = {
        width: '100%',
        height: '100%',
      };
    return (
        <>
        <Header/>
        <div className="div-default">
            Location
            <Map 
                google={props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
                >
                <Marker position={{ lat: 48.00, lng: -122.00}} />
            </Map>
        </div>
        </>
    )
}

// export default Location
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDujXF32QT3242tqSeZWIPBVvtaAhX9XvA'
  })(Location);
