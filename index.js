import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { app, server } from "./server/socket/socket.js";
import bodyParser from "body-parser";
import { authRoutes } from "./server/routes/auth.route.js";
import { connectDB } from "./server/DB/connectDB.js";

dotenv.config();
console.log(process.env.NODE_ENV);
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(
	cors({
		origin: [`${process.env.VITE_APP_URL}`, "http://localhost:5174"],
		credentials: true,
	})
);
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
// app.use("/api/users", userRoutes);

app.use("/", express.static(__dirname + "/client"));

if (`${process.env.NODE_ENV}` === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
server.listen(port, () => {
	connectDB();
	console.log("Server is running on port " + port);
});
