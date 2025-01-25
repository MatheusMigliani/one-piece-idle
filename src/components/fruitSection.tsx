/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { useCollapse } from "react-collapsed";
interface Fruit {
  id: number;
  name: string;
  icon: string;
  filename: string;
  description: string;
  cost: 10000 | 30000 | 60000 | 75000 | 100000 | 500000 | 1000000;
  rarity: "Comum" | "Raro" | "Épico" | "Lendaria" | "Ultra Raro" | "Mitico";
  type: string;
  roman_name: string;
}

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

  useEffect(() => {
    const fetchFruits = () => {
      fetch("https://api.api-onepiece.com/v2/fruits/en")
        .then((response) => response.json())
        .then((fruitData) => {
          // Seleciona 4 frutas aleatórias
          const randomFruits = fruitData
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((fruit: any) => ({
              ...fruit,
              rarity: rarityMap[fruit.id] || "Comum",
              cost:
                RARITY_COSTS[rarityMap[fruit.id] || "Comum"] *
                ((fruit.id % 10) + 1), // Multiplicador único por ID
            }));

          setFruits(randomFruits);
          console.log(randomFruits);
        })
        .catch((error) => console.error("Error fetching fruits:", error));
    };

    // Busca inicial
    fetchFruits();

    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchFruits, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Mapa completo de raridades (exemplo parcial)
  const rarityMap: { [key: number]: Fruit["rarity"] } = {
    1: "Mitico", // Gomu Gomu no Mi
    2: "Lendaria", // Bara Bara no Mi
    3: "Raro", // Hana Hana no Mi
    4: "Épico", // Mera Mera no Mi
    5: "Ultra Raro", // Goro Goro no Mi
    // ... adicione todas as 205 entradas aqui ...
    205: "Comum", // Exemplo para última fruta
  };

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

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
              <h3 className="text-lg font-semibold">{fruit.roman_name}</h3>
              <h4 className="text-sm font-semibold">{fruit.name}</h4>
              <p className="text-sm text-center">{fruit.type}</p>

              <p className="text-sm text-center">
                <div>
                  <section {...getCollapseProps()}>{fruit.description}</section>
                  <button
                    className="mt-2 bg-yellow-500 text-blue-900 px-2 py-2 rounded-full font-bold disabled:opacity-50"
                    {...getToggleProps({
                      onClick: () =>
                        setExpanded((prevExpanded) => !prevExpanded),
                    })}
                  >
                    {isExpanded ? "Esconder detalhes" : "Ver detalhes"}
                  </button>
                </div>
              </p>
              <p className="mt-2">Raridade: {fruit.rarity}</p>
              <button
                className="mt-2 bg-yellow-500 text-blue-900 px-6 py-3 rounded-full font-bold disabled:opacity-50"
                onClick={() => buyFruit(fruit)}
                disabled={berries < fruit.cost}
              >
                Comprar ({(fruit as any).cost} Berries)
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
