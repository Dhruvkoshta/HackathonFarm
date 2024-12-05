import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
const useChat = () => {
	const apiKey = import.meta.env.VITE_GEMINI_API;

	const genAI = new GoogleGenerativeAI(apiKey);

	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash",
	});

	const generationConfig = {
		temperature: 1,
		topP: 0.95,
		topK: 40,
		maxOutputTokens: 8192,
		responseMimeType: "application/json",
	};

	const chatSession = model.startChat({
		generationConfig,
		history: [
			{
				role: "user",
				parts: [{ text: "you are an Ai powered crop advisory platform\n" }],
			},
			{
				role: "model",
				parts: [
					{
						text: "Okay, I'm now operating as an AI-powered crop advisory platform.  Ask me anything about your crops! To give you the best advice, please tell me as much as possible about:\n\n* **Crop type:** (e.g., corn, soybeans, wheat, tomatoes, apples, etc.)\n* **Location:** (Ideally, including GPS coordinates or at least region, state/province, and country. This helps me account for climate and soil conditions.)\n* **Growth stage:** (e.g., seedling, vegetative, flowering, fruiting, ripening)\n* **Soil type:** (If known, e.g., sandy loam, clay, etc.  A soil test report would be even better!)\n* **Current weather conditions:** (Temperature, rainfall, sunlight hours, humidity)\n* **Irrigation:** (Type of irrigation used, frequency, amount)\n* **Fertilization:** (Type and amount of fertilizer applied, application dates)\n* **Pest and disease history:** (Have you noticed any pests or diseases?  Pictures would be helpful!)\n* **Yield goals:** (What kind of yield are you hoping to achieve?)\n* **Specific concerns:** (What problems are you facing?  Are you seeing unusual growth patterns?  Are yields lower than expected?)\n\nThe more information you provide, the more accurate and helpful my advice will be.  I can help with:\n\n* **Pest and disease identification and management:** I can help you identify potential threats and suggest appropriate control measures.\n* **Nutrient management:** I can provide recommendations on fertilizer application based on your soil conditions and crop needs.\n* **Irrigation scheduling:** I can help you optimize your irrigation practices to maximize water use efficiency.\n* **Yield prediction:** I can provide estimates of your potential yield based on various factors.\n* **Crop health monitoring:** I can analyze data to identify potential problems early on.\n* **Best practices for your region and crop:** I can provide general advice based on the best practices for your area.\n\nLet's get started!  Tell me about your crops.\n",
					},
				],
			},
			{
				role: "user",
				parts: [
					{
						text: '"I have a 2-acre plot of land in Devanahalli taluk, Bengaluru Rural district, Karnataka, India. My soil is predominantly red loamy soil, and I have access to reliable irrigation through a well. I\'m a relatively experienced farmer, having previously grown rice and some vegetables. My primary goal is to maximize profit, targeting a commercial market. My main concerns are managing pests and diseases effectively and ensuring reliable market access for my harvest. I would prefer crops that are relatively low-maintenance but offer high yields and good market value. I am looking for suggestions for a suitable crop or crop rotation strategy for the upcoming season (specify season, e.g., Kharif or Rabi)."  Give the output in JSON format',
					},
				],
			},
			{
				role: "model",
				parts: [
					{
						text: '```json\n{\n  "crop_recommendations": [\n    {\n      "crop": "Tomato",\n      "season": "Rabi (October - March)",\n      "reasoning": "Tomatoes are a high-value crop with good market demand in Karnataka.  The Rabi season offers favorable temperatures and sunlight for tomato cultivation.  Red loamy soil is suitable, and with reliable irrigation, you can ensure consistent yields.  While pest and disease management is crucial (e.g., leaf miner, blight), established practices and readily available resources can effectively manage these risks.",\n      "pest_disease_management": [\n        "Regular scouting for pests and diseases.",\n        "Implementing integrated pest management (IPM) strategies.",\n        "Using appropriate pesticides and fungicides as needed (following label instructions).",\n        "Consider disease-resistant varieties."\n      ],\n      "market_access": [\n        "Explore connections with local wholesalers and markets.",\n        "Consider direct sales to restaurants or retailers.",\n        "Investigate potential for processing and value addition (e.g., tomato paste)."\n      ],\n      "additional_notes": "Proper nutrient management (especially potassium) is vital for high yields and quality fruits.  Consider using mulching to conserve moisture and suppress weeds."\n    },\n    {\n      "crop": "Beans (French or Cluster)",\n      "season": "Rabi (October - March)",\n      "reasoning": "Beans are relatively low-maintenance, offer good yields, and have a consistent market demand.  They can be intercropped with other crops for improved land utilization and pest control.",\n      "pest_disease_management": [\n        "Monitor for common bean pests and diseases (e.g., aphids, bean beetles, anthracnose).",\n        "Use crop rotation to break pest and disease cycles.",\n        "Consider using biological pest control methods."\n      ],\n      "market_access": [\n        "Local markets and wholesalers are key distribution channels for beans.",\n        "Consider processing and packaging for better profit margins."\n      ],\n      "additional_notes": "Proper spacing and staking are important for optimal yields.  Ensure adequate nitrogen fertilization."\n    },\n    {\n      "crop": "Sunflower",\n      "season": "Kharif (June - October)",\n      "reasoning": "Sunflowers are a relatively low-maintenance crop, well-suited to the Kharif season in Devanahalli.  They have good market value, particularly for oil extraction, and are relatively resistant to pests and diseases.",\n      "pest_disease_management": [\n        "Monitor for pests such as aphids, whiteflies, and birds.",\n        "Implement preventative measures (e.g., crop rotation).",\n        "Utilize appropriate pest management techniques when necessary."\n      ],\n      "market_access": [\n        "Contact local oil mills or processors to ensure market access.",\n        "Explore options for selling seeds directly to consumers."\n      ],\n      "additional_notes": "Proper spacing is important for optimal sunlight exposure and yields."\n    }\n  ],\n  "location": {\n    "taluk": "Devanahalli",\n    "district": "Bengaluru Rural",\n    "state": "Karnataka",\n    "country": "India"\n  },\n  "soil_type": "Red loamy soil",\n  "irrigation": "Well irrigation",\n  "season_suggestions": ["Kharif", "Rabi"],\n  "disclaimer": "This information is for advisory purposes only.  Local agricultural extension services should be consulted for specific recommendations tailored to your exact conditions and latest market information."\n}\n```\n',
					},
				],
			},
		],
	});

	const addMessage = async ({
		location,
		landSize,
		waterSource,
		farmingGoals,
		soilType,
		experienceLevel,
		farmingSeason,
		additionalInfo,
	}) => {
		const finalPrompt = `I have a ${landSize}-acre plot of land in ${location}, India. My soil is predominantly ${soilType}, and I have access to reliable irrigation through ${waterSource}. I'm a ${experienceLevel} farmer, . My primary goal is to ${farmingGoals}. My main concerns are managing pests and diseases effectively and ensuring reliable market access for my harvest. I would prefer crops that are relatively low-maintenance but offer high yields and good market value. I am looking for suggestions for a suitable crop or crop rotation strategy for the upcoming ${farmingSeason} season .${additionalInfo}`;
		const result = await chatSession.sendMessage(finalPrompt);
		console.log(JSON.parse(result.response.text()));
		return JSON.parse(result.response.text());
	};
	return { addMessage };
};

export default useChat;
