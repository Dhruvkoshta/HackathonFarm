import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);
	return (
		<ChatContext.Provider
			value={{
				messages,
				setMessages,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
