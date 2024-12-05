import { useEffect, useState } from "react";
import useGetGeoLocation from "./useGetGeoLocation";
import axios from "axios";
const useGetLocation = () => {
	const [location, setLocation] = useState();
	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGetGeoLocation();
	useEffect(() => {
		const Location = async () => {
			if (coords && isGeolocationAvailable && isGeolocationEnabled) {
				const { latitude, longitude } = coords;
				try {
					const res = await axios.get(
						`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=c6a8328fe5794f278a176d30650f4f4b`
					);
					setLocation(res.data.features[0].properties.formatted);
					console.log(res.data.features[0].properties.formatted);
				} catch (error) {
					console.log(error);
				}
			}
		};
		Location();
	}, []);
	return { location };
};

export default useGetLocation;
