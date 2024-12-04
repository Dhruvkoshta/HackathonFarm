const Hero = () => {
	return (
		<section
			className='text-center py-24 px-5 bg-cover bg-center text-white'
			style={{
				backgroundImage: "url('https://wallpaperaccess.com/full/803470.jpg')",
			}}
		>
			<h1 className='text-4xl font-bold mb-5'>
				Empowering Farmers with AI for a Climate-Resilient Future
			</h1>
			<p className='text-lg mb-8'>
				Sustainable crops and smarter farming, one prediction at a time.
				<br /> Food camps and a Farmers Forum.
			</p>
			<div className='flex justify-center gap-4'>
				<button className='btn btn-primary text-white'>Get Started</button>
				<button className='btn btn-primary text-white'>Learn More</button>
			</div>
		</section>
	);
};

export default Hero;
