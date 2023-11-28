import React from 'react'
import "./Style/DashBoardNav.css"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
} from "react-router-dom";
import { gsap } from 'gsap'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import QRPdf from './AfterLogin/QRpage/QRPdf';
gsap.registerPlugin(ScrollTrigger)
import { usePDF } from 'react-to-pdf';
import QRPdf2 from './AfterLogin/QRpage/QRPdf2';



const DashBoardNav = (props) => {
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    console.log(props.user);
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    let companyAcc = false;
    if (!loading) {
        if (isAuthenticated) {
            if (user.employee) {
                console.log(user.employee);
                companyAcc = true;
            }
        }
    }
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const handleOnHamburger = () => {
        if (sidebarOpen) {
            gsap.to(".dashBoardNavDiv", {

                width: "0",
                duration: 0.2
            })

            gsap.to(".dashBoardUl", {
                x: -100,
                duration: 0.1
            })
            gsap.to(".sideBarButton", {
                padding: "10px",
                duration: 0.2,
            })
            gsap.to("#sideBarbuttonInside", {
                padding: "5px",
                duration: 0.2
            })
            gsap.to(".certiDiv", {
                width: "100%",
                duration:"0.2"
            })
            gsap.to(".completeCompanyAccSection", {
                width: "100%",
                duration:"0.2"
            })
            gsap.to(".certiDiv", {
                width: "100%",
                duration:"0.2"
            })
            gsap.to(".notificationSection", {
                width:"98%",
                duration:"0.2"
            })
            setSidebarOpen(false)
        }
        else {
            gsap.to(".dashBoardNavDiv", {

                width: "12%",
                duration: 0.2,

                // delay: 5
            })
            gsap.to(".dashBoardUl", {
                x: 0,
                duration: 0.2,
            })
            gsap.to(".certiDiv",{
                width:"88%",
                duration:"0.2"
            })
            gsap.to(".completeCompanyAccSection",{
                width:"88%",
                duration:"0.2"
            })
            gsap.to(".notificationSection", {
                width:"88%",
                duration:"0.2"
            })
            setSidebarOpen(true)

        }
    }
    console.log(companyAcc)

    const [openQR, setOpenQR] = useState(false);
    
    const handleOpenQR = ()=>{
        setOpenQR(true);    

    }
    const handleCloseQR = () => {
        setOpenQR(false);
    }
    

    return (
        <div className='afterLoginSection'>

            <div className='dashBoardNavDiv'>
                <nav className='dashBoardNav'>
                    <div className="sideBarButton"><button id='sideBarbuttonInside' onClick={handleOnHamburger}><box-icon name='sidebar' color='#ffffff' ></box-icon></button></div>
                    <ul className='dashBoardUl'>
                        <div className="leftSideDash">
                            <Link className='dashBoardA' to="/afterlogin/dashboard"><li className='dashBoardLi' >Personal Account</li></Link>
                            {companyAcc ?
                                <Link className='dashBoardA' to="/afterlogin/companyacc"><li className='dashBoardLi' >Govt. Account</li></Link>
                                : <></>}
                            <Link className='dashBoardA' to="/afterlogin/notification"><li className='dashBoardLi' >Notifications</li></Link>
                            <Link className='dashBoardA' onClick={handleOpenQR}><li className='dashBoardLi' >QR Code</li></Link>

                        </div>
                    </ul>
                </nav>
            <QRPdf handleOpen = {handleOpenQR} handleClose = {handleCloseQR} open = {openQR} />
            {/* <QRPdf2/> */}

            </div>
            <Outlet className='afterLoginOutletSection' />
        </div>
    )
}

export default DashBoardNav