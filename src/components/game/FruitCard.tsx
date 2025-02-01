import { motion } from "framer-motion";
import { useCollapse } from "react-collapsed";
import { Fruit } from "lib/types";
import { useState } from "react";

interface FruitCardProps {
  fruit: Fruit;
  onBuy: () => void;
  berries: number;
  // Remova a linha: type: string;
}

export function FruitCard({ fruit, onBuy, berries }: FruitCardProps) {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-blue-700 rounded-lg p-4 flex flex-col items-center"
    >
      <img
        src={fruit.filename || "/placeholder.svg"}
        alt={fruit.name}
        className="w-36 h-42 object-cover"
      />
      <h3 className="text-lg font-semibold">{fruit.roman_name}</h3>
      <h4 className="text-sm font-semibold">{fruit.name}</h4>
      <p className="text-sm text-center">{fruit.type}</p>

      <div className="text-sm text-center">
        <section {...getCollapseProps()}>{fruit.description}</section>
        <button
          className="mt-2 bg-yellow-500 text-blue-900 px-2 py-1 rounded-full font-bold disabled:opacity-50"
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          {isExpanded ? "Esconder detalhes" : "Ver detalhes"}
        </button>
      </div>

      <p className="mt-2">Raridade: {fruit.rarity}</p>
      <button
        className="mt-2 bg-yellow-500 text-blue-900 px-6 py-2 rounded-full font-bold disabled:opacity-50"
        onClick={onBuy}
        disabled={berries < fruit.cost}
      >
        Comprar ({fruit.cost} Berries)
      </button>
    </motion.div>
  );
}
