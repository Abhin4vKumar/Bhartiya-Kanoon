import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import HackContext from '../Context/HackContext'
import "./Style/ClickAfterCompany.css"
import UserDashboard from './UserDashboard'
import UserDashLIst from './UserDashLIst'


const ClickAfterCompanyUser = () => {
  const context = useContext(HackContext)
  const { certificateListState } = context;


  return (
    <div>
        <div className="upperCACUserSection">
            <div className="picArea"><img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" /></div>
            <div className="upperRightClickSectionDiv">
                <div className="upperRightClickSection">
                    <div className="whoseCerti">Aditya's Certificate</div>
                    <div className="addCertiAfterClickBtnDiv"><button className='addCertiBtnClick'><box-icon type='solid' name='plus-circle'></box-icon> Add Certificate </button></div>

                </div>

            </div>

        </div>
        <UserDashboard/>
        {/* <div className="userDownSectionCerti">
          {certificateListState.map((i) =>{
            return <UserDashLIst i={i} givenBy={i.givenBy} date={i.date} key={i} sno={i.sNo} certName={i.certName} partOfOrg={i.partOfOrg} />
          })}
        </div> */}

    </div>
  )
}

export default ClickAfterCompanyUser