import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newCertificateReducer,
  certificateDetailsReducer,
  certificateReducer,
  certificatesReducer,
} from "./reducers/certificateReducer";

import {
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import {
    forgotPasswordReducer as OrgForgotPasswordReducer,
    profileReducer as OrgProfileReducer,
    organisationDetailsReducer,
    organisationReducer,
} from "./reducers/organisationReducer";

import {persistStore , persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key:'main-root',
  storage,
}


const reducer = combineReducers({
  certificates: certificatesReducer,
  certificateDetails: certificateDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  orgForgotPassword: OrgForgotPasswordReducer,
  orgProfile : OrgProfileReducer,
  organisationDetails: organisationDetailsReducer,
  newCertification: newCertificateReducer,
  certificate: certificateReducer,
  organisation: organisationReducer,
  userDetails: userDetailsReducer,
});


const persistedReducer = persistReducer(persistConfig , reducer)

let initialState = {
  
};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const Persistor = persistStore(store)
export {Persistor};
export default store;
