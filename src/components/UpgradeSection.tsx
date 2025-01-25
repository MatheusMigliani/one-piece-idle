import type React from "react"
import { motion } from "framer-motion"
import { useGameStore } from "../store/gameStore"

const UpgradeSection: React.FC = () => {
  const { berries, attack, defense, speed, haki, berriesPerSecond, upgrade } = useGameStore()

  const upgradeTypes = [
    { name: "Ataque", type: "attack", icon: "⚔️", value: attack },
    { name: "Defesa", type: "defense", icon: "🛡️", value: defense },
    { name: "Velocidade", type: "speed", icon: "💨", value: speed },
    { name: "Haki", type: "haki", icon: "✨", value: haki },
    { name: "Berries/s", type: "berriesPerSecond", icon: "💰", value: berriesPerSecond },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Melhorias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upgradeTypes.map((upgradeType) => (
          <motion.div
            key={upgradeType.type}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-700 rounded-lg p-4 flex flex-col items-center"
          >
            <span className="text-3xl mb-2">{upgradeType.icon}</span>
            <h3 className="text-lg font-semibold">{upgradeType.name}</h3>
            <p>Nível: {upgradeType.value}</p>
            <p>Custo: {upgradeType.value * 10} Berries</p>
            <button
              onClick={() => upgrade(upgradeType.type as "attack" | "defense" | "speed" | "haki" | "berriesPerSecond")}
              disabled={berries < upgradeType.value * 10}
              className="mt-2 bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold disabled:opacity-50"
            >
              Melhorar
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default UpgradeSection

