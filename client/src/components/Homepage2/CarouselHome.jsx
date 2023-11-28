import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const carouselHome = () => {
    return (
        <>
        <h1>This is carousel</h1>
            <Carousel>

                <div>
                    <img src="https://plus.unsplash.com/premium_photo-1680402879257-48ffbbc6db1d?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://plus.unsplash.com/premium_photo-1695855286527-d7aed7f99116?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1697537326120-471824a8a6c9?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </>
    )
}

export default carouselHome