import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Fruit {
  id: number;
  name: string;
  icon: string;
  filename: string;
  description: string;
  cost: number;
}

export default function FruitSection() {
  const [fruit, setFruit] = useState<Fruit[]>([]);

  useEffect(() => {
    fetch("https://api.api-onepiece.com/v2/fruits/en")
      .then((response) => response.json())
      .then((fruitData) => {
        setFruit(fruitData.slice(1, 5));
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fruit.map((fruit) => (
          <motion.div
            key={fruit.id}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-700 rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={fruit.filename}
              alt={fruit.name}
              className="w-36 h-42"
            />
            <h3 className="text-lg font-semibold">{fruit.name}</h3>
            <p className="text-sm text-center">{fruit.description}</p>
            <p className="mt-2">Custo: {fruit.cost} Berries</p>
            <button className="mt-2 bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold">
              Desbloquear
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
