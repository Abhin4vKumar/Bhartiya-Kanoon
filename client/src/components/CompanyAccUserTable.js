import React from 'react'
import "./Style/CompanyUserTable.css"
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { revokeCertificate } from '../actions/certificateAction'

const CompanyAccUserTable = (props) => {
  const clickToCopyShow = useRef()
  const refToDel = useRef()
  const handleOnMouseOverAcc = () => {

    clickToCopyShow.current.style.opacity = "1"


  }
  const handleOnMouseOutAcc = () => {
    clickToCopyShow.current.style.opacity = "0"
    clickToCopyShow.current.innerText = "Click to copy";
  }
  const handleOnClickBtn = () => {
    let tempArr = props.userListCompanyAccState
    // get_index
    let index = 0;
    for (let i = 0; i < props.userListCompanyAccState.length; ++i) {
      console.log(props.userListCompanyAccState)
      if (props.userListCompanyAccState[i].sno === props.sno) {
        index = i;
        refToDel.current.style.opacity = "0.2"
        break;
      }
    }
    console.log(index)
    tempArr.splice(index, 1)
    //correct the order
    for (let i = 0; i < tempArr.length; ++i) {
      tempArr[i].sno = i + 1;
    }
    setTimeout(() => {
      props.setUserListCompanyAccState([...props.userListCompanyAccState], tempArr)
      refToDel.current.style.opacity = "1"


    }, 200);
    console.log(props.i)

  }
  const dispatch = useDispatch();
  const revokeCertif = () => {
    dispatch(revokeCertificate(props.user.workOrganisation, props.i._id));
  }
  const copyId = (e) => {
    navigator.clipboard.writeText(props.accountNo);
    clickToCopyShow.current.innerText = "Copied !";
  }
  return (
    <div ref={refToDel} className='companyUserTable'>
      <div className="snoCompanyAcc">{props.sno}</div>
      <div className="nameCompanyAcc">{props.name}</div>
      <div className="dateJoinedCompanyAcc">{props.dateJoin}</div>
      <div className="certificateGivenCompanyAcc">{props.certificateGiven}</div>
      <div className="accountNoCompanyAcc">
        <div className="accNo" onMouseOver={handleOnMouseOverAcc} onClick={copyId} onMouseOut={handleOnMouseOutAcc}> {props.accountNo}</div>
        <div ref={clickToCopyShow} className="clickToCopyAccNo"> Click to copy </div>
      </div>
      <div className="companyAccountClose"><button onClick={revokeCertif} className="companyAccountListCloseBtn"><i class="fa-regular fa-circle-xmark"></i></button></div>
    </div>
  )
}

export default CompanyAccUserTable