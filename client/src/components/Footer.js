import React from 'react'
import "./Style/Footer.css"
import logo from "./stock/logoBW.svg"

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footerLeft">
                <div className="logoCertCard"><img  src= {logo} alt="" /></div>
                <div className="rightSectionFooter">
                    {/* <div className="upperSectionRightFooter">
                        <ul>
                            
                            <a href=""> <li className="usrfLi">About Us</li> </a>
                            <a href=""> <li className="usrfLi">Home</li> </a>
                            <a href=""> <li className="usrfLi">Register</li> </a>

                        </ul>
                        <div className="upperSectionRightSearchFooter"><input className='footerSearchInp' type="text" /><button className = "loginBtn footerSearch">Search</button></div>
                    </div> */}
                    <hr />
                    <div className="lowerSectionRightFooter">
                        <ul>

                            <a href=""> <li className="lsrfLi">Location</li> </a>
                            <a href=""> <li className="lsrfLi">Contact</li> </a>
                            <a href=""> <li className="lsrfLi">&copy; 2023 | All rights reserved</li> </a>

                        </ul>
                        <div className="lowerSectionRightFooterIcons">
                            <div className="footerBoxIcons"><box-icon  className = "footerBoxIcons" color='white' type='logo' name='facebook'></box-icon></div>
                            <div className="footerBoxIcons"><box-icon className = "footerBoxIcons" color='white' name='twitter' type='logo' ></box-icon></div>
                            <div className="footerBoxIcons"><box-icon className = "footerBoxIcons" color='white' name='youtube' type='logo' ></box-icon></div>
                            <div className="footerBoxIcons"><box-icon className = "footerBoxIcons" color='white' name='instagram' type='logo' ></box-icon></div>
                            
                            
                            
                            
                        </div>
                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default Footer