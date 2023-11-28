import React, { useRef } from 'react'
import "./Style/FolderList.css"


const FolderList = (props) => {
    const folderMenu = useRef()

    const handleOnFolderMenuOver = ()=>{
        folderMenu.current.style.transform = "translateY(-20px)"
        folderMenu.current.style.opacity = "1"

    }
    const handleOnFolderMenuOut = ()=>{
        folderMenu.current.style.transform = "translateY(-30px)"
        folderMenu.current.style.opacity = "0"
    }
  return (
    <div className='folderNameDiv'>
        <div className="folderIconLeft"> <box-icon color = 'white' name='folder' ></box-icon></div>
        <div className="folderName">{props.i}</div>
        <div className="menuIconFolder" onMouseOver={handleOnFolderMenuOver} onMouseOut={handleOnFolderMenuOut}><i class="fa-solid fa-ellipsis-vertical"></i>
            <nav>
                <ul ref={folderMenu}>
                    <a className='' href=""><li>Download All</li></a>
                    <a className='' href=""><li>Add Access</li></a>
                </ul>
            </nav>

        </div>
    </div>
  )
}

export default FolderList