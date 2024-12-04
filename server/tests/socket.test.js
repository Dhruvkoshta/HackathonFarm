// Import necessary modules and initialize the server

const { Server } = require("socket.io");
const Client = require("socket.io-client");
const { init } = require("../controllers/game.controller.js");
let io, serverSocket, clientSocket;

beforeAll((done) => {
	const httpServer = require("http").createServer();
	io = new Server(httpServer);
	httpServer.listen(() => {
		const port = httpServer.address().port;
		clientSocket = new Client(`http://localhost:${port}`);
		io.on("connection", (socket) => {
			serverSocket = socket;
			init(socket, io); // Initialize the socket events from your code
		});
		clientSocket.on("connect", done);
	});
});

afterAll(() => {
	io.close();
	clientSocket.close();
});

describe("Socket.io Poker Game Server", () => {
	test("Create Room with Valid Username", (done) => {
		clientSocket.emit("host", { username: "Player1" });

		clientSocket.on("hostRoom", (data) => {
			expect(data).toBeDefined();
			expect(data.code).toHaveLength(4);
			expect(data.players).toEqual(["Player1"]);
			done();
		});
	});

	test("Reject Room Creation with Invalid Username", (done) => {
		clientSocket.emit("host", { username: "" });

		clientSocket.on("hostRoom", (data) => {
			expect(data).toBeUndefined();
			done();
		});
	});

	test("Join Existing Room with Valid Username", (done) => {
		// Create a room first
		clientSocket.emit("host", { username: "Player1" });

		clientSocket.on("hostRoom", (hostData) => {
			const clientSocket2 = new Client(clientSocket.io.uri);

			clientSocket2.emit("join", { code: hostData.code, username: "Player2" });

			clientSocket2.on("joinRoom", (joinData) => {
				expect(joinData.players).toEqual(["Player1", "Player2"]);
				clientSocket2.close();
				done();
			});
		});
	});

	test("Reject Join Room with Duplicate Username", (done) => {
		clientSocket.emit("host", { username: "Player1" });

		clientSocket.on("hostRoom", (hostData) => {
			const clientSocket2 = new Client(clientSocket.io.uri);
			const clientSocket3 = new Client(clientSocket.io.uri);

			clientSocket2.emit("join", { code: hostData.code, username: "Player2" });
			clientSocket2.on("joinRoom", () => {
				clientSocket3.emit("join", {
					code: hostData.code,
					username: "Player2",
				});

				clientSocket3.on("joinRoom", (joinData) => {
					expect(joinData).toBeUndefined(); // should reject duplicate username
					clientSocket2.close();
					clientSocket3.close();
					done();
				});
			});
		});
	});

	test("Start Game Successfully", (done) => {
		clientSocket.emit("host", { username: "HostPlayer" });

		clientSocket.on("hostRoom", (hostData) => {
			clientSocket.emit("startGame", { code: hostData.code });

			clientSocket.on("gameBegin", (data) => {
				expect(data).toEqual({ code: hostData.code });
				done();
			});
		});
	});

	test("Process Player Move - Bet", (done) => {
		clientSocket.emit("host", { username: "HostPlayer" });

		clientSocket.on("hostRoom", (hostData) => {
			clientSocket.emit("moveMade", { move: "bet", bet: 100 });

			// Listen for any feedback or updates that may indicate the move was successful
			clientSocket.on("displayPossibleMoves", (data) => {
				expect(data).toHaveProperty("move");
				done();
			});
		});
	});

	test("Handle Player Disconnection", (done) => {
		clientSocket.emit("host", { username: "HostPlayer" });

		clientSocket.on("hostRoom", (hostData) => {
			clientSocket.emit("disconnect");

			serverSocket.on("disconnect", () => {
				expect(serverSocket.disconnected).toBeTruthy();
				done();
			});
		});
	});
});
