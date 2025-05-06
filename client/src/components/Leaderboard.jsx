import React, { useState, useEffect } from "react";

// Sample data - replace with actual data from your backend
// const leaderboardData = [ ... removed hardcoded data ... ];
const apiUrl = import.meta.env.VITE_API_URL;

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        // Ensure the API endpoint is correct and accessible
        const response = await fetch(`${apiUrl}/api/v1/users/leaderboard`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // Process data to add rank and contributed
        const processedData = data.data.map((user, index) => ({
          ...user,
          rank: index + 1, // Rank based on array index (1-based)
          contributed: Math.floor(user.score / 10), // Calculate contributed
          avatar: user.avatarUrl, // Map avatarUrl to avatar for consistency
        }));

        setLeaderboardData(processedData);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className="text-white text-center py-8">Loading leaderboard...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading leaderboard: {error}
      </div>
    );
  }

  if (leaderboardData.length === 0) {
    return <div className="text-center py-8">Leaderboard is empty.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Leaderboard
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-2 py-2 md:px-5 md:py-3">Rank</th>
              <th className="px-2 py-2 md:px-5 md:py-3">User</th>
              <th className="px-2 py-2 md:px-5 md:py-3 text-center">
                Contributed
              </th>
              <th className="px-2 py-2 md:px-5 md:py-3 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-2 py-3 md:px-5 md:py-5 text-sm">
                  <p className="text-gray-900 font-semibold">{user.rank}</p>
                </td>
                <td className="px-2 py-3 md:px-5 md:py-5 text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10">
                      <a
                        href={`https://x.com/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src={user.avatar}
                          alt={`${user.username}'s avatar`}
                        />
                      </a>
                    </div>
                    <div className="ml-2 md:ml-3">
                      <a
                        href={`https://x.com/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 font-medium hover:underline"
                      >
                        {user.username}
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 md:px-5 md:py-5 text-sm text-center">
                  <p className="text-gray-900">{user.contributed}</p>
                </td>
                <td className="px-2 py-3 md:px-5 md:py-5 text-sm text-right">
                  <p className="text-indigo-600 font-bold">{user.score}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
