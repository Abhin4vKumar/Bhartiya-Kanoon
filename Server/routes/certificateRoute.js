const express = require("express");
const { grantCertificate , getMyCertificates,shareAccess , revokeAccess, newCertificate, revokeCertificate, qrHelper ,  } = require("../controllers/certificateController");
const { isAuthenticatedUser, isAuthenticatedOrganisation } = require("../middleware/auth");

const router = express.Router();

// router.route("/certificates").get(isAuthenticatedUser,getAllRequests);
router.route("/myCertificates").get(isAuthenticatedUser , getMyCertificates);
router.route("/qrHelper").post(qrHelper);
router.route("/certificate/new").post(isAuthenticatedUser, newCertificate);
router.route("/certificate/Access/share").put(isAuthenticatedUser, shareAccess);
router.route("/certificate/Access/revoke").put(isAuthenticatedUser, revokeAccess);
router.route("/certificate/revoke").delete(isAuthenticatedOrganisation, revokeCertificate);
router.route("/certificate/grant").put(isAuthenticatedOrganisation, grantCertificate);
// router.route("/certificate/:id").put(isAuthenticatedUser , updateRequest).delete(isAuthenticatedUser, deleteRequest).get(getRequestDetails);
// router.route("/request/status/:id").get()

module.exports = router