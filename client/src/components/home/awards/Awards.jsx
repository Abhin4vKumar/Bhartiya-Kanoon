import React from "react"
import Heading from "../../common/Heading"
import { awards } from "../../data/Data"
import "./awards.css"
import { gsap } from 'gsap'
import { useLayoutEffect, useEffect, useRef } from 'react'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
const Awards = () => {

  useEffect(() => {

    gsap.to(".awardBox", {
      opacity:1,
      y:0,
      duration:1,
      stagger:0.5,
      scrollTrigger:{
        trigger:".awards",
        toggleActions: "restart reverse restart none",
      }
      // stagger:

    })
    
    return () => {
      
    }
  }, [])


  return (
    <>
      <section className='awards padding' id="awards">
        <div className='container awardCont'>
          <Heading title='Key Features' />

          <div className='content grid4 awardSection mtop'>
            {awards.map((val, index) => (
              <div className='box awardBox' key={index}>
                <div className='icon'>
                  <span>{val.icon}</span>
                </div>
                {/* <h1>{val.num}</h1> */}
                <h3>{val.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Awards
