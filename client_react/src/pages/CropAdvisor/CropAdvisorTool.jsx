import { useState } from "react";
import useGetLocation from "../../hooks/useGetLocation";
import useChat from "../../hooks/useChat";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat";
import Loader from "../../components/Loader";

const CropAdvisorTool = () => {
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const { location } = useGetLocation();
	const { addMessage } = useChat();
	console.log(location);
	console.log(message);
	const [formData, setFormData] = useState({
		location: location,
		landSize: null,
		waterSource: null,
		farmingGoals: null,
		soilType: null,
		experienceLevel: null,
		farmingSeason: null,
		additionalInfo: null,
	});
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const message = await addMessage(formData);
		setMessage(message);
		setLoading(false);
	};
	return (
		<>
			<div
				className='hero min-h-screen'
				style={{
					backgroundImage: "url(/src/assets/4tfc-QIo.jpg)",
				}}
			>
				<div className='hero-overlay bg-opacity-70'></div>
				<div className='flex flex-col items-center justify-center w-full p-8'>
					{loading ? (
						<Loader />
					) : (
						<div className='card bg-base-100 w-1/2  shrink-0 shadow-2xl'>
							{message ? (
								<Chat message={message} />
							) : (
								<form className='card-body' onSubmit={handleSubmit}>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Location:</span>
										</label>
										<input
											type='text'
											placeholder={location}
											name='location'
											className='input input-bordered'
											value={formData.location}
											onChange={handleChange}
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Land Size:</span>
										</label>
										<input
											type='text'
											placeholder='Ex: 2 acres'
											className='input input-bordered'
											name='landSize'
											value={formData.landSize}
											onChange={handleChange}
											required
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Water Source:</span>
										</label>
										<select
											className='select select-bordered w-full max-w-xs'
											name='waterSource'
											value={formData.waterSource}
											onChange={handleChange}
										>
											<option disabled selected>
												Water Source:
											</option>
											<option value='Canals'>Canals</option>
											<option value='Tube Wells'>Tube Wells</option>
											<option value='Wells'>Wells</option>
											<option value='Rivers'>Rivers</option>
											<option value='Rainwater'>Rainwater</option>
										</select>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Farming Goals:</span>
										</label>
										<select
											className='select select-bordered w-full max-w-xs'
											name='farmingGoals'
											value={formData.farmingGoals}
											onChange={handleChange}
										>
											<option disabled selected>
												Goals
											</option>
											<option value='Maximize Crop and Livestock Productivity'>
												{" "}
												Maximize Crop and Livestock Productivity
											</option>
											<option value='Ensure Sustainable Agriculture'>
												Ensure Sustainable Agriculture
											</option>
											<option value='Optimize Water and Resource Use'>
												Optimize Water and Resource Use
											</option>
											<option value='Increase Profitability with Sustainablility'>
												Increase Profitability with Sustainablility
											</option>
										</select>
									</div>

									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Soil Type:</span>
										</label>
										<input
											type='text'
											placeholder='Ex: Black Soil/Red Soil/Laterite Soil/Mountain Soil/Desert Soil/Peaty and Marshy Soil'
											className='input input-accent input-bordered'
											name='soilType'
											value={formData.soilType}
											onChange={handleChange}
											required
										/>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Experience level:</span>
										</label>
										<select
											className='select select-accent select-bordered w-full max-w-xs'
											name='experienceLevel'
											value={formData.experienceLevel}
											onChange={handleChange}
										>
											<option disabled selected>
												Experience
											</option>
											<option value='Beginner (Starting Out)'>
												Beginner (Starting Out)
											</option>
											<option value='Intermediate'>Intermediate</option>
											<option value='Experienced'>Experienced</option>
										</select>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Farming Season:</span>
										</label>
										<select
											className='select select-bordered w-full max-w-xs'
											name='farmingSeason'
											value={formData.farmingSeason}
											onChange={handleChange}
										>
											<option disabled selected>
												Season
											</option>
											<option value='Kharif Season (Monsoon Crops)'>
												Kharif Season (Monsoon Crops)
											</option>
											<option value='Rabi Season (Winter Crops)'>
												Rabi Season (Winter Crops)
											</option>
											<option value='Zaid Season (Summer Crops)'>
												Zaid Season (Summer Crops)
											</option>
										</select>
									</div>
									<div className='form-control'>
										<label className='label'>
											<span className='label-text'>Additinal Info:</span>
										</label>
										<input
											type='text'
											placeholder=''
											name='additionalInfo'
											className='input input-bordered'
											onChange={handleChange}
											value={formData.additionalInfo}
										/>
									</div>
									<div className='form-control mt-6'>
										<button className='btn btn-primary' type='submit'>
											Get Details
										</button>
									</div>
								</form>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CropAdvisorTool;
