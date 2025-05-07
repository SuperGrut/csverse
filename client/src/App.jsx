import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import { useAuth } from "./hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Index from "./Index";

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
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar
        user={user}
        signOut={signOut}
        signInWithTwitter={signInWithTwitter}
      />

      {user ? (
        <main className="pt-20 container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      ) : (
        <Index signInWithTwitter={signInWithTwitter} />
      )}
    </BrowserRouter>
  );
}

export default App;
