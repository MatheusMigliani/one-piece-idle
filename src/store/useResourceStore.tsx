import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ResourceState {
  berries: number;
  berriesPerSecond: number;
  upgradeLevel: number;

  // Métodos
  addBerries: (amount: number) => void;
  spendBerries: (amount: number) => void;
  increaseBerriesPerSecond: (amount: number) => void;
  incrementUpgradeLevel: () => void;
}

export const useResourceStore = create<ResourceState>()(
  persist(
    (set) => ({
      berries: 0,
      berriesPerSecond: 1,
      upgradeLevel: 1,
      addBerries: (amount) =>
        set((state) => ({ berries: state.berries + amount })),
      spendBerries: (amount) =>
        set((state) => {
          if (state.berries >= amount) {
            return { berries: state.berries - amount };
          }
          return state;
        }),
      increaseBerriesPerSecond: (amount) =>
        set((state) => ({ berriesPerSecond: state.berriesPerSecond + amount })),
      incrementUpgradeLevel: () =>
        set((state) => ({ upgradeLevel: state.upgradeLevel + 1 })),
    }),
    {
      name: "resource-storage",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
