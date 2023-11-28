import api from "axios";
// import api from "./api";

import {
  ALL_CERTIFICATE_FAIL,
  ALL_CERTIFICATE_REQUEST,
  ALL_CERTIFICATE_SUCCESS,
  NEW_CERTIFICATE_REQUEST,
  NEW_CERTIFICATE_SUCCESS,
  NEW_CERTIFICATE_FAIL,
  UPDATE_CERTIFICATE_REQUEST,
  UPDATE_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE_FAIL,
  REVOKE_CERTIFICATE_REQUEST,
  REVOKE_CERTIFICATE_SUCCESS,
  REVOKE_CERTIFICATE_FAIL,
  CERTIFICATE_DETAILS_REQUEST,
  CERTIFICATE_DETAILS_FAIL,
  CERTIFICATE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/certificateConstants";

// Get All Certificates // Not Implementing
export const getCertificate =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_CERTIFICATE_REQUEST });

      let link = `/api/v1/requests?keyword=${keyword}&page=${currentPage}`;

      const { data } = await api.get(link);
      console.log("your certificate data is ", data)

      dispatch({
        type: ALL_CERTIFICATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CERTIFICATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//get my Certificate

export const getMyCertificate = (id) => async (dispatch)=>{
  try{
    console.log('action' + id);
    dispatch({type:ALL_CERTIFICATE_REQUEST});
    let link = `/api/v1/myCertificates`;
    const { data } = await api.get(link);
    console.log("getmycertifiacatee ", data)
    dispatch({
      type: ALL_CERTIFICATE_SUCCESS,
      payload: data,
    });
  }catch (error) {
    dispatch({
      type: ALL_CERTIFICATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Create Product
export const createCertificate = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CERTIFICATE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log("696969");
    console.log(productData);
    const { data } = await api.post(
      `/api/v1/certificate/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_CERTIFICATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error : ",error);
    dispatch({
      type: NEW_CERTIFICATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Certificate // Not Implementing
export const updateCertificate = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CERTIFICATE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await api.put(
      `/api/v1/request/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_CERTIFICATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CERTIFICATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Share Access
export const shareAccess = (certId, orgId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CERTIFICATE_REQUEST });
    const productData = new FormData();
    productData.set("orgId" , orgId);
    productData.set("certId" , certId);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await api.put(
      `/api/v1/certificate/Access/share/`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_CERTIFICATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CERTIFICATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Revoke Access
export const revokeAccess = (certId, orgId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CERTIFICATE_REQUEST });
    const productData = new FormData();
    productData.set("orgId" , orgId);
    productData.set("certId" , certId);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await api.put(
      `/api/v1/certificate/Access/revoke/`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_CERTIFICATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CERTIFICATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Revoke Certificate
export const revokeCertificate = (id,certId) => async (dispatch) => {
  try {
    dispatch({ type: REVOKE_CERTIFICATE_REQUEST });
    const productData = new FormData();
    productData.set("certId" , certId);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await api.delete(`/api/v1/certificate/revoke`,productData,config);

    dispatch({
      type: REVOKE_CERTIFICATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REVOKE_CERTIFICATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Grant Certificate
export const grantCertificate = (id,certId) => async (dispatch) => {
  try {
    dispatch({ type: REVOKE_CERTIFICATE_REQUEST });
    const productData = new FormData();
    productData.set("certId" , certId);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await api.put(`/api/v1/certificate/grant`,productData,config);

    dispatch({
      type: REVOKE_CERTIFICATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REVOKE_CERTIFICATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Get Products Details // Not Required Currently
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CERTIFICATE_DETAILS_REQUEST });

    const { data } = await api.get(`/api/v1/request/${id}`);

    dispatch({
      type: CERTIFICATE_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: CERTIFICATE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
