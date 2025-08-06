import validator from "validator";

export const validateRegister = (req, res, next) => {
    console.log("clickeddddddddd")
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
    doctorDepartment,
  } = req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Provide a valid email",
    });
  }

  // Validate phone and NIC lengths
  if (phone.length !== 11) {
    return res.status(400).json({
      success: false,
      message: "Phone number must contain exactly 11 digits",
    });
  }
  if (nic.length !== 13) {
    return res.status(400).json({
      success: false,
      message: "NIC must contain exactly 13 digits",
    });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 8 characters",
    });
  }

  // Validate role
  if (!["Patient", "Doctor", "Admin"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role. Must be Patient, Doctor, or Admin",
    });
  }

  // Validate doctorDepartment for Doctor role
  if (role === "Doctor" && !doctorDepartment) {
    return res.status(400).json({
      success: false,
      message: "Doctor department is required for Doctor role",
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Provide a valid email",
    });
  }

  next();
};