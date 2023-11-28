import React from 'react'
import "./WhatWeOffer.css"
import documents from "./stock/document authentication.gif"
import storedoc from "./stock/storedocumentdigially.gif"
import blockchain from "./stock/blockchain.gif"
import difLang from "./stock/diflang.gif"

import { gsap } from 'gsap'
import { useLayoutEffect, useEffect } from 'react'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase);
CustomEase.create("custom", "M0,0 C0.01,1.01 0,1 1,1.05");


const WhatWeOffer = () => {


    useEffect(() => {

        gsap.to(".imgOfferHomeDiv", {

            scale: 1,
            duration:2.5,
            stagger:0.1,
            ease:"custom",
            scrollTrigger: {
                trigger: ".imgOfferHomeDiv",
                toggleActions: "restart reverse restart none",
            },

        })

        return () => {

        }
    }, [])

    return (
        <div className='whatWeOfferHome'>
            <div className="wwofferHomeHead"><h1>What We Offer</h1></div>
            <div className="allOffersHomeImgs">
                <div className="imgOfferHomeDiv">
                    <img src={documents} alt="" />
                    <div className="offerDivLabelHome"><label htmlFor="">All your legal documents at one place</label></div>
                </div>
                <div className="imgOfferHomeDiv">
                    <img src={storedoc} alt="" />
                    <div className="offerDivLabelHome"><label htmlFor="">Summary of all the documents</label></div>
                </div>
                <div className="imgOfferHomeDiv">
                    <img src={difLang} alt="" />
                    <div className="offerDivLabelHome"><label htmlFor="">Access your documents in four different languages</label></div>
                </div>
                <div className="imgOfferHomeDiv">
                    <img src={blockchain} alt="" />
                    <div className="offerDivLabelHome"><label htmlFor="">Empowered by blockchain technology</label></div>
                </div>
            </div>
        </div>
    )
}

export default WhatWeOffer