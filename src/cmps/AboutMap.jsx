import React from "react"
import GoogleMapReact from 'google-map-react'

const Map = ({ text }) => <div>{text}</div>

const markers = [ 
{ lat: 18.789660, lng: 98.984398, text: "Mister Toy Chiang Mai" },
{ lat: 35.689487, lng: 139.691711, text: "Mister Toy Tokyo" },
{ lat: 59.935413, lng: 30.337844, text: "Marker 3" }]

export function AboutMap(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  }

  return (

    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyANi6sU_sjpl2y2UB4cUaIfTeeqEAgAAiA" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Map
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  )
}