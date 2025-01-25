import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

const BattleSection: React.FC = () => {
  const { enemyHp, enemyMaxHp, attackEnemy, useSpecialAbility } =
    useGameStore();
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const handleAttack = () => {
    attackEnemy();
    setBattleLog((prev) => [...prev, "Você atacou o inimigo!"]);
  };

  const handleSpecialAbility = () => {
    useSpecialAbility();
    setBattleLog((prev) => [...prev, "Você usou uma habilidade especial!"]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Lutas</h2>
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-red-500 rounded-full mb-4 flex items-center justify-center text-6xl">
          👹
        </div>
        <h3 className="text-xl font-semibold mb-2">Inimigo</h3>
        <div className="w-full bg-red-900 rounded-full h-4">
          <div
            className="bg-red-500 h-4 rounded-full"
            style={{ width: `${(enemyHp / enemyMaxHp) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2">
          HP: {enemyHp} / {enemyMaxHp}
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAttack}
            className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold"
          >
            Atacar
          </button>
          <button
            onClick={handleSpecialAbility}
            className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold"
          >
            Habilidade Especial
          </button>
        </div>
        <div className="mt-4 w-full bg-blue-700 rounded-lg p-2 h-32 overflow-y-auto">
          <h4 className="font-semibold mb-2">Log de Batalha:</h4>
          {battleLog.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BattleSection;
