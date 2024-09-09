import express from "express";
import {
  registerHospital,
  addDepartments,
  getDepartmentsByHospital,
  signinHospital,
  searchHospitals,
  getAppointments,
  updateAppointmentStatus,
  setBedDetails,
  getBedDetails,
  getDepartmentsProtected
} from "../controllers/hospital-controller.js";
import hospitalMiddleware from "../middleware/hospital-auth-middleware.js";

const router = express.Router();

router.post("/register", registerHospital);
router.post("/signin", signinHospital);
router.post("/add-departments", hospitalMiddleware, addDepartments);
router.post("/update-bed-details", hospitalMiddleware, setBedDetails);
router.get("/get-bed-details", hospitalMiddleware, getBedDetails);
router.get("/search", searchHospitals);
router.get("/departments/:hospitalId", getDepartmentsByHospital);
router.get("/departments", hospitalMiddleware, getDepartmentsProtected);

// appointment routes
router.get("/appointments", hospitalMiddleware, getAppointments);
router.patch(
  "/appointments/:appointmentId",
  hospitalMiddleware,
  updateAppointmentStatus
);

export default router;
