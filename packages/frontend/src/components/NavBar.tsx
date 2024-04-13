import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-gray-600 shadow-lg py-2">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Added flex class */}
        <div className="flex items-center w-full">
          {" "}
          {/* Change width to full */}
          <Link
            className="text-cream hover:text-gray-300 mx-3 font-bold"
            to="/"
          >
            QuackStack
          </Link>
        </div>
        <div>
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
