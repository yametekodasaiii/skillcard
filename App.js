import React from 'react';
import SkillCard from './components/SkillCard';

const App = () => {
  const userData = {
    name: "Juls Adriatico",
    section: "10 - Maragondon",
    photo: "/me.png",
    skills: {
      coding: 5,
      robotDesigning: 2.5,
      innovation: 4.5,
      collaboration: 3,
      creativity: 4
    },
    awards: [
      { type: "gold", count: 1 },
      { type: "silver", count: 1 },
      { type: "diamond", count: 1 }
    ],
    robotBuilds: [
      "RFID SYSTEM",
      "MEMORY GAME"
    ],
    contributions: [
      "SOCMED WRITER",
      "PROGRAMMER",
    ],
    quote: "maaasahan ako sa coding, basta wag nyo ako ilagay sa circuitry."
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SkillCard userData={userData} />
    </div>
  );
};

export default App; 