import type React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import UpgradeSection from "@/components/UpgradeSection";
import SkillsSection from "@/components/SkillsSection";
import CharacterSection from "@/components/CharacterSection";
import BattleSection from "@/components/BattleSection";
import FruitSection from "@/components/fruitSection";

const App: React.FC = () => {
  const { berries, upgradeLevel, berriesPerSecond, addBerries } =
    useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      addBerries();
    }, 1000);

    return () => clearInterval(interval);
  }, [addBerries]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        One Piece Idle MMO RPG
      </motion.h1>
      <div className="text-center mb-4">
        <p className="text-2xl">Berries: {berries}</p>
        <p>Nível de Upgrade: {upgradeLevel}</p>
        <p>Berries por segundo: {berriesPerSecond}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UpgradeSection />
        <SkillsSection />
        <CharacterSection />
        <BattleSection />
        <FruitSection />
      </div>
    </div>
  );
};

export default App;
