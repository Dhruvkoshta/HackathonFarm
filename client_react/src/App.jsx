import "./App.css";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<div className='grid  grid-cols-1 md:grid-cols-3 w-full p-4 items-center justify-center gap-4'>
				<Cards />
				<Cards />
				<Cards />
			</div>
			<Footer />
		</>
	);
}

export default App;
