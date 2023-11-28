import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import UserOrg from "./components/UserOrg";
import UploadProfile from "./components/UploadProfile";
import UserDashboard from "./components/UserDashboard";
import OrgDashboard from "./components/OrgDashboard";
import Navbar from "./components/Navbar";
import "./App.css"
import CompanyAccUserDash from "./components/CompanyAccUserDash";
import ClickAfterCompanyUser from "./components/ClickAfterCompanyUser";
import HackState from "./Context/HackState";
import Account from "./components/Account";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import LoginPage from "./components/loginRegis";
import About from "./components/About";
import Logout from "./components/logout";
import Notification from "./components/AfterLogin/Notification";
import DashBoardNav from "./components/DashBoardNav";
import { useState } from "react";
import Home2 from "./components/Homepage2/Home2";
import MyQR from "./components/AfterLogin/QRpage/MyQR";
import QRPdf2 from "./components/AfterLogin/QRpage/QRPdf2";

function App() {
  const [timeForSideBar, setTimeForSideBar] = useState(true)
  return (
    <>
      <HackState>
        <BrowserRouter>
          {/* <Chatbot /> */}
          {/* <Navbar /> */}
          <Navbar />
          {/* {timeForSideBar && <DashBoardNav />} */}
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}


            {/* <Route exact path="/companyacc" element={<CompanyAccUserDash />} />
            <Route exact path="/notification" element={<Notification />} />
            <Route exact path="/userdash" element={<Dashboard />} /> */}





            {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/orgdash" element={<Dashboard />} />

            <Route path="afterlogin" element={<DashBoardNav />}>

              <Route path="companyacc" element={<CompanyAccUserDash />} />
              <Route path="notification" element={<Notification />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="myqr" element={<QRPdf2 />} />

            </Route>

            {/* <Route exact path="/" element={<Home />} /> */}
            {/* <Route exact path="/" element={<Hero />} /> */}
            <Route exact path="/" element={<Home2 />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/select" element={<UserOrg />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/upload" element={<UploadProfile />} />
            <Route exact path="/clickafteruser" element={<ClickAfterCompanyUser />} />
            


          </Routes>
          
        </BrowserRouter>


        <Footer />
      </HackState>
    </>

  );
}

export default App;