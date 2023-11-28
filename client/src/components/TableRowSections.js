import React, { useRef, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { revokeAccess, shareAccess } from "../actions/certificateAction";
import HackContext from "../Context/HackContext";
import axios from "axios";
import { gsap } from 'gsap'
import { useLayoutEffect, useEffect } from 'react'
import { ScrollTrigger, CustomEase, Power3 } from 'gsap/all'
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
gsap.registerPlugin(ScrollTrigger)
const GetIpfsUrlFromPinata = (pinataUrl) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
    return IPFSUrl;
};

const TableRowSections = (props) => {
    useEffect(() => {
      
        gsap.to(".dashBoardRow",{
            opacity:1,
            // y:0,
            height:"10vh",
            stagger: 0.2,

        })
        
      return () => {
        
      }
    }, [])
    

    const handleOnMenuHover = () => {
        menuVisible.current.style.visibility = "visible";
        menuVisible.current.style.opacity = "1";
        menuVisible.current.style.zIndex = "10";
        certiMenuRef.current.style.zIndex = "10"

    };
    const handleOnMenuOut = () => {
        menuVisible.current.style.opacity = "0";
        menuVisible.current.style.zIndex = "-2";
        certiMenuRef.current.style.zIndex = "-2"
        menuVisible.current.style.visibility = "hidden";
    };

    const [AddressVar, setAddressVar] = useState("");
    const [revokeAddressVar, setRevokeAddressVar] = useState();
    const handleAddressVarChange = (e) => {
        setAddressVar(e.target.value);
    }

    const handleRevokeAddressVarChange = (e) => {
        setRevokeAddressVar(e.target.value);
    }
    const context = useContext(HackContext);
    const { provider, account, contract } = context;
    const giveAccessFncn = async (e) => {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const certToken = props.i.cert_id;
        let check = false;
        // getting all certificates
        let allCerti = await contract.getallCerti(address);
        const items = await Promise.all(allCerti.map(async i => {
            if (i.tokenId.toNumber() === Number(certToken) && !check) {
                check = true;
                await contract.giveAccess(i.tokenId, AddressVar)
            }
        }))
    };

    const revokeAccessFncn = async () => {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const certToken = props.i.cert_id;
        let check = false;
        // getting all certificates
        let allCerti = await contract.getallCerti(address);
        const items = await Promise.all(allCerti.map(async i => {

            if (i.tokenId.toNumber() === Number(certToken) && !check) {
                check = true;
                await contract.cancelAccess(i.tokenId, revokeAddressVar)

            }
        }))
    }

    const viewCertFuncn = async (e) => {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const certToken = props.i.cert_id;
        let check = false;
        // getting all certificates
        let allCerti = await contract.getallCerti(address);
        const items = await Promise.all(allCerti.map(async i => {

            if (i.tokenId.toNumber() === Number(certToken) && !check) {
                check = true;
                var tokenURI = await contract.tokenURI(i.tokenId);
                tokenURI = GetIpfsUrlFromPinata(tokenURI);
                let meta = await axios.get(tokenURI);
                meta = meta.data;

                let item = {
                    tokenId: i.tokenId.toNumber(),

                    owner: i.owner,
                    org: i.organization,
                    employee: i.employee,

                    image: meta.image,
                    name: meta.name,
                    description: meta.description,
                }
                console.log(item.name);
                console.log(item.image);
                window.open(item.image);
            }
        }))
    };

    const viewSummaryFunction = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyChRhfdj2OHN5iOyrl1oO5Gl9A7zxJGu5Y",
            authDomain: "bhartiya-kanoon-1.firebaseapp.com",
            databaseURL: "https://bhartiya-kanoon-1-default-rtdb.firebaseio.com",
            projectId: "bhartiya-kanoon-1",
            storageBucket: "bhartiya-kanoon-1.appspot.com",
            messagingSenderId: "127739662566",
            appId: "1:127739662566:web:aaa5514db3415fd100ab27",
            measurementId: "G-J1JW88WNW6"
        };
        const fapp = initializeApp(firebaseConfig);
        const newFileName = props.i.cert_id + 's';
        const storage = getStorage(fapp);
        const storageRef = ref(storage , newFileName);
        // const url = getDownloadURL(storageRef);
        getDownloadURL(storageRef)
        .then((url) => {
            window.open(url);
            // const xhr = new XMLHttpRequest();
            // xhr.responseType = 'blob';
            // xhr.onload = (event) => {
            // const blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();

            // // Or inserted into an <img> element
            // const img = document.getElementById('myimg');
            // img.setAttribute('src', url);
        })
        .catch((error) => {
            // Handle any errors
            window.open(props.i.ipfsLink);
        });
        // window.open(url);
    };
    
    const popUpAddAccess = useRef();
    const popUpAddAccessBg = useRef();
    const popUpAddAccessList = useRef();
    const popUpAddAccessListBg = useRef();
    const menuVisible = useRef();
    const certiMenuRef = useRef()
    const labelForInp = useRef()
    const labelForInp2 = useRef()

    const handleOnAccessPopUpRemove = () => {
        popUpAddAccess.current.style.display = "none"
        popUpAddAccessBg.current.style.display = "none"
    }
    const handleAccessListPopUpShow = () => {
        popUpAddAccessList.current.style.display = "flex";
        popUpAddAccessListBg.current.style.display = "block";
    }
    const handleAccessListPopUpRemove = () => {
        popUpAddAccessList.current.style.display = "none";
        popUpAddAccessListBg.current.style.display = "none";
    }

    const handleOnAccessPopUpShow = () => {
        popUpAddAccess.current.style.display = "flex"
        popUpAddAccessBg.current.style.display = "block"
        console.log("clikced")
    }
    const openPopup = () => {
        handleOnAccessPopUpShow()
    };
    const handleGetId = () => {
        navigator.clipboard.writeText(props.i.cert_id);
    };

    const handleFocusWorkInp = ()=>{
        // console.log("focused")
        // labelForInp.current.style.top = "-20px";
        // labelForInp.current.style.left = "0";
        // labelForInp.current.style.color = "#bdb8b8";
        // labelForInp.current.style.fontSize = "12px";
        
    }

    const handleOnFocus2 = ()=>{
        // labelForInp2.current.style.top = "-20px";
        // labelForInp2.current.style.left = "0";
        // labelForInp2.current.style.color = "#bdb8b8";
        // labelForInp2.current.style.fontSize = "12px";
    }


    return (
        <tr className='dashBoardRow'>
            <div onClick={handleOnAccessPopUpRemove} ref={popUpAddAccessBg} className="popBack"></div>

            <div ref={popUpAddAccess} className="popUpWindowDash">
                <div className="inpWindowPopUpDiv">
                    <input onFocus = {handleFocusWorkInp} className="inpWindowPopUp" value={AddressVar} onChange={handleAddressVarChange} type="text" />
                    <label ref= {labelForInp} className = "inpWindowUserLabel">User's Account</label>
                </div>
                <div className="popUpBtnAddAccess">
                    <button className="button-4" onClick={giveAccessFncn}>Add Access</button>
                    
                </div>
            </div>
            <div onClick={handleAccessListPopUpRemove} ref={popUpAddAccessListBg} className="popBack"></div>

            <div ref={popUpAddAccessList} className="popUpWindowDash">
                <div className="inpWindowPopUpDiv">
                    <input type="text" onFocus = {handleOnFocus2} className="inpWindowPopUp" onChange={handleRevokeAddressVarChange} value={revokeAddressVar} />
                    <label ref= {labelForInp2} className = "inpWindowUserLabel">User's Account</label>
                </div>
                <div className="popUpBtnAddAccess">
                    <button className="button-4" onClick={revokeAccessFncn}>Revoke Access</button>
                </div>
            </div>
            <td>{props.sno+1}</td>
            <td>{props.certName}</td>
            <td>{props.date.slice(0, 10)}</td>
            <td>{props.givenBy}</td>
            <td onClick={openPopup} className="menuBtn"><i class="fa-solid fa-plus" style={{ color: "#1d5dd6" }}></i></td>
            <td onMouseOver={handleOnMenuHover} onMouseOut={handleOnMenuOut} className="menuBtn">
                <i class="fa-solid fa-ellipsis" style={{ color: "#1d5dd6" }}></i>
                <div ref={certiMenuRef} className="certiMenu">
                    <ul className='menuVisibleUl' ref={menuVisible} >
                        <a > <li onClick={handleAccessListPopUpShow}>Revoke Access</li> </a>
                        <a> <li onClick={viewCertFuncn} >View</li> </a>
                        <a  
                        //onClick={handleGetId} 
                        target='_blank'
                        style={{color:"black", textDecoration:"none"}}
                        > <li onClick={viewSummaryFunction}>View Summary</li> </a>
                    </ul>
                </div>
            </td>
        </tr>
    )
}

export default TableRowSections