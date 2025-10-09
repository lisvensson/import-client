import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Välkommen!</h1>
        <p className="text-gray-600 mb-8">
          För att komma igång med att ladda upp och analysera dina filer behöver du först skapa ett konto eller logga in.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/signup"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700"
          >
            Skapa konto
          </Link>
          <Link
            to="/signin"
            className="w-full bg-gray-100 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-200"
          >
            Logga in
          </Link>
        </div>
      </div>
    </div>
  );
}