import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react';
import CompanyAccUserTable from './CompanyAccUserTable';
import axios from 'axios';
import { ethers } from "ethers";
import HackContext from '../Context/HackContext';
import DashBoardNav from './DashBoardNav';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganisationDetails } from '../actions/organisationAction';
import { useNavigate } from 'react-router-dom';
import { createCertificate , getCertificate } from '../actions/certificateAction';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import SubmitLoading from "./Homepage2/stock/uploading.gif"
import { Box, LinearProgress } from '@mui/material';


const GetIpfsUrlFromPinata = (pinataUrl) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
    return IPFSUrl;
};
const CompanyAccUserDash = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [certToken, setCertToken] = useState();
    const handleCertTokenChange = (e) => {
        setCertToken(e.target.value);
    }
    const [uploadingText, setUploadingText] = useState("Processing Documents")
    const certResult = useSelector((state) => state.certificates);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    // org Id
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if (!loading && !isAuthenticated) {
        navigate("/login");
    } else if (isAuthenticated) {
        if (!user.employee) {
            console.log("asdadasdsd");
            navigate("/dashboard");
        }
        console.log("uSer is Employee");
    }

    const [submitLoading, setSubmitLoading] = useState(0)
    const [receiver, setReceiver] = useState();

    const changeReceiverAddress = (e) => {
        setReceiver(e.target.value);
    }
    // user ID
    const context = useContext(HackContext);
    const { provider, account, contract } = context;
    const wrapperRef = useRef()
    const onDragEnter = () => wrapperRef.current.classList.add('dragover')
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
    const onDrop = () => wrapperRef.current.classList.remove('dragover')
    const onFileDrop = (e) => {
        const newFile = e.target.Files[0]
        if (newFile) {
            console.log(newFile)
        }
    }
    const handleSubmit = async (e) => {
        setSubmitLoading(0)
        e.preventDefault();
        console.log("insdie the handle Submit")
        console.log(provider, account, contract);
        if (file) {
            try {

                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const tx = await signer.sendTransaction({
                    to: "0x6a657360e4C5a26b7457CFE11c008C4388487205",
                    // "0xb8423bbf6356d21EC1ea0B2372c567995cEb5352",
                    value: ethers.utils.parseEther("0.0000069")
                });
                setSubmitLoading(10)

                //storing file
                const formData = new FormData();
                formData.append("file", file);
                console.log(formData);
                setSubmitLoading(15)

                setUploadingText("Uploading to IPFS")
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `94b4247195d5c299bf14`,
                        pinata_secret_api_key: `4f8d9fafbb7d8257808996ebf217a29519c79889278a83d99110f9f7a52fc596`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                setUploadingText("Processing Documents")
                setSubmitLoading(35)


                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                console.log(ImgHash);


                //storing json
                const nftJSON = {
                    name: fileName, image: ImgHash
                }

                const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
                const metadata = await axios
                    .post(url, nftJSON, {
                        headers: {
                            pinata_api_key: `94b4247195d5c299bf14`,
                            pinata_secret_api_key: `4f8d9fafbb7d8257808996ebf217a29519c79889278a83d99110f9f7a52fc596`,
                        }
                    })
                const metaHash = `https://gateway.pinata.cloud/ipfs/${metadata.data.IpfsHash}`;
                setSubmitLoading(48)
                setUploadingText("Summarizing files")

                await setTimeout(async() => {



                    setSubmitLoading(63)
                    setUploadingText("Categorizing documents")

                    setTimeout(async() => {



                        setUploadingText("Generating NFT")
                        setSubmitLoading(80)


                        // adding certificate 
                        console.log("receiver : ", receiver);
                        console.log("user.workOrganisationAccNo : ", user.workOrganisationAccNo);
                        setSubmitLoading(99)
                        var addCertificate = await contract.additem(metaHash, receiver, user.workOrganisationAccNo, address);
                        // const id = await contract.tokens().toNumber;
                        // console.log(id);
                        await addCertificate.wait();
                        // const provider = new ethers.providers.Web3Provider(window.ethereum);
                        // const signer = provider.getSigner();

                        alert("Successfully Image Uploaded");


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
                        console.log(certResult);
                        const id = certResult.certificatesCount + 1;
                        const newFileName = id + '';
                        console.log("----------------------------------asdasdas-----------");
                        console.log(newFileName);
                        const storage = getStorage(fapp);
                        const storageRef = ref(storage , newFileName);
                        // const storageRef = fapp.storageRef(newFileName)
                        // Upload the file and metadata
                        // const uploadTask = storageRef.put(file);
                        const metadata = {
                            contentType: 'text/plain',
                          };
                          
                          // Upload the file and metadata
                        const uploadTask = uploadBytes(storageRef, file, metadata);
                        // 'file' comes from the Blob or File API
                        uploadBytes(storageRef, file).then((snapshot) => {
                            console.log('Uploaded a blob or file!');
                            const data = new FormData();
                            data.set("name", fileName);
                            console.log(id);
                            data.set("cert_id", id);
                            data.set("userId", receiver);
                            data.set("ipfsLink", ImgHash);
                            data.set("summaryLink", ImgHash);
                            console.log(data.get("name"));
                            dispatch(createCertificate(data))
                            setFileName("No image selected");
                            setFile(null);
                            dispatch(getCertificate);
                        });
                        setSubmitLoading(100)

                    }, 2000);
                }, 2000);
            } catch (e) {
                console.log(e);
                alert("Unable to upload image to Pinata");
            }
        };
    }
    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();

    };
    const viewCertFuncn = async () => {
        try {
            const signer = provider.getSigner();
            let check = false;
            const address = await signer.getAddress();
            // getting all certificates
            let allCerti = await contract.getallCerti(address);
            const items = await Promise.all(allCerti.map(async i => {

                if (i.tokenId.toNumber() === Number(certToken) && !check) {
                    check = true;
                    const tx = await signer.sendTransaction({
                        to: "0x6a657360e4C5a26b7457CFE11c008C4388487205",
                        // "0xb8423bbf6356d21EC1ea0B2372c567995cEb5352",
                        value: ethers.utils.parseEther("0.0000069")
                    });
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
                    console.log("Item image: ",item.image);
                    window.open(item.image);

                }
            }))
            if (!check) {
                alert("You Dont Have Access To Certificate");
            }
        } catch (e) {
            alert("Unable To View Certificate");
        }
    };
    const bgRef = useRef()
    const addUserRef = useRef()
    const viewCertRef = useRef()

    const orgResult = useSelector((state) => state.organisationDetails);
    const [pdfFile, setPdfFile] = useState()

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
        fetch("https://www.copyright.gov/docs/certificate_sample.pdf")
            .then((response) => response.blob())
            .then((blob) => {
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    console.log(e.target.result);
                };
            })
            .catch((error) => {
                console.error("Error fetching PDF:", error);
            });


    }



    return (
        <div className='completeCompanyAccSection'>
            {(submitLoading != 0 && submitLoading != 100) && <div className="submitLoadingPortion">
                <div className="bgSubmitLoading"></div>
                <div className="submLoadingDisplay">
                    <img src={SubmitLoading} alt="" />
                    <div className="uploadToPinata"><label htmlFor="">
                        Hold On <br />
                        {/* <span><br/>Uploading to <span className='submitIPFSlabel'> IPFS</span>... <br/>
                        Generating NFT...<br/>
                        Generating NFT...<br/>
                        </span> */}
                        <div className="submitSectionText">
                            {uploadingText} ...

                        </div>



                    </label></div>
                </div>
                <Box>
                    <LinearProgress className='uploadLoadingBar' variant="determinate" value={submitLoading} />

                </Box>
            </div>}
            {/* <DashBoardNav /> */}
            <div ref={bgRef} onClick={handleOnBackClick} className="companyBackArea"></div>
            <div ref={addUserRef} className="addUserPopupWindow">
                <div className="inputAddUserPopupDiv">
                    <form className="form" onSubmit={handleSubmit}>
                        


                        <div
                            className="uploadDocDiv"
                            ref={wrapperRef}
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            on

                        >
                            <div className="dragAndDropfiles">
                                <img src="https://cdn-icons-png.flaticon.com/512/3616/3616929.png" alt="" />
                                <p>Drag and Drop your files here</p>
                            </div>
                            <input
                                className='inpFile'
                                disabled={!account}
                                type="file"
                                id="file-upload"
                                name="data"
                                onChange={retrieveFile}
                            // onChange={onFileDrop}

                            />

                        </div>

                        <input type="text" className='form__input' value={receiver} onChange={changeReceiverAddress} placeholder='Enter User Address' />
                        <label className='form__label' htmlFor="user address">User Address</label>
                        <div className="uploadFileDiv">
                            <span className="textArea">Document: {fileName}</span>
                            <button type="submit" className="upload button-4" disabled={!file}>
                                Upload File
                            </button>

                        </div>
                    </form>
                </div>
            </div>

            <div ref={viewCertRef} className="addUserPopupWindow">
                {/* <label htmlFor="">Certificate ID</label> */}
                <div className="inputAddUserPopupDiv">
                    <input placeholder='Certificate ID' value={certToken} className='inpAfterPopup form__input' onChange={handleCertTokenChange} type="text" />
                    <label className='form__label' htmlFor="">Certificate ID</label>
                </div>
                <div className="btnAddUserPopupDiv">
                    <button className='button-4' onClick={viewCertFuncn} >View</button>
                </div>
                <div className="certificatePdfView">

                </div>
            </div>



            <div className="topNavCompanyItems">
                
                <div className="selectOptionsDiv">
                    <h1>Select Options</h1>

                </div>
                <div className="companyButtonsSide">

                    <div onClick={handleOnPopupClick} className="accAddUser">
                        <button className='accAddUserBtn companyBtn' role="button">
                            <span class="IconContainer">
                                <i class="fa-solid fa-id-card-clip"></i>
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                            </span>

                            <p class="text">Issue Document</p>
                        </button>
                    </div>
                    <div className="viewCertUser accAddUser"><button onClick={handleOnViewCert} className="viewCertUserBtn companyBtn">
                        <span class="IconContainer">
                            <i class="fa-solid fa-certificate"></i>
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                        </span>

                        <p class="text">View Document</p>
                    </button></div>
                </div>


            </div>

            {
                orgResult.certificatesIssued ? orgResult.certificatesIssued.map((i, index) => {
                    return <CompanyAccUserTable user={user} i={i} sno={index} name={i.user_name} dateJoin={i.date} certificateGiven={i.name} accountNo={i.cert_id} />
                }) : <></>
            }
        </div >
    )
}
export default CompanyAccUserDash;