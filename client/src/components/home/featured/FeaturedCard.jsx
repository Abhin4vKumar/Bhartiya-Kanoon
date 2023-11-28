import React from "react"
import { featured } from "../../data/Data"
import { gsap } from 'gsap'
import { useLayoutEffect, useEffect, useRef } from 'react'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)


const FeaturedCard = () => {



  useEffect(() => {

    gsap.to(".featureBox", {
      opacity:1,
      y:0,
      duration:0.8,
      stagger:0.3,
      scrollTrigger:{
        trigger:".docWithUs",
        toggleActions: "restart reverse restart none",
      }

    })
    
    return () => {
      
    }
  }, [])
  
  return (
    <>
      <div className='content docWithUs mtop'>
        {featured.map((items, index) => (
          <div className='box featureBox' key={index}>
            {/* <img src={items.cover} alt='' /> */}
            <i class={items.cover}></i>
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard
