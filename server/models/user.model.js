import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},

		profilePic: {
			type: String,
			default: `https://raw.githubusercontent.com/mhshariatipour1378/Avatars-Placeholder/refs/heads/master/back-end/images/boy/AV${
				Math.floor(Math.random() * 50) + 1
			}.png`,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		bankroll: {
			type: Number,
			default: 1000,
		},
		friends: {
			type: [mongoose.Schema.Types.ObjectId],
			default: [],
		},
		gamesWon: {
			type: Number,
			default: 0,
		},
		verificationCode: String,
		verificationCodeExpiry: Date,
	},
	{ timeStamps: true }
);

export const User = mongoose.model("User", userSchema);
