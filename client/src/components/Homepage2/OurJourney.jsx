import React from 'react'
import TimelineComp from './Timeline'
import "./OurJourneyHome.css"

const OurJourney = () => {
  return (
    <div className='ourJourneyHome'>
        <div className="headingHomeJourney">
            <h1>Features</h1>
        </div>
        <TimelineComp/>
    </div>
  )
}

export default OurJourney