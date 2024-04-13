import { Link } from "react-router-dom";
import quackstackLogo from "../assets/quackstack.svg";

export function Navbar() {
  return (
    <nav className="bg-background shadow-md shadow-gray-700 border border-gray-600 py-2">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {" "}
        {/* Added flex class */}
        <div className="flex items-center">
          <img
            src={quackstackLogo}
            alt="QuackStack Logo"
            className="h-12 mr-1"
          />
          <Link
            className="text-white hover:text-gray-400 mx-3 font-bold"
            to="/"
          >
            QuackStack
          </Link>
        </div>
        <Link
          className="text-white hover:text-gray-400 mx-3 font-bold"
          to="/signout"
        >
          New Project
        </Link>
      </div>
    </nav>
  );
}
