import React from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const LinkOfNavbar = (props) => {
    const linkNav = useRef()
    const handleOnLinkMouseOverNav = () => {
        // console.log(first)
        // console.log(linkNav)
        linkNav.current.style.width = "100%"
        linkNav.current.style.opacity = "1"

    }
    const handleOnLinkMouseOutNav = ()=>{
        linkNav.current.style.width = "0%"
        linkNav.current.style.opacity = "0"
    }
    return (
        <Link onMouseOver={handleOnLinkMouseOverNav} onMouseOut = {handleOnLinkMouseOutNav} to={props.i.to} className="navA" href="">
            <li 
                dangerouslySetInnerHTML={{ __html: props.i.name }}
                className="navLi"
            ></li>
            <hr ref={linkNav} className="liHrNav" />
        </Link>
    )
}

export default LinkOfNavbar