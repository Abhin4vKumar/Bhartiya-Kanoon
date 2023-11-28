import React, { useEffect, useState } from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
import Price from "./price/Price"
import Recent from "./recent/Recent"
import Team from "./team/Team"
import { useContext } from 'react';
// import HackContext from '../Context/HackContext';
import HackContext from "../../Context/HackContext"

const Home = () => {
  const context = useContext(HackContext)
  const { navLi, setNavLi } = context;

  useEffect(() => {

    setNavLi( [{name:"Home", to:"/"},{name:"Features", to:"#awards"},{name:"About", to:"/about"},{name:"Contact", to:"/contact"}])

    return () => {

    }
  }, [])

  return (
    <>
      <Hero />
      <Featured />
      {/* <Recent /> */}
      <Awards />
      {/* <Location /> */}
      {/* <Team /> */}
      {/* <Price /> */}
    </>
  )
}

export default Home
