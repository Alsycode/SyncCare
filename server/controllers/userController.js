  import { User } from "../models/User.js"; // Adjust path to your User model
  import validator from "validator";

export const registerUser = async (req, res) => {
  try {
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
      docAvatar,
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
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Validate field formats
    if (firstName.length < 3 || lastName.length < 3) {
      return res.status(400).json({ message: "First and last name must be at least 3 characters" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Provide a valid email" });
    }
    if (phone.length !== 11) {
      return res.status(400).json({ message: "Phone number must be exactly 11 digits" });
    }
    if (nic.length !== 13) {
      return res.status(400).json({ message: "NIC must be exactly 13 digits" });
    }
    if (!["Male", "Female"].includes(gender)) {
      return res.status(400).json({ message: "Gender must be Male or Female" });
    }
    if (!["Patient", "Doctor", "Admin"].includes(role)) {
      return res.status(400).json({ message: "Role must be Patient, Doctor, or Admin" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    if (!validator.isDate(dob)) {
      return res.status(400).json({ message: "Provide a valid date of birth" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob: new Date(dob),
      gender,
      password,
      role,
      doctorDepartment: role === "Doctor" ? doctorDepartment : null,
      docAvatar: docAvatar || { public_id: "", url: "" },
    });

    // Save user (password will be hashed by pre-save hook)
    await user.save();

    // Generate JWT
    const token = user.generateJsonWebToken();

    // Return user data (excluding password) and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

 export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Provide a valid email" });
    }

    // Find user by email, explicitly select password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = user.generateJsonWebToken();

    // Return user data (excluding password) and token
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};