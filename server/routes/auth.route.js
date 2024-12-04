import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkAuth, signup, signin } from "../controllers/auth.controller.js";

export const authRoutes = express.Router();

authRoutes.get("/check-auth", verifyToken, checkAuth);
authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);

authRoutes.post("/logout", async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "User logged out successfully" });
});
