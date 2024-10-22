import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { Employee } from "../model/Employee.js";
import jwt from 'jsonwebtoken';

// Create New Employee (Admin)
export const createNewEmployee = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role, contact_number, profile_image, custom_schedule } = req.body;

  if (!name || !email || !password || !contact_number) return next(new ErrorHandler('Please fill all Required Fields', 400));

  const existingEmployee = await Employee.findOne({ email });

  if (existingEmployee) return next(new ErrorHandler('Employee with this email already exists', 400));

  const employee = new Employee({
    name,
    email,
    password,
    role,
    contact_number,
    profile_image,
    custom_schedule,
  });

  await employee.save();

  res.status(201).json({
    success: true,
    message: 'New Employee Created Successfully',
  });
});



// Get All Employees (Admin)
export const getAllEmployees = catchAsyncError(async (req, res, next) => {
  const employees = await Employee.find();
  res.status(200).json({
    success: true,
    employees,
  });
});

// Get Single Employee by ID (Admin)
export const getSingleEmployee = catchAsyncError(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).populate('attendanceRecords payrolls leaves');
  if (!employee) return next(new ErrorHandler('Employee not found', 404));

  res.status(200).json({
    success: true,
    employee,
  });
});

// Update Employee (Admin)
export const updateEmployee = catchAsyncError(async (req, res, next) => {
  const { name, email, role, contact_number, profile_image, custom_schedule } = req.body;

  const employee = await Employee.findById(req.params.id);
  if (!employee) return next(new ErrorHandler('Employee not found', 404));

  employee.name = name || employee.name;
  employee.email = email || employee.email;
  employee.role = role || employee.role;
  employee.contact_number = contact_number || employee.contact_number;
  employee.profile_image = profile_image || employee.profile_image;
  employee.custom_schedule = custom_schedule || employee.custom_schedule;

  await employee.save();

  res.status(200).json({
    success: true,
    message: 'Employee Updated Successfully',
    employee,
  });
});

// Delete Employee (Admin)
export const deleteEmployee = catchAsyncError(async (req, res, next) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return next(new ErrorHandler('Employee not found', 404));

  res.status(200).json({
    success: true,
    message: 'Employee Deleted Successfully',
  });
});



// Get My Details (Employee)
export const getMyDetails = catchAsyncError(async (req, res, next) => {
 
  const employee = await Employee.findById(req.user.id);
  if (!employee) return next(new ErrorHandler('Employee not found', 404));

  res.status(200).json({
    success: true,
    employee,
  });
});







// Login Employee

export const loginEmployee = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler('Please provide email and password', 400));
  }

  // Find employee by email
  const employee = await Employee.findOne({ email });

  if (!employee) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  if (password !== employee.password) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // Create and assign JWT
  const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.status(200).cookie("token" , token , {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true,
    withCredentials: true,
    sameSite: 'none',
  }).json({
    success: true,
    token,
    employee
  });

});


// Logout Employee

export const logoutEmployee = catchAsyncError(async (req, res, next) => {

  res.cookie("token" , null , {
    expires: new Date(Date.now()),
    httpOnly: true,
    withCredentials: true
  }).json({
    success: true,
    message: 'Logged Out Successfully'
  });
});
