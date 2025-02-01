import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BattleState {
  enemyHp: number;
  enemyMaxHp: number;
  isBattleActive: boolean;
  battleLog: string[];
  energy: number;

  // Métodos
  startBattle: () => void;
  endBattle: () => void;
  spendEnergy: (amount: number) => void;
  regenerateEnergy: () => void;
  attackEnemy: (damage: number) => void;
  useSpecialAbility: (ability: string) => void;
  addToBattleLog: (message: string) => void;
}

export const useBattleStore = create<BattleState>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, _get) => ({
      enemyHp: 50,
      enemyMaxHp: 50,
      isBattleActive: false,
      battleLog: [],
      energy: 100,

      // Inicia uma batalha
      startBattle: () =>
        set({ isBattleActive: true, enemyHp: 50, energy: 100 }),

      // Finaliza uma batalha
      endBattle: () => set({ isBattleActive: false }),

      // Gasta energia
      spendEnergy: (amount) =>
        set((state) => ({ energy: Math.max(0, state.energy - amount) })),

      // Regenera energia ao longo do tempo
      regenerateEnergy: () =>
        set((state) => ({ energy: Math.min(100, state.energy + 10) })),

      // Ataque ao inimigo
      attackEnemy: (damage) =>
        set((state) => {
          const newEnemyHp = Math.max(0, state.enemyHp - damage);
          const isEnemyDefeated = newEnemyHp === 0;

          return {
            enemyHp: newEnemyHp,
            battleLog: [
              ...state.battleLog,
              `Você causou ${damage} de dano!`,
              isEnemyDefeated ? "Inimigo derrotado!" : "",
            ],
          };
        }),

      // Usa uma habilidade especial
      useSpecialAbility: (ability) =>
        set((state) => ({
          battleLog: [
            ...state.battleLog,
            `Habilidade especial usada: ${ability}`,
          ],
        })),

      // Adiciona uma mensagem ao log de batalha
      addToBattleLog: (message) =>
        set((state) => ({ battleLog: [...state.battleLog, message] })),
    }),
    {
      name: "battle-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
