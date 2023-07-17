import React, { useState,useEffect } from 'react'
import Item from './Item'
import Ticket from "./../Ticket"
type Favorites = {
  fav_id: string;
  favTitle: string;
}
type props = {
    favorites : Favorites[] | null
}
export default function Fav({favorites}:props) {
 

useEffect(() => {
  console.log(favorites)
},[])



  return (
    <div>{favorites !== null ? favorites.map(item =>{
      return <Ticket title={item.favTitle} id={item.fav_id} fav={true} /> 
    }) : ""}</div>
  )
}
