import React from 'react'

const orgContent = (props) => {

    const handleOnShowCertificates = ()=>{
        props.certPopDisp.current.style.display = "block"
        props.certPopDispBack.current.style.display = "block"
        props.setCurrentUser(props.i)
    }
  return (
    <a onClick={handleOnShowCertificates} href="#">{props.i}</a>
  )
}

export default orgContent