import React from 'react'
import { useState, useRef, useContext } from 'react';
import CompanyAccUserTable from './CompanyAccUserTable';
import HackContext from '../Context/HackContext';
import OrganisationEmployeeTable from './OrganisationEmployeeTable';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../actions/organisationAction';
import { Form } from 'react-router-dom';




const OrgDash = (props) => {
    const bgRef = useRef()
    const addUserRef = useRef()
    const viewCertRef = useRef()
    const dispatch = useDispatch();
    // const context = useContext(HackContext)
    // const { certificateListState, employeeListState, setEmployeeListState } = context;
    const orgResult = useSelector((state)=>state.organisation);
    const [pdfFile, setPdfFile] = useState()
    const employeesList = orgResult.organisation.employeesList;
    const handleOnBackClick = () => {
        bgRef.current.style.display = "none"
        addUserRef.current.style.display = "none"
        viewCertRef.current.style.display = "none"

    }

    const handleOnViewCert = () => {
        bgRef.current.style.display = "block"
        viewCertRef.current.style.display = "flex"
    }
    const handleOnPopupClick = () => {
        bgRef.current.style.display = "block"
        addUserRef.current.style.display = "flex"

    }
    const handleOnViewClick = () => {
        

    }
    const [usrAccNo , setUsrAccNo] = useState();
    const addEmp = (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.set("userAcc" , usrAccNo);
        dispatch(addEmployee(data));
    }
    const handleUsrAccChange = (e) =>{
        setUsrAccNo(e.target.value);
    }
    return (
        <div>

            <div ref={bgRef} onClick={handleOnBackClick} className="companyBackArea"></div>
            <div ref={addUserRef} className="addUserPopupWindow">
            <label htmlFor="acc_no">Account Number: </label>
                <div className="inputAddUserPopupDiv">
                    <input className='inputOrgDash' type="text" onChange={handleUsrAccChange} />
                </div>
                <div className="btnAddUserPopupDiv">
                    <button className='button-4' onClick={addEmp}>Add</button>
                </div>
            </div>

            <div ref={viewCertRef} className="addUserPopupWindow">
                <label htmlFor="">Certificate ID</label>
                <div className="inputAddUserPopupDiv">
                    <input type="text" />
                </div>
                <div className="btnAddUserPopupDiv">
                    <button onClick={handleOnViewClick} >View</button>
                </div>
                <div className="certificatePdfView">

                </div>
            </div>



            <div className="topNavCompanyItems">
                <div className="accountListSearchCompanyDiv">
                    <input type="text" className="companyAccSearchList" /> <button className="accountListSearchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div onClick={handleOnPopupClick} className="accAddUser"><button className='accAddUserBtn button-4'>Add Employee</button></div>
                {/* <div className="viewCertUser accAddUser"><button onClick={handleOnViewCert} className="viewCertUserBtn">View Certificate</button></div> */}


            </div>

            {employeesList ? (employeesList.length !=0 ) ? employeesList.map((i) => {
                return <OrganisationEmployeeTable i={i}  name={i.name} dateJoin={i.joinedOn} accountNo={i.acc_no} />
            }) :<>No Employees Hired</> : <>No Employees Hired</> }
        </div>
    )
}

export default OrgDash