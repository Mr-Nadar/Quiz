import React, { useState } from "react";

const topics = [
  { id: "gk", name: "General Knowledge" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "history", name: "History" },
];

function LeaderBoard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const [selectedTopic, setSelectedTopic] = useState(topics[0].id);

  // Calculate overall topper (sum best score per topic for each user)
  const userBestScores = {};
  leaderboardData.forEach((entry) => {
    const key = entry.email;
    if (!userBestScores[key])
      userBestScores[key] = {
        name: entry.name,
        email: entry.email,
        total: 0,
        avatar: entry.name ? entry.name[0].toUpperCase() : "?",
      };
    // For each topic, keep only the best score
    if (!userBestScores[key][entry.topic] || userBestScores[key][entry.topic] < entry.score) {
      userBestScores[key][entry.topic] = entry.score;
    }
  });
  // Sum best scores per topic for each user
  Object.values(userBestScores).forEach((u) => {
    u.total = topics.reduce((sum, t) => sum + (u[t.id] || 0), 0);
  });
  // Find the overall topper
  const toppers = Object.values(userBestScores).sort((a, b) => b.total - a.total);
  const overallTopper = toppers[0];

  // Filter and sort leaderboard by topic and score
  const filtered = leaderboardData
    .filter((entry) => entry.topic === selectedTopic)
    .sort((a, b) => b.score - a.score || new Date(a.date) - new Date(b.date));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-2">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-blue-700 tracking-tight">Leaderboard</h2>
        {/* Overall Topper Section */}
        {overallTopper && (
          <div className="mb-6 flex flex-col items-center">
            <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 rounded-xl px-6 py-3 shadow font-bold">
              <span className="w-12 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-full text-2xl border-4 border-yellow-300">
                {overallTopper.avatar}
              </span>
              <div>
                <div className="text-lg text-yellow-800">🏆 Overall Topper</div>
                <div className="text-blue-800">{overallTopper.name}</div>
                <div className="text-sm text-gray-700">Total Score: {overallTopper.total}</div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center mb-6">
          <div className="flex gap-2 bg-blue-50 rounded-full p-1">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-1 rounded-full font-semibold transition
                  ${selectedTopic === topic.id
                    ? "bg-blue-600 text-white shadow"
                    : "text-blue-700 hover:bg-blue-200"}
                `}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="pb-2 text-gray-600 font-semibold">Rank</th>
                <th className="pb-2 text-gray-600 font-semibold">User</th>
                <th className="pb-2 text-gray-600 font-semibold">Score</th>
                <th className="pb-2 text-gray-600 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    No attempts for this topic yet.
                  </td>
                </tr>
              )}
              {filtered.map((entry, idx) => (
                <tr
                  key={entry.name + entry.email + entry.date + idx}
                  className={`rounded-lg transition
                    ${user && entry.email === user.email ? "bg-blue-100 font-bold" : "bg-white"}
                  `}
                >
                  <td className="py-2 px-2 rounded-l-lg">{idx + 1}</td>
                  <td className="py-2 px-2 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full font-bold">
                      {entry.name ? entry.name[0].toUpperCase() : "?"}
                    </span>
                    <span>{entry.name}</span>
                  </td>
                  <td className="py-2 px-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {entry.score} / {entry.total}
                    </span>
                  </td>
                  <td className="py-2 px-2 rounded-r-lg text-gray-500 text-xs">
                    {new Date(entry.date).toLocaleDateString()}
                    <br />
                    <span className="text-[10px]">{new Date(entry.date).toLocaleTimeString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center text-gray-400 text-xs">
          Only your best attempt per topic is shown. Try to beat your high score!
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;