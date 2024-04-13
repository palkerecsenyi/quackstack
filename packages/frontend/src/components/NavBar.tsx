import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-darkGreen shadow-lg py-2">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {" "}
        {/* Added flex class */}
        <div className="flex items-center">
          <Link
            className="text-cream hover:text-gray-300 mx-3 font-bold"
            to="/"
          >
            Home
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
