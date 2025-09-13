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

interface PlanetStats {
  name: string;
  diameter: string;
  mass: string;
  gravity: string;
  moons: string;
  atmosphere: string;
  orbitalPeriod: string;
  funFact: string;
  color: string;
  size: number;
  left: string;
}

const planets: Record<PlanetKey, PlanetStats> = {
  sun: {
    name: "Sun",
    diameter: "1,391,000 km",
    mass: "1.989 × 10^30 kg",
    gravity: "274 m/s²",
    moons: "0",
    atmosphere: "Hydrogen, Helium",
    orbitalPeriod: "-",
    funFact: "Its gravity keeps all planets in orbit.",
    color: "radial-gradient(circle at center, #FFD700, #FF8C00)",
    size: 980,
    left: "-60%",
  },
  mercury: {
    name: "Mercury",
    diameter: "4,879 km",
    mass: "3.30 × 10^23 kg",
    gravity: "3.7 m/s²",
    moons: "0",
    atmosphere: "Trace gases",
    orbitalPeriod: "88 days",
    funFact: "Has almost no atmosphere to trap heat.",
    color: "repeating-radial-gradient(circle, #bbb 0px, #999 3px, #bbb 6px)",
    size: 20,
    left: "20%",
  },
  venus: {
    name: "Venus",
    diameter: "12,104 km",
    mass: "4.87 × 10^24 kg",
    gravity: "8.87 m/s²",
    moons: "0",
    atmosphere: "CO₂, N₂, clouds of sulfuric acid",
    orbitalPeriod: "225 days",
    funFact: "A day on Venus is longer than a year on Venus!",
    color: "radial-gradient(circle, #e6c68e, #d4a15a, #a37c27)",
    size: 30,
    left: "25%",
  },
  earth: {
    name: "Earth",
    diameter: "12,742 km",
    mass: "5.97 × 10^24 kg",
    gravity: "9.81 m/s²",
    moons: "1",
    atmosphere: "N₂, O₂",
    orbitalPeriod: "365 days",
    funFact: "Only known planet with life.",
    color:
      "radial-gradient(circle, #2b6cb0, #1a365d), repeating-linear-gradient(45deg, #228b22 0 5px, transparent 5px 10px)",
    size: 35,
    left: "32%",
  },
  mars: {
    name: "Mars",
    diameter: "6,779 km",
    mass: "6.42 × 10^23 kg",
    gravity: "3.71 m/s²",
    moons: "2 (Phobos & Deimos)",
    atmosphere: "CO₂, N₂, Ar",
    orbitalPeriod: "687 days",
    funFact: "Home to the largest volcano in the solar system.",
    color: "radial-gradient(circle, #ff6347, #b22222)",
    size: 25,
    left: "38%",
  },
  jupiter: {
    name: "Jupiter",
    diameter: "139,820 km",
    mass: "1.90 × 10^27 kg",
    gravity: "24.79 m/s²",
    moons: "79+",
    atmosphere: "H₂, He",
    orbitalPeriod: "12 years",
    funFact: "Great Red Spot is a giant storm.",
    color:
      "repeating-linear-gradient(90deg, #f4a460 0px, #f4a460 10px, #d2691e 10px, #d2691e 20px, #deb887 20px, #deb887 30px)",
    size: 100,
    left: "50%",
  },
  saturn: {
    name: "Saturn",
    diameter: "116,460 km",
    mass: "5.68 × 10^26 kg",
    gravity: "10.44 m/s²",
    moons: "83+",
    atmosphere: "H₂, He",
    orbitalPeriod: "29 years",
    funFact: "Least dense planet; could float in water!",
    color:
      "repeating-linear-gradient(90deg, #e3c16f 0px, #e3c16f 8px, #d2b48c 8px, #d2b48c 16px)",
    size: 80,
    left: "65%",
  },
  uranus: {
    name: "Uranus",
    diameter: "50,724 km",
    mass: "8.68 × 10^25 kg",
    gravity: "8.69 m/s²",
    moons: "27",
    atmosphere: "H₂, He, CH₄",
    orbitalPeriod: "84 years",
    funFact: "Rotates on its side.",
    color: "radial-gradient(circle, #7fffd4, #40e0d0, #20b2aa)",
    size: 60,
    left: "78%",
  },
  neptune: {
    name: "Neptune",
    diameter: "49,244 km",
    mass: "1.02 × 10^26 kg",
    gravity: "11.15 m/s²",
    moons: "14",
    atmosphere: "H₂, He, CH₄",
    orbitalPeriod: "165 years",
    funFact: "Strongest winds in the solar system.",
    color: "radial-gradient(circle, #4169e1, #000080)",
    size: 60,
    left: "90%",
  },
};

export default function Planets() {
  const [activePlanet, setActivePlanet] = useState<PlanetKey | null>(null);
  const [cardPosition, setCardPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handlePlanetClick = (
    planet: PlanetKey,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const cardWidth = 256;

    // X position (auto-adjust if offscreen)
    let x = rect.right + 10;
    if (x + cardWidth > window.innerWidth) {
      x = rect.left - cardWidth - 10;
    }

    // Y offset mapping (adjust per planet if needed)
    const yOffsetMap: Record<PlanetKey, number> = {
      sun: 480, // move 50px lower
      mercury: 0,
      venus: 0,
      earth: 0,
      mars: 0,
      jupiter: 0,
      saturn: 0,
      uranus: 0,
      neptune: 0,
    };

    const y = rect.top + (yOffsetMap[planet] || 0);

    setCardPosition({ x, y });
    setActivePlanet(planet);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {Object.keys(planets).map((planet) => {
        const p = planets[planet as PlanetKey];
        return (
          <div
            key={planet}
            onClick={(e) => handlePlanetClick(planet as PlanetKey, e)}
            className="absolute top-1/2 transform -translate-y-1/2 rounded-full shadow-lg cursor-pointer"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              background: p.color,
            }}
          ></div>
        );
      })}

      {activePlanet && (
        <div
          className="absolute bg-gradient-to-br from-[#0a0f2c] via-[#101840] to-[#1a2453] 
             text-blue-200 border-2 border-blue-500/70 rounded-lg p-3 
             font-['Press_Start_2P'] text-xs shadow-2xl shadow-blue-900/50 w-64 z-50"
          style={{ top: cardPosition.y, left: cardPosition.x }}
        >
          <h2 className="text-lg mb-2 text-blue-300 tracking-wide">
            {planets[activePlanet].name}
          </h2>

          <ul className="leading-snug space-y-1">
            <li>
              <strong className="text-blue-400">Diameter:</strong>{" "}
              {planets[activePlanet].diameter}
            </li>
            <li>
              <strong className="text-blue-400">Mass:</strong>{" "}
              {planets[activePlanet].mass}
            </li>
            <li>
              <strong className="text-blue-400">Gravity:</strong>{" "}
              {planets[activePlanet].gravity}
            </li>
            <li>
              <strong className="text-blue-400">Moons:</strong>{" "}
              {planets[activePlanet].moons}
            </li>
            <li>
              <strong className="text-blue-400">Atmosphere:</strong>{" "}
              {planets[activePlanet].atmosphere}
            </li>
            <li>
              <strong className="text-blue-400">Orbital Period:</strong>{" "}
              {planets[activePlanet].orbitalPeriod}
            </li>
          </ul>

          <p className="italic mt-2 text-blue-300">
            ✦ Fun Fact: {planets[activePlanet].funFact}
          </p>

          <button
            onClick={() => setActivePlanet(null)}
            className="mt-3 w-full py-2 bg-blue-700 text-blue-100 border-2 border-blue-400 rounded hover:bg-blue-600 hover:border-blue-300 transition"
          >
            CLOSE ✦
          </button>
        </div>
      )}
    </div>
  );
}
