import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndCookie } from "../utils/generateTokenCookie.js";

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ success: true, user });
	} catch (error) {
		res.status(500).json({ message: "Error checking auth" });
	}
};

export const signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const isPasswordCorrect = await bcryptjs.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "Incorrect password" });
		}
		generateTokenAndCookie(res, user._id);

		user.lastLogin = Date.now();
		await user.save();

		res.status(200).json({
			success: true,
			message: "User logged in successfully",
			user: {
				...user._doc,
				password: null,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error logging in user" });
	}
};

export const signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			return res.status(400).json({ message: "Please provide all the fields" });
		}
		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await bcryptjs.hash(password, 10);

		const user = new User({
			name,
			email,
			password: hashedPassword,
		});

		await user.save();

		generateTokenAndCookie(res, user._id);

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			user: {
				...user._doc,
				password: null,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error registering user" });
	}
};
