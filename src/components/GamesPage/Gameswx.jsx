// import React, { useState } from "react";

// export default function GameHub() {
//   const [selectedGame, setSelectedGame] = useState(null);

//   const games = [
//     {
//       title: "Memory Matching Game",
//       url: "https://match.thelearningapps.com/",
//     },
//     {
//       title: "Puzzle Matching Game",
//       url: "https://www.proprofsgames.com/memory/",
//     },
//     {
//       title: "Sudoku",
//       url: "https://cdn.htmlgames.com/DailyMiniSudoku/",
//     },
//     {
//       title: "Puzzle Game",
//       url: "https://www.proprofsgames.com/sliding-puzzle/",
//     },
//     {
//       title: "Reaction Time Test",
//       url: "https://humanbenchmark.com/tests/reactiontime",
//     },
//     {
//       title: "Cognitive Stroop Test",
//       url: "https://cognitivefun.net/test/2",
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Brain Training Games</h1>

//       {!selectedGame && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {games.map((game, index) => (
//             <div
//               key={index}
//               className="p-6 bg-white shadow-xl rounded-2xl cursor-pointer text-center border border-purple-300 hover:shadow-2xl transition"
//               onClick={() => setSelectedGame(game)}
//             >
//               <h2 className="text-xl font-semibold">{game.title}</h2>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedGame && (
//         <div className="max-w-5xl mx-auto">
//           <button
//             onClick={() => setSelectedGame(null)}
//             className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700"
//           >
//             ◀ Back to Games
//           </button>

//           <div className="w-full h-[700px]">
//             <iframe
//               src={selectedGame.url}
//               width="100%"
//               height="100%"
//               style={{ border: "none" }}
//               title={selectedGame.title}
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
