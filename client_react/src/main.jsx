import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CropAdvisor from "./pages/CropAdvisor/CropAdvisor.jsx";
import Chat from "./components/Chat.jsx";
import { ChatContextProvider } from "./context/chatContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/CropAdvisor' element={<CropAdvisor />} />
				<Route
					path='/chat'
					element={
						<ChatContextProvider>
							<Chat />
						</ChatContextProvider>
					}
				/>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
