import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendCookie } from "../middlewares/sendCookie.js";
import { User } from "../model/users.js";
import { Salary } from "../model/salary.js";
import { sendEmail } from "../utils/emailSend.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";



//Create User  -----------------> Admin

export const createUser = catchAsyncError(async (req, res, next) => {
  const { name, fName, phone, cnic, address, email, password, hireDate, position, department, baseSalary } = req.body;

  if (!name || !fName || !phone || !cnic || !address || !email || !password || !hireDate || !position || !department || !baseSalary) {
    return next(new ErrorHandler("Please fill all the required fields", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists with this email", 401));
  }

  const salary = await Salary.create({ baseSalary });

  user = await User.create({
    personalDetails: { name, fName, phone, cnic, address },
    employmentDetails: { hireDate, position, department, salaryRef: salary._id },
    email,
    password,
  });

  const token = await user.activeLinkToken();
  const link = `${req.protocol}://${req.get("host")}/api/v1/user/verify-token/${token}`;

  await sendEmail(name, email, link, "Verify Your Email Account", "Thank you for registering with us. Please verify your email address by clicking the button below:");

  user.activeToken = token;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Check Your Inbox to Verify Your Account",
  });
});





// Verify User ------------------------> Complete Sign Up

export const verifyUser = catchAsyncError(async (req, res, next) => {
  const { id: token } = req.params;
  if (!token) {
    return next(new ErrorHandler("Invalid token", 404));
  }

  const user = await User.findOneAndUpdate(
    { activeToken: token, activeTokenExpires: { $gt: Date.now() } },
    {
      isActive: true,
      activeToken: "",
      activeTokenExpires: Date.now(),
    },
    { new: true }
  );

  if (!user) {
    return next(new ErrorHandler("Invalid or expired token", 400));
  }

  sendCookie(user, res, 201, "You have successfully verified your account");
});







// Sign In  ------------------------> Public

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill all the required fields", 401));
  }

  const user = await User.findOne({ email }).populate("employmentDetails.salaryRef");

  if (!user) {
    return next(new ErrorHandler("No user exists with this email", 401));
  }

  const comparePassword = await user.comparePassword(password);
  if (!comparePassword) {
    return next(new ErrorHandler("Password doesn't match", 401));
  }

  if (!user.isActive) {
    return next(new ErrorHandler("Check your inbox to verify your account", 401));
  }

  sendCookie(user, res, 200);
});




// Logout User ----------------------> Only Authenticated
export const logoutUser = catchAsyncError((req, res, next) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({
      success: true,
      message: "Logout Successfully",
    });
});




// Get My Profile ----------------------> Only Authenticated
export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("employmentDetails.salaryRef");

  if (!user) {
    return next(new ErrorHandler("You cannot access this because you are not logged in", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});


// Edit My Profile Details ----------------------> Only Authenticated
export const editMyProfile = catchAsyncError(async (req, res, next) => {
  const { name, email, fName, phone, cnic, address } = req.body;
  const { _id } = req.user;

  if (!name || !email) {
    return next(new ErrorHandler("Please fill all the required fields", 401));
  }

  const user = await User.findByIdAndUpdate(
    _id,
    {
      personalDetails: { name, fName, phone, cnic, address },
      email,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

// Get All Users ----------------------------> For Admin
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const limit = 10; // Adjust number of users per page
  const pageNo = req.query.page || 1;
  const skip = (pageNo - 1) * limit;
  const keyword = req.query.keyword || "";
  const sort = req.query.sort || "_id";

  const users = await User.find({
    $or: [
      { "personalDetails.name": { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  })
    .skip(skip)
    .limit(limit)
    .populate("employmentDetails.salaryRef attendanceRef");

  res.status(200).json({
    success: true,
    users,
    pageNo,
  });

});
