import { LeaderboardSimulator } from "../components/LeaderBoard";
import { Loading } from "../components/Loading";
import useApi from "../hooks/useApi";

export function Simulator() {
  return (
    <main className="flex min-h-screen bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="flex min-h-full min-w-full items-center justify-center">
        <div className="mx-16 mb-16 w-full max-w-7xl">
            <h1 className="mb-12 mt-8 md:mt-0 md:mb-24 text-center text-3xl font-bold text-white md:text-4xl">
            Simulador de Tabela do Inter
            </h1>
            <LeaderboardSimulator />
        </div>
      </div>
        <h2 className="fixed bottom-0 right-0 mb-4 mr-4 text-white">V-0.1</h2>
    </main>
  )
}
