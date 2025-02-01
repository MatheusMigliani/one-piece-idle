import { useEffect } from "react";
import { motion } from "framer-motion";
import { useBattleStore } from "@/store/useBattleStore";
import { useResourceStore } from "@/store/useResourceStore";

const BattleSection: React.FC = () => {
  const {
    enemyHp,
    enemyMaxHp,
    isBattleActive,
    battleLog,
    startBattle,
    attackEnemy,
    useSpecialAbility,
    energy,
    spendEnergy,
    regenerateEnergy,
  } = useBattleStore();
  const { berries, spendBerries } = useResourceStore();

  // Regenera energia a cada 5 segundos
  useEffect(() => {
    if (isBattleActive) {
      const interval = setInterval(() => {
        regenerateEnergy();
      }, 5000); // 5 segundos
      return () => clearInterval(interval);
    }
  }, [isBattleActive, regenerateEnergy]);

  const handleAttack = () => {
    if (energy >= 10) {
      attackEnemy(10); // Exemplo: 10 de dano por ataque
      spendEnergy(10); // Gasta 10 de energia por ataque
    }
  };

  const handleSpecialAbility = () => {
    if (berries >= 100 && energy >= 30) {
      spendBerries(100);
      spendEnergy(30); // Gasta 30 de energia por habilidade
      useSpecialAbility("Gomu Gomu no Pistol");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Lutas</h2>
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-red-500 rounded-full mb-4 flex items-center justify-center text-6xl">
          👹
        </div>
        <h3 className="text-xl font-semibold mb-2">Inimigo</h3>
        <div className="w-full bg-red-900 rounded-full h-4">
          <div
            className="bg-red-500 h-4 rounded-full"
            style={{ width: `${(enemyHp / enemyMaxHp) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2">
          HP: {enemyHp} / {enemyMaxHp}
        </p>
        <p className="mt-2">Energia: {energy} / 100</p>

        <div className="flex gap-4 mt-4">
          {!isBattleActive ? (
            <button
              onClick={startBattle}
              className="bg-green-500 text-blue-900 px-4 py-2 rounded-full font-bold"
            >
              Iniciar Batalha
            </button>
          ) : (
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleAttack}
                disabled={energy < 10}
                className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold disabled:opacity-50"
              >
                Atacar
              </button>
              <button
                onClick={handleSpecialAbility}
                disabled={energy < 30 || berries < 100}
                className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-full font-bold disabled:opacity-50"
              >
                Habilidade Especial
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 w-full bg-blue-700 rounded-lg p-2 h-32 overflow-y-auto">
          <h4 className="font-semibold mb-2">Log de Batalha:</h4>
          {battleLog.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BattleSection;
