// import React from "react";
// import "../components/GamesPage/GamesPageStyles/games.css";
// import "../styles/home.css";
// import MyNavbar from "../components/Navbar.jsx";
// import g1 from "../assets/images/g1.png";
// import g2 from "../assets/images/g2.png";
// import { useEffect } from 'react';
// import GameHub from "../components/GamesPage/Gameswx.jsx";

// const games = [
//   {
//     title: "Suduko",
//     description: "Sharpen your focus and recall skills by matching pairs before time runs out.",
//     image: g1,
//   },
//   {
//     title: "Puzzles",
//     description: "Challenge your reasoning and problem-solving with tricky puzzles.",
//     image: g2,
//   },
// ];

// const Games = () => {
  

//   return (
//     <div className="games-container">
//       <div className="navbar-section">
//         <MyNavbar />
//       </div>
//       <section className="games-section">
//         <div className="games-grid">
//           {games.map((game, index) => (
//             <div className="game-card" key={index}>
//               <div className="game-image">
//                 <img src={game.image} alt={game.title} />
//               </div>
//               <div className="game-info">
//                 <h2>{game.title}</h2>
//                 <p>{game.description}</p>
//                 <button className="play-btn">Play Now</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

  
//     </div>
//   );
// };

// export default Games;
