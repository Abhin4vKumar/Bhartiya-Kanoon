import React from 'react'
import "./Style/Account.css"

const personalDetail = {
  firstName: "Aman",
  lastName: "Pandey",
  email: "aman.py@gmail.com",
  role: "Product Engineer",
  country: "India"
}

const Account = () => {
  return (
    <div className='AccountDash'>
      <div className="myProfile">
        <div className="myProfileContents">
          <div className="myProfileInsideContainer">
            <div className="myProfileLeftSide">
              <div className="accountNameLabel"><label htmlFor="">Name: </label></div>
              <div className="accountEmailLabel"><label htmlFor="">Email: </label> </div>
              <div className="accountRoleLabel"><label htmlFor="">Role: </label> </div>
              <div className="accountCountryLabel"><label htmlFor="">Country: </label> </div>

            </div>
            <div className="myProfileRightSIde">
              <div className="accountNameIs"> <span className='firstName'>{personalDetail.firstName}</span>  <span className='firstName'>{personalDetail.lastName}</span> </div>
              <div className="accountEmailIs">{personalDetail.email}</div>
              <div className="accountRoleIs">{personalDetail.role}</div>
              <div className="accountCountryIs">{personalDetail.country}</div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Account