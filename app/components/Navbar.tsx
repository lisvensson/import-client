import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <Link to="/" className="text-lg font-semibold text-indigo-600 hover:text-indigo-800">
            Hem
          </Link>
        </div>

        <div className="flex-1 text-center">
          <Link to="/upload" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
            Ladda upp fil
          </Link>
        </div>

        <div className="flex-1 text-right">
          <Link to="/signin" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Logga in
          </Link>
        </div>
      </div>
    </nav>
  );
}