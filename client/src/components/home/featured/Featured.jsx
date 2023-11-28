import React from "react"
import Heading from "../../common/Heading"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container featureCont'>
          {/* <Heading  title='Your Document with us' /> */}
          <h1 className = "yourDocWithUs">Your Document with Us</h1>
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
