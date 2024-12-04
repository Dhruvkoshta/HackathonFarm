const Navbar = () => {
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<a className='btn btn-ghost text-xl'>daisyUI</a>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1'>
					<li>
						<a>Crop Advisory Tool</a>
					</li>
					<li>
						<a>Food Donation Camps</a>
					</li>
					<li>
						<a>Farmers Forum</a>
					</li>
				</ul>
			</div>
			<div className='navbar-end'>
				<a className='btn'>Button</a>
			</div>
		</div>
	);
};

export default Navbar;
