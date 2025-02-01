import type React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

import BattleSection from "../components/game/BattleSection";
import CharacterSection from "../components/game/CharacterSection";
import FruitSection from "../components/game/FruitSection";
import SkillsSection from "../components/game/SkillsSection";
import UpgradeSection from "../components/game/UpgradeSection";
import { useResourceStore } from "@/store/useResourceStore";

const App: React.FC = () => {
  const { berries, upgradeLevel, berriesPerSecond, addBerries } =
    useResourceStore();

  useEffect(() => {
    const interval = setInterval(() => {
      addBerries(berriesPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [berriesPerSecond, addBerries]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        One Piece Idle MMO RPG by DuBZiN
      </motion.h1>
      <div className="text-center mb-4">
        <p className="text-2xl">Berries: {berries}</p>
        <p>Nível de Upgrade: {upgradeLevel}</p>
        <p>Berries por segundo: {berriesPerSecond}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UpgradeSection />
        <BattleSection />
        <SkillsSection />
        <CharacterSection />
        <FruitSection />
      </div>
    </div>
  );
};

export default App;
