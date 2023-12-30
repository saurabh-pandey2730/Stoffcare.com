// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


// const GoogleMaps = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);

// useEffect(()=>{
//     if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentLocation({ latitude, longitude });
//           },
//           (error) => {
//             console.log(error);
//           }
//         );
//       } else {
//        console.log('GeoLocation is not available on your browser...')
//       }
// },[])

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAjOzltMNruXh1WWbX4oR1mJiuIs7A7328" >
//       {currentLocation && (
//         <GoogleMap
//           mapContainerStyle={{
//             width: '50%',
//             height: '500px',
//             marginLeft:'25%',
//             marginTop:'-14.5%'

//           }}
//           center={currentLocation}
//           zoom={14}
//         >
//           <Marker position={currentLocation} />
//         </GoogleMap>
//       )}
//     </LoadScript>
//   );
// };


// export default GoogleMaps;

import React from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';
import { useEffect,useState } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px'
};


function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAjOzltMNruXh1WWbX4oR1mJiuIs7A7328"
  })

    const [currentLocation, setCurrentLocation] = useState(null);

useEffect(()=>{
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
       console.log('GeoLocation is not available on your browser...')
      }
})

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(currentLocation);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        
      >
        <Marker position={currentLocation} />
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMaps)

