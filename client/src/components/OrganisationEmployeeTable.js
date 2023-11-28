import React from 'react'
import "./Style/CompanyUserTable.css"
import { useRef } from 'react'

const OrganisationEmployeeTable = (props) => {
  const clickToCopyShow = useRef()
  const refToDel = useRef()
  const handleOnMouseOverAcc = () => {

    clickToCopyShow.current.style.opacity = "1"
    // clickToCopyShow.current.style.transform = "scaleY(1)"


  }
  const handleOnMouseOutAcc = () => {
    clickToCopyShow.current.style.opacity = "0"
  }
  const handleOnClickBtn = () => {
    let tempArr = props.employeeListState
    // get_index
    let index = 0;
    for (let i = 0; i < props.employeeListState.length; ++i) {
      console.log(props.employeeListState)
      if (props.employeeListState[i].accountNumber === props.accountNo) {
        index = i;
        refToDel.current.style.opacity = "0.2"
        break;
      }
    }
    console.log(index)
    tempArr.splice(index, 1)
    // correct the order
    // for (let i = 0; i < tempArr.length; ++i) {
    //   tempArr[i].sno = i + 1;
    // }
    setTimeout(() => {
      props.setEmployeeListState([...props.employeeListState], tempArr)
      refToDel.current.style.opacity = "1"


    }, 200);
    console.log(props.i)

  }
  return (
    <div ref={refToDel} className='companyUserTable'>
      {/* <div className="snoCompanyAcc">{props.sno}</div> */}
      <div className="nameCompanyAcc">{props.name}</div>
      <div className="dateJoinedCompanyAcc">{props.dateJoin}</div>
      
      <div className="accountNoCompanyAcc">
        <div className="accNo" onMouseOver={handleOnMouseOverAcc} onMouseOut={handleOnMouseOutAcc}> {props.accountNo}</div>
        <div ref={clickToCopyShow} className="clickToCopyAccNo"> Click to copy </div>
      </div>
      <div className="companyAccountClose"><button onClick={handleOnClickBtn} className="companyAccountListCloseBtn"><i class="fa-regular fa-circle-xmark"></i></button></div>
    </div>
  )
}

export default OrganisationEmployeeTable