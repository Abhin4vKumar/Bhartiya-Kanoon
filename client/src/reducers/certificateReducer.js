import {
  ALL_CERTIFICATE_FAIL,
  ALL_CERTIFICATE_REQUEST,
  ALL_CERTIFICATE_SUCCESS,
  NEW_CERTIFICATE_REQUEST,
  NEW_CERTIFICATE_SUCCESS,
  NEW_CERTIFICATE_FAIL,
  NEW_CERTIFICATE_RESET,
  UPDATE_CERTIFICATE_REQUEST,
  UPDATE_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE_FAIL,
  UPDATE_CERTIFICATE_RESET,
  REVOKE_CERTIFICATE_REQUEST,
  REVOKE_CERTIFICATE_SUCCESS,
  REVOKE_CERTIFICATE_FAIL,
  REVOKE_CERTIFICATE_RESET,
  CERTIFICATE_DETAILS_REQUEST,
  CERTIFICATE_DETAILS_FAIL,
  CERTIFICATE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/certificateConstants";

export const certificatesReducer = (state = { certificates: [] }, action) => {
  switch (action.type) {
    case ALL_CERTIFICATE_REQUEST:
      return {
        loading: true,
        certificates: [],
      };
    case ALL_CERTIFICATE_SUCCESS:
      return {
        loading: false,
        certificates: action.payload.certificates,
        certificatesCount: action.payload.certificatesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredCertificatesCount: action.payload.filteredCertificatesCount,
      };
    case ALL_CERTIFICATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newCertificateReducer = (state = { certificate: {} }, action) => {
  switch (action.type) {
    case NEW_CERTIFICATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CERTIFICATE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        certificate: action.payload.certificate,
      };
    case NEW_CERTIFICATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CERTIFICATE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const certificateReducer = (state = {}, action) => {
  switch (action.type) {
    case REVOKE_CERTIFICATE_REQUEST:
    case UPDATE_CERTIFICATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REVOKE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isRevoked: action.payload,
      };

    case UPDATE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case REVOKE_CERTIFICATE_FAIL:
    case UPDATE_CERTIFICATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REVOKE_CERTIFICATE_RESET:
      return {
        ...state,
        isRevoked: false,
      };
    case UPDATE_CERTIFICATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const certificateDetailsReducer = (state = { certificate: {} }, action) => {
  switch (action.type) {
    case CERTIFICATE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CERTIFICATE_DETAILS_SUCCESS:
      return {
        loading: false,
        certificate: action.payload,
      };
    case CERTIFICATE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

