import { Link } from "react-router-dom";
import quackstackLogo from "../assets/quackstack.svg";

export function Navbar() {
	return (
		<nav className="bg-darkGreen shadow-lg py-2">
			<div className="container mx-auto px-6 flex justify-between items-center">
				{" "}
				{/* Added flex class */}
				<div className="flex items-center">
					<img src={quackstackLogo} alt="QuackStack Logo" className="h-12 mr-1" />
					<Link
						className="text-cream hover:text-gray-300 mx-3 font-bold"
						to="/"
					>
						QuackStack
					</Link>
					<Link
						className="text-cream hover:text-gray-300 mx-3 font-bold"
						to="/upload"
					>
						Upload
					</Link>
					<Link
						className="text-cream hover:text-gray-300 mx-3 font-bold"
						to="/signout"
					>
						Signout
					</Link>
				</div>
			</div>
		</nav>
	);
}
