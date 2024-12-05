import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CropAdvisorTool from "./CropAdvisorTool";

const CropAdvisor = () => {
	return (
		<>
			<Navbar active='CropAdvisor' />
			<div
				className='hero min-h-screen'
				style={{
					backgroundImage: "url(/src/assets/cropback.png)",
				}}
			>
				<div className='hero-overlay bg-opacity-50'></div>
				<div className='hero-content text-neutral-content text-center'>
					<div className='max-w-md'>
						<h1 className=' text-5xl font-bold my-8'>Key Features</h1>
						<p className='my-4'>
							1. Crop Suitability Analysis Functionality: Suggests the best
							crops based on location, soil type, and climate data.{" "}
						</p>
						<p className='my-4'>
							2. Weather-Based Alerts Functionality: Sends timely notifications
							about extreme weather (e.g., droughts, storms, frost).{" "}
						</p>
						<p className='my-4'>
							{" "}
							3. Soil Health Dashboard Functionality: Analyzes soil test results
							and suggests fertilizers, amendments, and crop rotations.
						</p>
						<button className='btn btn-primary my-8'>Get Started</button>
					</div>
				</div>
			</div>
			<CropAdvisorTool />
			<Footer />
		</>
	);
};

export default CropAdvisor;
