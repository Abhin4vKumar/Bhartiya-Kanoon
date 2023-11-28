import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import { Link } from "react-router-dom"
import PlayBoy from "../../stock/playboy.png"
import { gsap } from 'gsap'
import { useLayoutEffect, useEffect, useRef } from 'react'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)


const Hero = () => {

  useEffect(() => {
    
    gsap.to(".container",{
      x:0,
      opacity:1,
      duration:1,
      delay:0.5,
      scrollTrigger:{
        trigger:".container",
        toggleActions: "restart reverse restart none",
      }
    })
    gsap.to(".playBoyImg", {
      opacity:1,
      y:0,
      x:-80,
      duration:2,
      delay:0.5,
      scrollTrigger:{
        trigger:".container",
        toggleActions: "restart reverse restart none",
      }
    })
  
    return () => {
      
    }
  }, [])
  
  return (
    <>
      <section className='hero'>
        <div className="darkerPage"></div>
        <div className="upperHero">
          <div className='container'>
            <Heading title='Secure Your Documents with the Power of Blockchain' subtitle='Experience unparalleled security, transparency, and efficiency with us, a revolutionary document storage and sharing platform built on blockchain technology.' />
            <Link className="getStartLink" to="/login"><button class="button-17 btn typeBtn getStart" role="button">Get Started</button></Link>
          </div>
          <div className="playBoy"><img className="playBoyImg" src={PlayBoy} alt="" /></div>

        </div>
      </section>
    </>
  )
}

export default Hero
