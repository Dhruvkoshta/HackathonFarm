import { Link } from "react-router-dom";
const Navbar = ({ active }) => {
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<a className='btn btn-ghost text-xl'>daisyUI</a>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1'>
					<li
						className={`btn btn-primary  mx-2 hover:text-white ${
							active === "CropAdvisor" && "btn-outline"
						}`}
					>
						<Link to='/CropAdvisor'>Crop Advisory Tool</Link>
					</li>
					<li
						className={`btn btn-primary  mx-2 hover:text-white ${
							active === "CropAdvisor" && "btn-outline"
						}`}
					>
						<Link to=''>Food Donation Camps</Link>
					</li>
					<li
						className={`btn btn-primary  mx-2 hover:text-white ${
							active === "CropAdvisor" && "btn-outline"
						}`}
					>
						<Link to=''>Farmers Forum</Link>
					</li>
				</ul>
			</div>
			<div className='navbar-end'>
				<a className='btn mx-2 text-white btn-primary '>Login</a>
				<a className='btn mx-2 text-white btn-primary '>SignUp</a>
			</div>
		</div>
	);
};

export default Navbar;
