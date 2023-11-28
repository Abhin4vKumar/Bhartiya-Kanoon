import React, { Fragment, useEffect } from 'react'
import UserDashLIst from './UserDashLIst'
import DashBoardNav from './DashBoardNav'
import FolderList from './FolderList'
import { useState, useRef, useContext } from 'react'
import Loader from './Loader'
import HackContext from '../Context/HackContext'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyCertificate } from '../actions/certificateAction'
import TableRowSections from './TableRowSections'
import Grids from './AfterLogin/GridSection/Grids'
import CertiListBoxes from './AfterLogin/GridSection/CertiListBoxes'


const UserDashboard = (props) => {
    const context = useContext(HackContext)
    const { isGrid, setIsGrid } = context
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userResult = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getMyCertificate(props.user.id));
    }, [dispatch, getMyCertificate, props.user.id])
    const certificatesResult = useSelector((state) => state.certificates);
    let loading = userResult.loading || certificatesResult.loading
    let isAuthenticated = userResult.isAuthenticated || certificatesResult.isAuthenticated
    if (!loading && !isAuthenticated) {
        navigate("/login");
    }
    const certificates = certificatesResult.certificates;
    // const context = useContext(HackContext)
    // const { certificateListState ,setCertificateListState} = context;
    // setCertificateListState(certificates)

    const folderAddBG = useRef()
    const folderAdd = useRef()

    const handleOnCertificatePopupOut = () => {
        folderAdd.current.style.display = "none"
        folderAddBG.current.style.display = "none"
    }
    // const heightDefine = () => {
    //     console.log("Inside the hight define")
    //     if (certificates && certificates.length > 0) {
    //         if (certificates.length > 3) {
    //             const str = 100 + (certificates.length - 3) * 10
    //             return str

    //         }
    //         else {
    //             return 100
    //         }

    //     }
    //     else {
    //         return 100
    //     }
    // }
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className='certiDiv' >


                    <div className="certiList">
                        <Grids />
                        <h1 style={{ textAlign: "center", marginTop: "2%" }}>Documents</h1>
                        {!isGrid && <table className='userDashTable'>

                            {certificates ?

                                (certificates.length != 0) ? certificates.map((i, index) => {
                                    console.log("--------------------------------------------------");
                                    console.log(i);
                                    console.log("--------------------------------------------------");
                                    console.log(i.summaryLink);
                                    return <TableRowSections i={i} givenBy={i.organisation.name} date={i.date} sno={index} certName={i.name} summLink={i.summaryLink} />

                                })


                                    : <h3 style={{ textAlign: "center", marginTop: "2%" }}>No Document Issued</h3> : <h3 style={{ textAlign: "center" }}>No Document Issued</h3>
                            }

                        </table>}
                        {isGrid &&
                            <div className="certiListType2">
                                {certificates ?

                                    (certificates.length != 0) ? certificates.map((i, index) => {
                                        return <CertiListBoxes i={i} givenBy={i.organisation.name} date={i.date} sno={index} certName={i.name} />

                                    })


                                        : <h3 style={{ textAlign: "center", marginTop: "2%" }}>No Documents Issued</h3> : <h3 style={{ textAlign: "center" }}>No Documents Issued</h3>
                                }
                            </div>

                        }


                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default UserDashboard