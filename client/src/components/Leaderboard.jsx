import React from "react";

// Sample data - replace with actual data from your backend
const leaderboardData = [
  {
    rank: 1,
    username: "CodeNinja",
    avatar: "https://via.placeholder.com/40/0000FF/FFFFFF?text=CN", // Placeholder
    contributed: 25,
    score: 1250,
  },
  {
    rank: 2,
    username: "ScriptSavvy",
    avatar: "https://via.placeholder.com/40/FF0000/FFFFFF?text=SS", // Placeholder
    contributed: 18,
    score: 1100,
  },
  {
    rank: 3,
    username: "AlgoAce",
    avatar: "https://via.placeholder.com/40/008000/FFFFFF?text=AA", // Placeholder
    contributed: 30,
    score: 1050,
  },
  {
    rank: 4,
    username: "DebugDemon",
    avatar: "https://via.placeholder.com/40/FFA500/FFFFFF?text=DD", // Placeholder
    contributed: 15,
    score: 980,
  },
  {
    rank: 5,
    username: "SyntaxSorcerer",
    avatar: "https://via.placeholder.com/40/800080/FFFFFF?text=SS", // Placeholder
    contributed: 22,
    score: 950,
  },
  // Add more users as needed
];

const Leaderboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Leaderboard
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-5 py-3">Rank</th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3 text-center">Contributed</th>
              <th className="px-5 py-3 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user) => (
              <tr
                key={user.rank}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-5 py-5 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap font-semibold">
                    {user.rank}
                  </p>
                </td>
                <td className="px-5 py-5 text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user.avatar}
                        alt={`${user.username}'s avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap font-medium">
                        {user.username}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 text-sm text-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {user.contributed}
                  </p>
                </td>
                <td className="px-5 py-5 text-sm text-right">
                  <p className="text-indigo-600 whitespace-no-wrap font-bold">
                    {user.score}
                  </p>
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
