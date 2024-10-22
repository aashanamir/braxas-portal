# Employee Management System (EMS)

## Overview

The Employee Management System (EMS) is a comprehensive solution designed to streamline employee-related processes within an organization. This system enables the management of employee data, payroll, attendance, and other HR-related tasks. It provides distinct modules for different levels of access and functionalities for both administrators and employees.

## Modules

### 1. Employee Module

The Employee Module is the core component of the system, where all employee-related operations are managed. It provides functionalities to create, update, retrieve, and delete employee records. The module supports role-based access, ensuring that only authorized users (such as administrators or employees) can access relevant data.

## Controllers

### Employee Controller

The Employee Controller is responsible for handling all employee-related operations in the system. It is divided into two main sections based on user roles: the Admin End and the Employee End.

#### Admin End

The Admin End includes controllers that allow administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records. The following controllers are available:

- **`createNewEmployee:`** This controller is used to create a new employee by destructuring the request body and saving the employee's information in the database.
  
- **`getAllEmployees:`** Retrieves a list of all employees in the system.
  
- **`getSingleEmployee:`** Fetches detailed information about a specific employee based on their unique ID.
  
- **`updateEmployee:`** Allows the admin to update the details of an existing employee by their ID.
  
- **`deleteEmployee:`** Deletes an employee record from the system based on the employee's ID.

#### Employee End

The Employee End includes controllers that are accessible by employees to view their own details:

- **`getMyDetails:`** Fetches the logged-in employee's details based on the `req.user._id` field. This controller ensures that employees can access their personal information securely.

---

This documentation provides a structured overview of the Employee Management System's controller functionality, designed to maintain clarity and ensure professional standards for managing employee data efficiently.
"""


