import type React from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";

const CharacterSection: React.FC = () => {
  const { characterLevel, experience, attack, defense, speed, hp, maxHp } =
    useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Seu Personagem</h2>
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-yellow-500 rounded-full mb-4 flex items-center justify-center text-6xl">
          🏴‍☠️
        </div>
        <h3 className="text-xl font-semibold">Nível {characterLevel}</h3>
        <div className="w-full bg-blue-900 rounded-full h-4 mt-2">
          <div
            className="bg-yellow-500 h-4 rounded-full"
            style={{ width: `${(experience / (characterLevel * 100)) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2">
          EXP: {experience} / {characterLevel * 100}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4 w-full">
          <div>
            <p>Ataque: {attack}</p>
            <p>Defesa: {defense}</p>
          </div>
          <div>
            <p>Velocidade: {speed}</p>
            <p>
              HP: {hp} / {maxHp}
            </p>
          </div>
        </div>
        <button className="mt-4 bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold">
          Personalizar
        </button>
      </div>
    </motion.div>
  );
};

export default CharacterSection;
