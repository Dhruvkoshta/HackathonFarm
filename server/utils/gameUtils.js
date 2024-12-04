import roomModel from "../models/room.model";
import { User } from "../models/user.model";

export const getPlayerMoney = async (userId) => {
	const player = await User.findById(userId).select("-password");
	if (!player) {
		return 0;
	}
	return player.bankroll;
};

export async function saveRoom(game) {
	const roomData = {
		code: game.gameName,
		host: game.host_userId,
		players: game.players.map((player) => ({
			username: player.username,
			socketId: player.socket.id,
			money: player.getMoney(),
			status: player.getStatus(),
			currentCard: player.currentCard,
			// Add other player properties
		})),
		currentStage: game.currentStage,
		roundData: game.roundData,
		pot: game.pot,
		lastMoveParsed: game.lastMoveParsed,
		roundInProgress: game.roundInProgress,
	};

	await roomModel.findOneAndUpdate({ code: game.code }, roomData, {
		upsert: true,
	});
}
