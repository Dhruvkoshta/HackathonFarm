import { Server } from "socket.io";
import http from "http";
import express from "express";
import { init } from "../controllers/game.controller.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: [`${process.env.SERVER_URL}`, "http://localhost:5173"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {};
export const getSocketId = (Id) => {
	return userSocketMap[Id];
};

// let rooms = [];

io.on("connection", (socket) => {
	console.log("new connection ", socket.id);
	const userId = socket.handshake.query.userId;
	if (userId !== undefined) {
		userSocketMap[userId] = socket;
	}
	init(socket, io);
});

export { app, server, io };
