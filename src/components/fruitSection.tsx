import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

interface Fruit {
  id: number;
  name: string;
  icon: string;
  filename: string;
  description: string;
  cost: number;
  rarity: string;
  type: string;
}

export default function FruitSection() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const { berries, ownedFruit, buyFruit } = useGameStore();

  useEffect(() => {
    fetch("https://api.api-onepiece.com/v2/fruits/en")
      .then((response) => response.json())
      .then((fruitData) => {
        setFruits(fruitData.slice(1, 5));
        console.log(fruitData);
      })
      .catch((error) => console.error("Error fetching fruits:", error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Frutas</h2>
      {ownedFruit ? (
        <div className="bg-blue-700 rounded-lg p-4 flex flex-col items-center">
          <img
            src={ownedFruit.filename || "/placeholder.svg"}
            alt={ownedFruit.name}
            className="w-36 h-42"
          />
          <h3 className="text-lg font-semibold">{ownedFruit.name}</h3>
          <p className="text-sm text-center">{ownedFruit.description}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fruits.map((fruit) => (
            <motion.div
              key={fruit.id}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-700 rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={fruit.filename || "/placeholder.svg"}
                alt={fruit.name}
                className="w-36 h-42"
              />
              <h3 className="text-lg font-semibold">{fruit.name}</h3>
              <p className="text-sm text-center">{fruit.type}</p>
              <p className="text-sm text-center">{fruit.description}</p>
              <p className="mt-2">Raridade: {fruit.rarity}</p>
              <p className="mt-2">Custo: {fruit.cost} Berries</p>
              <button
                className="mt-2 bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold disabled:opacity-50"
                onClick={() => buyFruit(fruit)}
                disabled={berries < fruit.cost}
              >
                Comprar
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
