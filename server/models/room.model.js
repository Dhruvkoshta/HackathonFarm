import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		unique: true,
	},
	host: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	players: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
	},
	currentStage: {
		type: String,
		required: true,
	}, // e.g., 'pre-flop', 'flop', etc.
	roundData: {
		type: JSON,
	},
	pot: Number,
	lastMoveParsed: JSON,
	roundInProgress: Boolean,
	// Add other game-related fields as needed
});

export default mongoose.model("Room", RoomSchema);
