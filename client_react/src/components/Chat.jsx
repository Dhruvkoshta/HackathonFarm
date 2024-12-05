const Chat = ({ message }) => {
	return (
		<>
			<div className='flex flex-col items-center justify-center w-full p-8'>
				<div className='container mx-auto p-4'>
					{/* Location and Soil Information */}
					<div className='bg-gray-100 p-4 rounded-lg mb-6 shadow-md'>
						<h2 className='text-2xl font-bold mb-2 text-gray-800'>
							Location and Soil Details
						</h2>
						<p>
							<strong>Taluk:</strong> {message.location.taluk}
						</p>
						<p>
							<strong>District:</strong> {message.location.district}
						</p>
						<p>
							<strong>State:</strong> {message.location.state}
						</p>
						<p>
							<strong>Country:</strong> {message.location.country}
						</p>
						<p>
							<strong>Soil Type:</strong> {message.soil_type}
						</p>
						<p>
							<strong>Irrigation:</strong> {message.irrigation}
						</p>
					</div>

					{/* Crop Recommendations */}
					<div>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>
							Crop Recommendations
						</h2>
						{message.crop_recommendations.map((crop, index) => (
							<div
								key={index}
								className='bg-white p-6 rounded-lg mb-6 shadow-lg'
							>
								<h3 className='text-xl font-semibold mb-2 text-blue-800'>
									{crop.crop}
								</h3>
								<p>
									<strong>Season:</strong> {crop.season}
								</p>
								<p className='mt-2 text-gray-700'>
									<strong>Reasoning:</strong> {crop.reasoning}
								</p>

								{/* Pest and Disease Management */}
								<div className='mt-4'>
									<h4 className='text-lg font-semibold text-red-600'>
										Pest and Disease Management
									</h4>
									<ul className='list-disc pl-6 mt-2'>
										{crop.pest_disease_management.map((tip, idx) => (
											<li key={idx}>{tip}</li>
										))}
									</ul>
								</div>

								{/* Market Access */}
								<div className='mt-4'>
									<h4 className='text-lg font-semibold text-green-600'>
										Market Access
									</h4>
									<ul className='list-disc pl-6 mt-2'>
										{crop.market_access.map((access, idx) => (
											<li key={idx}>{access}</li>
										))}
									</ul>
								</div>

								{/* Additional Notes */}
								<p className='mt-4 text-gray-600'>
									<strong>Additional Notes:</strong> {crop.additional_notes}
								</p>
							</div>
						))}
					</div>

					{/* Disclaimer */}
					<div className='bg-yellow-100 p-4 rounded-lg mt-6 shadow-md'>
						<p className='text-sm text-yellow-800 font-medium'>
							{message.disclaimer}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
