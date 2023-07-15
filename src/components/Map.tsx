import React from 'react'
import { GoogleMap, useJsApiLoader,useLoadScript } from '@react-google-maps/api';

export default function Map() {
  
    const {isLoaded} = useLoadScript({
        googleMapsApiKey : "AIzaSyBsUoWgKtfX_B00beDWGfyyJFv4NNdCpYs"
    });
     

  return (
    <>
    {isLoaded === true ? <Mapf /> : ""}
    </>
  )
}


function Mapf() {
    return <GoogleMap center={{lat:44,lng:0}} zoom={10} mapContainerClassName='map-container' />
}