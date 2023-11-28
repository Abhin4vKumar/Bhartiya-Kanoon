import React from "react";
import HackContext from "./HackContext";
import { useState } from "react";


const HackState = (props) => {
    const [navLi, setNavLi] = useState(
        [{name:"Home", to:"/"},{name:"Features", to:"/"},{name:"About", to:"/about"},{name:"Contact", to:"/contact"}]
    )
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [certificateListState, setCertificateListState] = useState()
    const [employeeListState, setEmployeeListState] = useState()
    const [isGrid, setIsGrid] = useState(false)

    return (
        <HackContext.Provider value={{ certificateListState, setCertificateListState,employeeListState, setEmployeeListState, navLi, setNavLi ,account, setAccount,contract, setContract ,provider, setProvider, isGrid, setIsGrid}}>
            {props.children};
        </HackContext.Provider>
    )
}

export default HackState