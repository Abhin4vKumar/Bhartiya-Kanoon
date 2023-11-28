import React, { useState } from "react";
import "./Style/Navbar.css";
import { useRef } from "react";
import { useContext } from "react";
import HackContext from "../Context/HackContext";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import { useAlert } from 'react-alert';
import Logo from "./stock/Logo.svg"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LinkOfNavbar from "./LinkOfNavbar";

const Navbar = () => {

  const handleOnLinkMouseOverNav = () => {

  }
  const [colorOfStatus, setColorOfStatus] = useState()
  const alert = useAlert();
  const context = useContext(HackContext);
  const { account, setAccount, setContract, setProvider, navLi } = context;
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  async function connectWebsite() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (provider) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      console.log(address);
      // let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      // let contractAddress = "0x938E15fbE8FB4451a448362BB1F060758E1Ba7a6";
      let contractAddress = "0x562983b953040578ae04814A311dBC71EDd18dCD";
      
      // "0xa827469A3b351334d1d333CE771a6eFd96f7F28B";

      const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
      //console.log(contract);
      setContract(contract);
      setProvider(provider);
      // const tx= await signer.sendTransaction({
      //   to: "0x6a657360e4C5a26b7457CFE11c008C4388487205",
      //   value: ethers.utils.parseEther("3")
      // });
    } else {
      console.error("Metamask is not installed");
      alert.error("Metamask is not installed");
    }
  }
  const accountDisp = useRef();
  const handleOnAccountHover = () => {
    accountDisp.current.style.opacity = "1";
    accountDisp.current.style.transform = "translateY(-5px)";
  };

  const handleOnAccountOut = () => {
    accountDisp.current.style.opacity = "0";
    accountDisp.current.style.transform = "translateY(-10px)";
  };
  return (
    <div className="navBar">
      <nav className="navClass">
        <ul className="navUl">
          <div className="leftNavSide">
            <Link to="/" className="navA logoA" href="">
              <li className="navLi logoLi ">
                <img className="logo" style={{ width: "50px" }} src={Logo} alt="" />{" "}
                <div className="logoText">Bhartiya Kanoon</div>
              </li>
            </Link>
            {navLi.map((i) => {
              return (
                // <Link onMouseOver={handleOnLinkMouseOverNav} to={i.to} className="navA" href="">
                //   <li
                //     dangerouslySetInnerHTML={{ __html: i.name }}
                //     className="navLi"
                //   ></li>
                //   <hr className="liHrNav" />
                // </Link>
                <LinkOfNavbar i = {i} key = {i}/>
              );
            })}

            {/* <Link to = "/userdash" className='navA' href=""><li className='navLi'>Dashboard</li></Link>
                    <Link to = "/orgdash" className='navA' href=""><li className='navLi'>Organisation</li></Link> */}
            {/* <a className='navA gapNavA' href=""><li className='navLi'></li></a> */}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input className="connectWallBtn" style={{ border: "1px solid grey", color: "white", marginRight: "10px" }}
              type="button"
              onClick={connectWebsite}
              value={"Connect Wallet"}
            />
            <div className="connectedStatusDiv">
              <p style={{ color: "white" }}>
                {account ? "Connected" : "Not Connected"}
              </p>
              <div style={{backgroundColor:account?"#00d700":"red"}} className="connectedStatusColor"></div>

            </div>
          </div>
          <div
            className="rightNavSide"
            onMouseOver={handleOnAccountHover}
            onMouseOut={handleOnAccountOut}
          >
            <a className="navA" href="">
              <li className="navLi">
                <box-icon
                  name="user-circle"
                  type="solid"
                  color="white"
                  flip="horizontal"
                  size='md'
                ></box-icon>
              </li>
            </a>
            <div className="accountList" ref={accountDisp}>
              <ul className="accountListUl">
                <Link to="/login" className="accountListA" href="">
                  {!loading && isAuthenticated ? <li>Dashboard</li> : <li>Login</li>}
                </Link>
                {loading ? <Link to="/login" className="accountListA" href="">
                  <li>Register</li>
                </Link> : isAuthenticated ? <Link to="/logout" className="accountListA" href="">
                  <li>Logout</li>
                </Link> : <Link to="/login" className="accountListA" href="">
                  <li>Register</li>
                </Link>}
                
              </ul>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
