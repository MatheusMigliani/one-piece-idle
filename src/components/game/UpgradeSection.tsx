import type React from "react";
import { motion } from "framer-motion";
import { useUpgradeStore } from "@/store/useUpgradeStore";
import { useResourceStore } from "@/store/useResourceStore";

const UpgradeSection: React.FC = () => {
  const { upgrades, upgrade } = useUpgradeStore();
  const { berries, spendBerries } = useResourceStore();

  const handleUpgrade = (
    type: "attack" | "defense" | "speed" | "haki" | "berriesPerSecond"
  ) => {
    const selectedUpgrade = upgrades.find((u) => u.type === type);
    if (selectedUpgrade && berries >= selectedUpgrade.cost) {
      spendBerries(selectedUpgrade.cost);
      upgrade(type);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Melhorias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upgrades.map((upgrade) => (
          <motion.div
            key={upgrade.type}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-700 rounded-lg p-4 flex flex-col items-center"
          >
            <span className="text-3xl mb-2">{upgrade.icon}</span>
            <h3 className="text-lg font-semibold">{upgrade.type}</h3>
            <p>Nível: {upgrade.level}</p>
            <p>Custo: {upgrade.cost * 10} Berries</p>
            <button
              onClick={() =>
                handleUpgrade(
                  upgrade.type as
                    | "attack"
                    | "defense"
                    | "speed"
                    | "haki"
                    | "berriesPerSecond"
                )
              }
              disabled={berries < upgrade.cost * 10}
              className="mt-2 bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold disabled:opacity-50"
            >
              Melhorar
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UpgradeSection;
