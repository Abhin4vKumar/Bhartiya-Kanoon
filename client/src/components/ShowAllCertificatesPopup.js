import React from 'react'
import UserDashLIst from './UserDashLIst';
import { useRef } from 'react';

const certificateList = [
    {
      name: "John Doe",
      certName: "John Doe's Certificate",
      partOfOrg: true,
    },
    {
      name: "Jane Doe",
      certName: "Jane Doe's Certificate",
      partOfOrg: false,
    },
    {
      name: "Peter Smith",
      certName: "Peter Smith's Certificate",
      partOfOrg: true,
    },
    {
      name: "Susan Jones",
      certName: "Susan Jones's Certificate",
      partOfOrg: false,
    },
    {
      name: "David Williams",
      certName: "David Williams's Certificate",
      partOfOrg: true,
    },
    {
      name: "Mary Brown",
      certName: "Mary Brown's Certificate",
      partOfOrg: false,
    },
  ];


const ShowAllCertificatesPopup = (props) => {
  return (
      <div ref={props.certPopDisp} className="certiList popUpCertiList">
        <div className="addCertDiv">
            <button className='addCertificate' >Add Certificate</button>

        </div>
        {certificateList.map((i)=>{
            return <UserDashLIst i = {i} key = {i} sno = {i.sNo} certName = {i.certName} partOfOrg = {i.partOfOrg} />
        })}
    </div>
  )
}

export default ShowAllCertificatesPopup