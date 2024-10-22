import express from 'express';
import {
  createNewEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  getMyDetails,
  loginEmployee,
  logoutEmployee
} from '../controller/employeeController.js';
import { isAuthenticated } from '../middlewares/isAuth.js';


const router = express.Router();

// Common Routes
router.route('/login').post(loginEmployee);

// Admin Routes
router.route('/admin/employees').get(getAllEmployees);
router.route('/admin/employee/:id')
  .get(getSingleEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);
router.route('/admin/employee/new').post(createNewEmployee);

// Employee Routes
router.route('/me').get(isAuthenticated , getMyDetails);
router.route('/logout').get(logoutEmployee);

export default router;
