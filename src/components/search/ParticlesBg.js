import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBg = () => {
  const particlesInit = async (main) => {
    await loadFull(main); // Ensures proper initialization
  };

  return (
    <Particles
      init={particlesInit} 
      options={{
        background: { color: "#000" },
        particles: {
          number: { value: 100 },
          move: { speed: 1 },
          size: { value: 3 },
          opacity: { value: 0.5 },
        },
      }}
    />
  );
};

export default ParticlesBg;