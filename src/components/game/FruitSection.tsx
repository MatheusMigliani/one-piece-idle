/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { FruitCard } from "./FruitCard"; // Importe o componente FruitCard
import { Fruit, rarityMap } from "@/lib/types";

// Mapa de raridades

// Custos baseados na raridade
const RARITY_COSTS = {
  Comum: 10000,
  Raro: 30000,
  Épico: 60000,
  Lendaria: 75000,
  "Ultra Raro": 100000,
  Mitico: 500000,
};

export default function FruitSection() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const { berries, ownedFruit, buyFruit } = useGameStore();
  const [timer, setTimer] = useState(300);
  const { availableFruits, lastFruitUpdate, updateAvailableFruits } =
    useGameStore();

  useEffect(() => {
    const fetchFruits = (initialLoad = false) => {
      if (initialLoad && availableFruits.length > 0 && lastFruitUpdate > 0) {
        const timeDiff = Date.now() - lastFruitUpdate;
        if (timeDiff < 5 * 60 * 1000) {
          setFruits(availableFruits);
          setTimer(Math.floor((5 * 60 * 1000 - timeDiff) / 1000));
          return;
        }
      }

      fetch("https://api.api-onepiece.com/v2/fruits/en")
        .then((response) => response.json())
        .then((fruitData) => {
          const randomFruits = fruitData
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((fruit: any) => ({
              ...fruit,
              type: fruit.type || "Desconhecido", // Garante que type existe
              rarity: rarityMap[fruit.id] || "Comum",
              cost:
                RARITY_COSTS[rarityMap[fruit.id] || "Comum"] *
                ((fruit.id % 10) + 1),
              // Complete com valores padrão para todas as propriedades obrigatórias
              icon: fruit.icon || "/placeholder.svg",
              filename: fruit.filename || "/placeholder.svg",
              description: fruit.description || "Descrição não disponível",
              roman_name: fruit.roman_name || fruit.name,
            }));

          updateAvailableFruits(randomFruits);
          setFruits(randomFruits);
          setTimer(300);
        })
        .catch((error) => console.error("Error fetching fruits:", error));
    };

    fetchFruits(true);

    const fetchInterval = setInterval(() => fetchFruits(), 5 * 60 * 1000);
    const timerInterval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timerInterval);
    };
  }, [availableFruits, lastFruitUpdate, updateAvailableFruits]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Frutas</h2>
      <div className="text-sm mb-4 text-yellow-300">
        Próximas frutas em: {formatTime(timer)}
      </div>

      {ownedFruit ? (
        <div className="bg-blue-700 rounded-lg p-4 flex flex-col items-center">
          <img
            src={ownedFruit.filename || "/placeholder.svg"}
            alt={ownedFruit.name}
            className="w-36 h-42 object-cover"
          />
          <h3 className="text-lg font-semibold">{ownedFruit.name}</h3>
          <p className="text-sm text-center">{ownedFruit.description}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fruits.map((fruit) => (
            <FruitCard
              key={fruit.id}
              fruit={fruit}
              onBuy={() => buyFruit(fruit)}
              berries={berries}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
