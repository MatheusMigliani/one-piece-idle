import type React from "react";
import { motion } from "framer-motion";


const SkillsSection: React.FC = () => {
  const skills = [
    {
      name: "Gomu Gomu no Pistol",
      icon: "👊",
      description: "Ataque básico de longo alcance",
      cost: 100,
    },
    {
      name: "Gear Second",
      icon: "⚡",
      description: "Aumenta velocidade e força",
      cost: 500,
    },
    {
      name: "Haki",
      icon: "🌟",
      description: "Aumenta defesa e ataque",
      cost: 1000,
    },
    {
      name: "Gear Fourth",
      icon: "🦾",
      description: "Transformação poderosa",
      cost: 5000,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-700 rounded-lg p-4 flex flex-col items-center"
          >
            <span className="text-3xl mb-2">{skill.icon}</span>
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <p className="text-sm text-center">{skill.description}</p>
            <p className="mt-2">Custo: {skill.cost} Berries</p>
            <button className="mt-2 bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold">
              Desbloquear
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsSection;
