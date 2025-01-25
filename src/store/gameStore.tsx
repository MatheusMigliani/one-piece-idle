import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Fruit } from "@/lib/types";

interface GameState {
  berries: number;
  upgradeLevel: number;
  characterLevel: number;
  experience: number;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  maxHp: number;
  enemyHp: number;
  enemyMaxHp: number;
  haki: number;
  berriesPerSecond: number;
  ownedFruit: Fruit | null;
  availableFruits: Fruit[];
  lastFruitUpdate: number; // Timestamp da última atualização das frutas

  // Métodos
  addBerries: () => void;
  upgrade: (
    type: "attack" | "defense" | "speed" | "haki" | "berriesPerSecond"
  ) => void;
  gainExperience: (amount: number) => void;
  attackEnemy: () => void;
  useSpecialAbility: () => void;
  buyFruit: (fruit: Fruit) => void;
  updateAvailableFruits: (fruits: Fruit[]) => void; // Método corrigido
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      berries: 0,
      upgradeLevel: 1,
      characterLevel: 1,
      experience: 1,
      attack: 10,
      defense: 5,
      speed: 5,
      hp: 100,
      maxHp: 100,
      enemyHp: 50,
      enemyMaxHp: 50,
      haki: 1,
      berriesPerSecond: 1,
      ownedFruit: null,
      availableFruits: [],
      lastFruitUpdate: 0,

      // Métodos
      addBerries: () =>
        set((state) => ({ berries: state.berries + state.berriesPerSecond })),
      upgrade: (type) =>
        set((state) => {
          const cost = state[type] * 10;
          if (state.berries >= cost) {
            return {
              berries: state.berries - cost,
              [type]: state[type] + 1,
            };
          }
          return state;
        }),
      gainExperience: (amount) =>
        set((state) => {
          const newExperience = state.experience + amount;
          if (newExperience >= state.characterLevel * 100) {
            return {
              experience: newExperience - state.characterLevel * 100,
              characterLevel: state.characterLevel + 1,
            };
          }
          return { experience: newExperience };
        }),
      attackEnemy: () =>
        set((state) => {
          const damage = state.attack - state.enemyMaxHp * 0.05;
          const newEnemyHp = Math.max(0, state.enemyHp - damage);
          if (newEnemyHp === 0) {
            return {
              enemyHp: state.enemyMaxHp,
              berries: state.berries + state.enemyMaxHp,
            };
          }
          return { enemyHp: newEnemyHp };
        }),
      useSpecialAbility: () =>
        set((state) => {
          const damage = state.attack * 2 - state.enemyMaxHp * 0.1;
          const newEnemyHp = Math.max(0, state.enemyHp - damage);
          if (newEnemyHp === 0) {
            return {
              enemyHp: state.enemyMaxHp,
              berries: state.berries + state.enemyMaxHp * 2,
            };
          }
          return { enemyHp: newEnemyHp };
        }),
      buyFruit: (fruit) => {
        set((state) => {
          const cost = fruit.cost;

          if (state.berries >= cost && !state.ownedFruit) {
            // Remove a fruta comprada da lista de frutas disponíveis
            const updatedAvailableFruits = state.availableFruits.filter(
              (f) => f.id !== fruit.id
            );

            console.log("Fruta comprada:", fruit); // Log da fruta comprada
            console.log("Estado antes da compra:", get()); // Log do estado antes da compra

            return {
              berries: state.berries - cost,
              ownedFruit: fruit, // Atualiza a fruta comprada
              availableFruits: updatedAvailableFruits, // Atualiza a lista de frutas disponíveis
            };
          }
          return state;
        });
      },
      updateAvailableFruits: (fruits: Fruit[]) => {
        set({
          availableFruits: fruits,
          lastFruitUpdate: Date.now(),
        });
      },
    }),
    {
      name: "one-piece-idle-game", // Nome do localStorage
      onRehydrateStorage: (state) => {
        console.log("Estado restaurado:", state); // Log do estado restaurado
      },
    }
  )
);
