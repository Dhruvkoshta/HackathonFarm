const Cards = () => {
	return (
		<div className='card bg-base-100 w-96 shadow-xl'>
			<figure>
				<img
					src='https://khetibuddy.com/wp-content/uploads/2024/02/Hand-using-device-with-stats-and-crops-in-the-background.png'
					alt='Shoes'
				/>
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>Ai powered crop advisory platform</h2>
				<p>
					To assist farmers in making data-driven decisions for crop selection,
					planting, and maintenance, considering climate change, soil health,
					and market conditions.
				</p>
				<div className='card-actions justify-end'>
					<button className='btn btn-primary'>Buy Now</button>
				</div>
			</div>
		</div>
	);
};

export default Cards;
