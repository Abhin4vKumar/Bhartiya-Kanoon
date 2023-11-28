import React, { useContext, useState, useEffect } from "react";
import { useRef } from "react";
import "./Style/UserDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { revokeAccess, shareAccess } from "../actions/certificateAction";
import HackContext from "../Context/HackContext";
import axios from "axios";
const GetIpfsUrlFromPinata = (pinataUrl) => {
  var IPFSUrl = pinataUrl.split("/");
  const lastIndex = IPFSUrl.length;
  IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
  return IPFSUrl;
};
const folderList = ["folder1", "folder2", "folder3", "folder4", "folder5"];

const UserDashLIst = (props) => {
  const popUpAddAccess = useRef();
  const popUpAddAccessBg = useRef();
  const popUpAddAccessList = useRef();
  const popUpAddAccessListBg = useRef();
  const handleOnAccessPopUpRemove = () => {
    popUpAddAccess.current.style.display = "none"
    popUpAddAccessBg.current.style.display = "none"
  }
  const handleOnAccessPopUpShow = () => {
    popUpAddAccess.current.style.display = "flex"
    popUpAddAccessBg.current.style.display = "block"
    console.log("clikced")
  }
  const handleAccessListPopUpShow = () => {
    popUpAddAccessList.current.style.display = "flex";
    popUpAddAccessListBg.current.style.display = "block";
  }
  const handleAccessListPopUpRemove = () => {
    popUpAddAccessList.current.style.display = "none";
    popUpAddAccessListBg.current.style.display = "none";
  }

  const [certNameIs, setCertNameIs] = useState(props.certName)
  const [certIssuedBy, setCertIssuedBy] = useState(props.givenBy);
  const dispatch = useDispatch();
  const menuVisible = useRef();
  const addAccessPopup = useRef();
  const addAccessListPopup = useRef();
  const handleOnMenuHover = () => {
    // menuVisible.current.style.display  = "none"
    menuVisible.current.style.opacity = "1";
    menuVisible.current.style.transform = "translate(-82px, 0px)";
    // menuVisible.current.style.display  = "none"
  };
  const handleOnMenuOut = () => {
    menuVisible.current.style.opacity = "0";
    menuVisible.current.style.transform = "translate(-82px, -25px)";
  };
  const [orgId, setOrgId] = useState();

  const addAccess = () => {


  }
  const removeAccess = (e) => {
    dispatch(revokeAccess(props.i._id, e.target.key));
    closeAccessPopup();
  };
  const handleOrgId = (e) => {
    setOrgId(e.target.value);
  };
  const openPopup = () => {
    handleOnAccessPopUpShow()
    // addAccessPopup.current.style.opacity = "1";
    // addAccessPopup.current.style.display = "flex";
  };
  const closePopup = () => {
    addAccessPopup.current.style.opacity = "0";
    addAccessPopup.current.style.display = "none";
  };
  const openAccessPopup = () => {
    // addAccessListPopup.current.style.opacity = "1";
    // addAccessListPopup.current.style.display = "flex";
  };
  const closeAccessPopup = () => {
    addAccessListPopup.current.style.opacity = "0";
    addAccessListPopup.current.style.display = "none";
  };
  const handleView = () => {
    //View Certificate
  };
  const handleGetId = () => {
    navigator.clipboard.writeText(props.i.cert_id);
  };
  const popupCSS = {
    display: "none",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    top: "0",
    left: "0",
    zIndex: "5",
  };
  const popUpWhitePart = {
    display: "Flex",
    backgroundColor: "white",
    minWidth: "200px",
    minHeight: "200px",
  };
  const context = useContext(HackContext);
  const { provider, account, contract } = context;
  const viewCertFuncn = async (e) => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const certToken = props.i.cert_id;
    let check = false;
    // getting all certificates
    let allCerti = await contract.getallCerti(address);
    const items = await Promise.all(allCerti.map(async i => {

      //give access 
      // await contract.giveAccess(i.tokenId,"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65")


      //viewing certificate
      // let views = await contract.viewCerti(i.tokenId);
      // console.log(views);



      //cancel access
      // if(i.tokenId.toNumber()===2){
      //   await contract.cancelAccess(i.tokenId,"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65")
      // }



      //revoke certificate 
      // if(i.tokenId.toNumber()===5){
      //   await contract.revoke(i.tokenId);
      // }
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
  const [AddressVar, setAddressVar] = useState("");
  const handleAddressVarChange = (e) => {
    setAddressVar(e.target.value);
  }
  const giveAccessFncn = async (e) => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const certToken = props.i.cert_id;
    let check = false;
    // getting all certificates
    let allCerti = await contract.getallCerti(address);
    const items = await Promise.all(allCerti.map(async i => {

      //give access 



      //viewing certificate
      // let views = await contract.viewCerti(i.tokenId);
      // console.log(views);



      //cancel access
      // if(i.tokenId.toNumber()===2){
      //   await contract.cancelAccess(i.tokenId,"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65")
      // }



      //revoke certificate 
      // if(i.tokenId.toNumber()===5){
      //   await contract.revoke(i.tokenId);
      // }
      if (i.tokenId.toNumber() === Number(certToken) && !check) {
        check = true;
        await contract.giveAccess(i.tokenId, AddressVar)
        // var tokenURI = await contract.tokenURI(i.tokenId);
        // tokenURI = GetIpfsUrlFromPinata(tokenURI);
        // let meta = await axios.get(tokenURI);
        // meta = meta.data;

        // let item = {
        //     tokenId: i.tokenId.toNumber(),

        //     owner: i.owner,
        //     org: i.organization,
        //     employee: i.employee,

        //     image: meta.image,
        //     name: meta.name,
        //     description: meta.description,
        // }
        // console.log(item.name);
        // console.log(item.image);
        // window.open(item.image);
      }
    }))
  };
  const [revokeAddressVar, setRevokeAddressVar] = useState();
  const handleRevokeAddressVarChange = (e) => {
    setRevokeAddressVar(e.target.value);
  }
  const revokeAccessFncn = async () => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const certToken = props.i.cert_id;
    let check = false;
    // getting all certificates
    let allCerti = await contract.getallCerti(address);
    const items = await Promise.all(allCerti.map(async i => {

      //viewing certificate
      // let views = await contract.viewCerti(i.tokenId);
      // console.log(views);



      //cancel access
      // if(i.tokenId.toNumber()===2){
      //   await contract.cancelAccess(i.tokenId,"0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65")
      // }



      //revoke certificate 
      // if(i.tokenId.toNumber()===5){
      //   await contract.revoke(i.tokenId);
      // }
      if (i.tokenId.toNumber() === Number(certToken) && !check) {
        check = true;
        await contract.cancelAccess(i.tokenId, revokeAddressVar)
        // var tokenURI = await contract.tokenURI(i.tokenId);
        // tokenURI = GetIpfsUrlFromPinata(tokenURI);
        // let meta = await axios.get(tokenURI);
        // meta = meta.data;

        // let item = {
        //     tokenId: i.tokenId.toNumber(),

        //     owner: i.owner,
        //     org: i.organization,
        //     employee: i.employee,

        //     image: meta.image,
        //     name: meta.name,
        //     description: meta.description,
        // }
        // console.log(item.name);
        // console.log(item.image);
        // window.open(item.image);
      }
    }))
  }
  useEffect(() => {
    if (props.certName.length > 7) {
      setCertNameIs(props.certName.slice(0, 8) + "...")
    }
    if (props.givenBy.length > 7) {
      setCertIssuedBy(props.givenBy.slice(0, 8) + "...")
    }

    return () => {

    }
  }, [])

  return (
    <div className="certCardDiv">
      <div className="certCard">
        <div className="sno">{props.sno}</div>
        <div className="certiLeft">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/94/Certificate_%2889083%29_-_The_Noun_Project.svg"
            alt=""
          />
        </div>
        <div className="certiNameSide">{certNameIs}</div>
        <div className="certiNameSide">{certIssuedBy}</div>
        <div className="certiNameSide">{props.date.slice(0, 10)}</div>
        <div onClick={openPopup} className="menuBtn">
          <i class="fa-solid fa-plus" style={{ color: "#1d5dd6" }}></i>
        </div>

        <div style={popupCSS} ref={addAccessPopup} className="Popup">
          <div style={popUpWhitePart}>
            <a className="closeDivPopup" onClick={closePopup}>
              X
            </a>
            <div className="inputAdd">
              <input type="text" ></input>
              <button ref={addAccess} >Add Access</button>
            </div>
          </div>
        </div>

        {/* <div style={popupCSS} ref={addAccessListPopup} className="Popup">
          <div style={popUpWhitePart}>
            <a onClick={closeAccessPopup}>X</a>
            <ul>
              {props.i.accessTo.map((element, index) => {
                <li>
                  {element.organisation.name}
                  <a
                    key={element.organisation.org_id}
                    acc_no={element.organisation.acc_no}
                    onClick={removeAccess}
                  >
                    Revoke Access
                  </a>
                </li>;
              })}
            </ul>
          </div>
        </div> */}

        <div onClick={handleOnAccessPopUpRemove} ref={popUpAddAccessBg} className="popBack"></div>

        <div ref={popUpAddAccess} className="popUpWindowDash">
          <div className="inpWindowPopUpDiv">
            <input className="inpWindowPopUp" value={AddressVar} onChange={handleAddressVarChange} type="text" />
          </div>
          <div className="popUpBtnAddAccess">
            <button className="button-4" onClick={giveAccessFncn}>Add Access</button>
          </div>
        </div>

        {/* */}

        <div onClick={handleAccessListPopUpRemove} ref={popUpAddAccessListBg} className="popBack"></div>

        <div ref={popUpAddAccessList} className="popUpWindowDash">
          <div className="inpWindowPopUpDiv">
            <input type="text" onChange={handleRevokeAddressVarChange} value={revokeAddressVar} />
          </div>
          <div className="popUpBtnAddAccess">
            <button className="button-4" onClick={revokeAccessFncn}>Revoke Access</button>
          </div>
        </div>
        <div
          onMouseOver={handleOnMenuHover}
          onMouseOut={handleOnMenuOut}
          className="menuBtn"
        >
          <i class="fa-solid fa-ellipsis" style={{ color: "#1d5dd6" }}></i>
          <div className="certiMenu">
            <ul ref={menuVisible}>
              <a onClick={openAccessPopup}>
                <li onClick={handleAccessListPopUpShow}>Revoke Access</li>
              </a>
              <a onClick={handleView}>
                <li onClick={viewCertFuncn} >View</li>
              </a>
              <a onClick={handleGetId}>
                <li>View Summary</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashLIst;
