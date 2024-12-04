import { useNavigate } from "react-router-dom";

const Cards = ({ type }) => {
	const navigate = useNavigate();
	const details = {};

	if (type === "advisor") {
		details.title = "Ai powered crop advisory platform";
		details.description =
			"To assist farmers in making data-driven decisions for crop selection, planting, and maintenance, considering climate change, soil health, and market conditions.";
		details.image =
			"https://khetibuddy.com/wp-content/uploads/2024/02/Hand-using-device-with-stats-and-crops-in-the-background.png";
		details.nav = "CropAdvisor";
	} else if (type === "donation") {
		details.title = "Food and Crop donation camps";
		details.description =
			"Food donation camp bridges the gap between surplus agricultural produce and communities in need. This addition helps reduce food wastage while supporting vulnerable populations.";
		details.image = "/src/assets/donation.png";
		details.nav = "CropAdvisor";
	} else if (type === "forum") {
		details.title = "Farmers Forum";
		details.description =
			"To assist farmers in making data-driven decisions for crop selection, planting, and maintenance, considering climate change, soil health, and market conditions.";
		details.image =
			"https://i0.wp.com/tsfrcbo.org/wp-content/uploads/2023/10/Knowledge-Forum-The-Farming-Life-2160-%C3%97-1080-px-1.jpg?fit=2160%2C1080&ssl=1";
		details.nav = "CropAdvisor";
	}

	return (
		<div className='card bg-base-100 w-96 shadow-xl'>
			<figure>
				<img src={details.image} alt='img' className='max-w-96 h-64' />
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>{details.title}</h2>
				<div className='divider divider-primary'>Description</div>
				<p>{details.description}</p>
				<div className='card-actions justify-center'>
					<button
						className='btn btn-primary text-white my-2'
						onClick={() => {
							navigate(`/${details.nav}`);
						}}
					>
						Open Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cards;
