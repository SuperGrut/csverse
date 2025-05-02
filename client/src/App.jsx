import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import { useAuth } from "./hooks/useAuth";
import { LoaderCircle } from "lucide-react";

function App() {
  const { user, loading, signInWithTwitter, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin h-12 w-12 text-indigo-600" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar
        user={user}
        signOut={signOut}
        signInWithTwitter={signInWithTwitter}
      />

      {user ? (
        <main className="pt-20 container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      ) : (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)] text-center px-4">
          <h1 className="text-2xl font-semibold mb-4">Welcome to csverse!</h1>
          <p className="mb-6 text-gray-600">
            Please sign in to contribute and view resources.
          </p>
          <button
            onClick={signInWithTwitter}
            className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Sign in with X
          </button>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
