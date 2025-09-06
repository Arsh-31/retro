// export default function Planets() {
//   return (
//     <>
//       {/* Sun */}
//       <div className="absolute top-1/2 left-[2%] transform -translate-y-1/2 w-48 h-48 bg-yellow-400 rounded-full shadow-lg animate-pulse"></div>

//       {/* Mercury */}
//       <div className="absolute top-1/2 left-[20%] transform -translate-y-1/2 w-6 h-6 bg-gray-400 rounded-full shadow-lg animate-pulse"></div>

//       {/* Venus */}
//       <div className="absolute top-1/2 left-[25%] transform -translate-y-1/2 w-10 h-10 bg-yellow-200 rounded-full shadow-lg animate-pulse"></div>

//       {/* Earth */}
//       <div className="absolute top-1/2 left-[32%] transform -translate-y-1/2 w-12 h-12 bg-blue-400 rounded-full shadow-lg animate-pulse"></div>

//       {/* Mars */}
//       <div className="absolute top-1/2 left-[38%] transform -translate-y-1/2 w-8 h-8 bg-red-400 rounded-full shadow-lg animate-pulse"></div>

//       {/* Jupiter */}
//       <div className="absolute top-1/2 left-[50%] transform -translate-y-1/2 w-24 h-24 bg-orange-300 rounded-full shadow-lg animate-pulse"></div>

//       {/* Saturn */}
//       <div className="absolute top-1/2 left-[65%] transform -translate-y-1/2 w-20 h-20 bg-yellow-300 rounded-full shadow-lg animate-pulse"></div>

//       {/* Uranus */}
//       <div className="absolute top-1/2 left-[78%] transform -translate-y-1/2 w-16 h-16 bg-teal-300 rounded-full shadow-lg animate-pulse"></div>

//       {/* Neptune */}
//       <div className="absolute top-1/2 left-[90%] transform -translate-y-1/2 w-16 h-16 bg-indigo-400 rounded-full shadow-lg animate-pulse"></div>
//     </>
//   );
// }

// export default function Planets() {
//   return (
//     <>
//       {/* Sun */}
//       <div
//         className="absolute top-1/2 left-[2%] transform -translate-y-1/2 w-48 h-48 rounded-full shadow-lg"
//         style={{
//           background: "radial-gradient(circle at center, #FFD700, #FF8C00)",
//         }}
//       ></div>

//       {/* Mercury */}
//       <div
//         className="absolute top-1/2 left-[20%] transform -translate-y-1/2 w-6 h-6 rounded-full shadow-lg"
//         style={{
//           background:
//             "repeating-radial-gradient(circle, #bbb 0px, #999 3px, #bbb 6px)",
//         }}
//       ></div>

//       {/* Venus */}
//       <div
//         className="absolute top-1/2 left-[25%] transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg"
//         style={{
//           background: "radial-gradient(circle, #e6c68e, #d4a15a, #a37c27)",
//         }}
//       ></div>

//       {/* Earth */}
//       <div
//         className="absolute top-1/2 left-[32%] transform -translate-y-1/2 w-12 h-12 rounded-full shadow-lg"
//         style={{
//           background:
//             "radial-gradient(circle, #2b6cb0, #1a365d), repeating-linear-gradient(45deg, #228b22 0 5px, transparent 5px 10px)",
//           backgroundBlendMode: "overlay",
//         }}
//       ></div>

//       {/* Mars */}
//       <div
//         className="absolute top-1/2 left-[38%] transform -translate-y-1/2 w-8 h-8 rounded-full shadow-lg"
//         style={{
//           background: "radial-gradient(circle, #ff6347, #b22222)",
//         }}
//       ></div>

//       {/* Jupiter */}
//       <div
//         className="absolute top-1/2 left-[50%] transform -translate-y-1/2 w-24 h-24 rounded-full shadow-lg"
//         style={{
//           background:
//             "repeating-linear-gradient(90deg, #f4a460 0px, #f4a460 10px, #d2691e 10px, #d2691e 20px, #deb887 20px, #deb887 30px)",
//         }}
//       ></div>

//       {/* Saturn */}
//       <div
//         className="absolute top-1/2 left-[65%] transform -translate-y-1/2 w-20 h-20 rounded-full shadow-lg"
//         style={{
//           background:
//             "repeating-linear-gradient(90deg, #e3c16f 0px, #e3c16f 8px, #d2b48c 8px, #d2b48c 16px)",
//         }}
//       ></div>

//       {/* Uranus */}
//       <div
//         className="absolute top-1/2 left-[78%] transform -translate-y-1/2 w-16 h-16 rounded-full shadow-lg"
//         style={{
//           background: "radial-gradient(circle, #7fffd4, #40e0d0, #20b2aa)",
//         }}
//       ></div>

//       {/* Neptune */}
//       <div
//         className="absolute top-1/2 left-[90%] transform -translate-y-1/2 w-16 h-16 rounded-full shadow-lg"
//         style={{
//           background: "radial-gradient(circle, #4169e1, #000080)",
//         }}
//       ></div>
//     </>
//   );
// }
"use client";
import { useState } from "react";

type PlanetKey =
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

const planetData: Record<PlanetKey, { name: string; info: string }> = {
  sun: {
    name: "Sun",
    info: "The star at the center of our solar system, providing light and energy.",
  },
  mercury: {
    name: "Mercury",
    info: "The smallest planet, closest to the Sun.",
  },
  venus: {
    name: "Venus",
    info: "A hot planet with thick atmosphere, often called Earth's twin.",
  },
  earth: {
    name: "Earth",
    info: "Our home planet, the only known one with life.",
  },
  mars: {
    name: "Mars",
    info: "The red planet, known for its dusty surface and potential for exploration.",
  },
  jupiter: {
    name: "Jupiter",
    info: "The largest planet with giant storms like the Great Red Spot.",
  },
  saturn: { name: "Saturn", info: "Famous for its beautiful rings." },
  uranus: { name: "Uranus", info: "An icy giant with a tilted rotation." },
  neptune: {
    name: "Neptune",
    info: "A windy blue planet, farthest from the Sun.",
  },
};

export default function Planets() {
  const [activePlanet, setActivePlanet] = useState<PlanetKey | null>(null);

  return (
    <div className="relative w-full h-screen">
      {/* Sun */}
      <div
        onClick={() => setActivePlanet("sun")}
        className="absolute top-1/2 left-[2%] transform -translate-y-1/2 w-48 h-48 rounded-full shadow-lg cursor-pointer"
        style={{
          background: "radial-gradient(circle at center, #FFD700, #FF8C00)",
        }}
      ></div>

      {/* Mercury */}
      <div
        onClick={() => setActivePlanet("mercury")}
        className="absolute top-1/2 left-[20%] transform -translate-y-1/2 w-6 h-6 rounded-full shadow-lg cursor-pointer"
        style={{
          background:
            "repeating-radial-gradient(circle, #bbb 0px, #999 3px, #bbb 6px)",
        }}
      ></div>

      {/* Venus */}
      <div
        onClick={() => setActivePlanet("venus")}
        className="absolute top-1/2 left-[25%] transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg cursor-pointer"
        style={{
          background: "radial-gradient(circle, #e6c68e, #d4a15a, #a37c27)",
        }}
      ></div>

      {/* Earth */}
      <div
        onClick={() => setActivePlanet("earth")}
        className="absolute top-1/2 left-[32%] transform -translate-y-1/2 w-12 h-12 rounded-full shadow-lg cursor-pointer"
        style={{
          background:
            "radial-gradient(circle, #2b6cb0, #1a365d), repeating-linear-gradient(45deg, #228b22 0 5px, transparent 5px 10px)",
          backgroundBlendMode: "overlay",
        }}
      ></div>

      {/* Mars */}
      <div
        onClick={() => setActivePlanet("mars")}
        className="absolute top-1/2 left-[38%] transform -translate-y-1/2 w-8 h-8 rounded-full shadow-lg cursor-pointer"
        style={{
          background: "radial-gradient(circle, #ff6347, #b22222)",
        }}
      ></div>

      {/* Jupiter */}
      <div
        onClick={() => setActivePlanet("jupiter")}
        className="absolute top-1/2 left-[50%] transform -translate-y-1/2 w-24 h-24 rounded-full shadow-lg cursor-pointer"
        style={{
          background:
            "repeating-linear-gradient(90deg, #f4a460 0px, #f4a460 10px, #d2691e 10px, #d2691e 20px, #deb887 20px, #deb887 30px)",
        }}
      ></div>

      {/* Saturn */}
      <div
        onClick={() => setActivePlanet("saturn")}
        className="absolute top-1/2 left-[65%] transform -translate-y-1/2 w-20 h-20 rounded-full shadow-lg cursor-pointer"
        style={{
          background:
            "repeating-linear-gradient(90deg, #e3c16f 0px, #e3c16f 8px, #d2b48c 8px, #d2b48c 16px)",
        }}
      ></div>

      {/* Uranus */}
      <div
        onClick={() => setActivePlanet("uranus")}
        className="absolute top-1/2 left-[78%] transform -translate-y-1/2 w-16 h-16 rounded-full shadow-lg cursor-pointer"
        style={{
          background: "radial-gradient(circle, #7fffd4, #40e0d0, #20b2aa)",
        }}
      ></div>

      {/* Neptune */}
      <div
        onClick={() => setActivePlanet("neptune")}
        className="absolute top-1/2 left-[90%] transform -translate-y-1/2 w-16 h-16 rounded-full shadow-lg cursor-pointer"
        style={{
          background: "radial-gradient(circle, #4169e1, #000080)",
        }}
      ></div>

      {/* Retro Info Card */}
      {activePlanet && (
        <div className="absolute top-1/2 left-1/2 w-80 bg-black text-green-400 border-4 border-green-500 rounded-lg p-4 font-['Press_Start_2P'] text-xs transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-xl">
          <h2 className="text-lg mb-2">{planetData[activePlanet].name}</h2>
          <p className="mb-4 leading-relaxed">
            {planetData[activePlanet].info}
          </p>
          <button
            onClick={() => setActivePlanet(null)}
            className="w-full py-2 bg-green-600 text-black border-2 border-green-300 rounded hover:bg-green-500"
          >
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
}
