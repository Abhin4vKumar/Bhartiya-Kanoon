import { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import "./fileupload.css";

const GetIpfsUrlFromPinata = (pinataUrl) => {
  var IPFSUrl = pinataUrl.split("/");
  const lastIndex = IPFSUrl.length;
  IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
  return IPFSUrl;
};

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) { 
      try {

        const signer = provider.getSigner();
        const address = await signer.getAddress();
    

        //storing file
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `b4c665100289df63f611`,
            pinata_secret_api_key: `9a443b79553ebe1f2827fec6bc78a910fca49383a394870947cf8253c4afa1e7`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);


        //storing json
        const nftJSON = {
            name:fileName,image:ImgHash
        }

        const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
        const metadata = await axios 
        .post(url, nftJSON, {
            headers: {
                pinata_api_key: `b4c665100289df63f611`,
                pinata_secret_api_key: `9a443b79553ebe1f2827fec6bc78a910fca49383a394870947cf8253c4afa1e7`,
            }
        })
        const metaHash = `https://gateway.pinata.cloud/ipfs/${metadata.data.IpfsHash}`;



        // adding certificate 
        var addCertificate = await contract.additem(metaHash,"0x14dC79964da2C08b23698B3D3cc7Ca32193d9955","0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",address);
        // const id = await contract.tokens().toNumber;
        // console.log(id);
        const id2 = await contract._tokenIds;
        console.log(id2);
        await addCertificate.wait();

        //till here 


        
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
        }))

        alert("successfully uploaded");
        setFileName("No image selected");
        setFile(null);

      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }



    
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const tx= await signer.sendTransaction({
    //   to: "0x6a657360e4C5a26b7457CFE11c008C4388487205",
    //   value: ethers.utils.parseEther("3")
    // });
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
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
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;