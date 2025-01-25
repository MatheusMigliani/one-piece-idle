import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  berries: number;
  upgradeLevel: number;
  characterLevel: number;
  experience: number;
  attack: number;
  defense: number;
  speed: number;
  haki: string[];
  hp: number;
  maxHp: number;
  enemyHp: number;
  enemyMaxHp: number;
  fruit: string[];
  addBerries: () => void;
  upgrade: (type: "attack" | "defense" | "speed") => void;
  gainExperience: (amount: number) => void;
  attackEnemy: () => void;
  useSpecialAbility: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      berries: 0,
      upgradeLevel: 1,
      characterLevel: 1,
      experience: 0,
      attack: 10,
      defense: 5,
      speed: 5,
      haki: 0,
      hp: 100,
      maxHp: 100,
      enemyHp: 50,
      enemyMaxHp: 50,
      fruit: [],
      addBerries: () =>
        set((state) => ({ berries: state.berries + state.upgradeLevel })),
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
    }),
    {
      name: "one-piece-idle-game",
    }
  )
);
