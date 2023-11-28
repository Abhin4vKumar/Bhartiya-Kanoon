import UserDashboard from "./UserDashboard";
import OrgDash from "./OrgDashboard";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    let userOrgVar;
    const userResult = useSelector(
        (state) => state.user
    );
    const orgResult = useSelector(
        (state) => state.organisation
    );

    if (userResult.isAuthenticated) {
        userOrgVar = true;
    }
    if (orgResult.isAuthenticated) {
        userOrgVar = false;
    }
    let loading = userResult.loading || orgResult.loading
    let isAuthenticated = userResult.isAuthenticated || orgResult.isAuthenticated
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, loading, isAuthenticated])


    return (
        <Fragment>
            {loading ? <Loader /> : userOrgVar && isAuthenticated ? <UserDashboard user={userResult.user} /> : isAuthenticated ? <OrgDash user={orgResult.organisation} /> : navigate("/login")}
        </Fragment>
    )
}

export default Dashboard;