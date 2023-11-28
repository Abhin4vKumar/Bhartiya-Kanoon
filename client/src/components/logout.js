import { useEffect} from "react";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userAction";
import { logout as OrgLogOut } from "../actions/organisationAction";
const Logout = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(logout());
        dispatch(OrgLogOut());
        navigate("/");
    }, [navigate , logout , OrgLogOut])
    return(<Loader/>)
}

export default Logout;