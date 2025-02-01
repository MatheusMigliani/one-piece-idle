import { create } from "zustand";
import { useResourceStore } from "./useResourceStore";

interface Upgrade {
  type: "attack" | "defense" | "speed" | "haki" | "berriesPerSecond";
  level: number;
  cost: number;
  icon?: string;
}

interface UpgradeState {
  upgrades: Upgrade[];
  upgrade: (type: Upgrade["type"]) => void;
}

export const useUpgradeStore = create<UpgradeState>((set) => ({
  upgrades: [
    { type: "attack", level: 1, cost: 100, icon: "⚔️" },
    { type: "defense", level: 1, cost: 50, icon: "🛡️" },
    { type: "speed", level: 1, cost: 50, icon: "🏃" },
    { type: "haki", level: 1, cost: 3000, icon: "🔮" },
    { type: "berriesPerSecond", level: 1, cost: 10, icon: "💰" },
  ],

  upgrade: (type) =>
    set((state) => {
      const upgrade = state.upgrades.find((u) => u.type === type);
      if (upgrade) {
        const newLevel = upgrade.level + 1;
        const newCost = upgrade.cost * 2; // Custo dobra a cada nível

        // Atualiza o estado de recursos se for um upgrade de berriesPerSecond
        if (type === "berriesPerSecond") {
          const currentBPS = useResourceStore.getState().berriesPerSecond;
          useResourceStore.getState().increaseBerriesPerSecond(currentBPS); // Dobra o BPS
        }

        return {
          upgrades: state.upgrades.map((u) =>
            u.type === type ? { ...u, level: newLevel, cost: newCost } : u
          ),
        };
      }
      return state;
    }),
}));
