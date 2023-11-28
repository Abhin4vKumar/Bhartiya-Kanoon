import React from 'react'
import { useRef } from 'react'
import "./Style/PopupSectionUserOrg.css"

const UserOrg = () => {
    const userHr = useRef()
    const orgHr = useRef()
    const userBtn = useRef()
    const orgBtn = useRef()



    const handleOnPopUpMouseOverUser = ()=>{
        userHr.current.style.width = "70%"
        userBtn.current.style.transform = "scale(1.1)"
    }
    const handleOnPopUpMouseOverOrg = ()=>{
        orgHr.current.style.width = "70%"
        orgBtn.current.style.transform = "scale(1.1)"
    }
    const handleOnPopUpMouseOutUser = ()=>{
        userHr.current.style.width = "20%"
        userBtn.current.style.transform = "scale(1)"
    }
    const handleOnPopUpMouseOutOrg = ()=>{
        orgHr.current.style.width = "20%"
        orgBtn.current.style.transform = "scale(1)"
    }
  return (
    <div className='sectionPage'>
        <div className="PopupSectionUserOrg">
            <a  href="" className='popUpSecA'><button ref={userBtn} onMouseOver={handleOnPopUpMouseOverUser} onMouseOut={handleOnPopUpMouseOutUser} className='popUpSectionBtns'><div className="userSelect">USER <hr ref={userHr} className='popUpHrTag' /></div></button></a>
            
            <a  href="" className='popUpSecA'><button ref={orgBtn} onMouseOver={handleOnPopUpMouseOverOrg} onMouseOut={handleOnPopUpMouseOutOrg} className='popUpSectionBtns'><div className="orgSelect">ORGANISATION <hr ref={orgHr} className='popUpHrTag' /></div></button></a>
        </div>
    </div>
  )
}

export default UserOrg