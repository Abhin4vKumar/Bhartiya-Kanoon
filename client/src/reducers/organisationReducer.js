import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_ORG_REQUEST,
  REGISTER_ORG_SUCCESS,
  REGISTER_ORG_FAIL,
  LOAD_ORG_REQUEST,
  LOAD_ORG_SUCCESS,
  LOAD_ORG_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ORG_DETAILS_REQUEST,
  ORG_DETAILS_SUCCESS,
  ORG_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/organisationConstants";

export const organisationReducer = (state = { organisation: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_ORG_REQUEST:
    case LOAD_ORG_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_ORG_SUCCESS:
    case LOAD_ORG_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        organisation: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        organisation: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case REGISTER_ORG_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        organisation: null,
        error: action.payload,
      };

    case LOAD_ORG_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        organisation: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
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

export const organisationDetailsReducer = (state = { organisation: {} }, action) => {
  switch (action.type) {
    case ORG_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORG_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        organisation: action.payload,
      };

    case ORG_DETAILS_FAIL:
      return {
        ...state,
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
