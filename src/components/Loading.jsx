function Loading() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-jiinf-secondary bg-opacity-100 z-50">
        <div className="animate-spin rounded-full h-36 w-36 border-jiinf-secondary">
          <img src="./Logo Unificada.png" alt="Logo-Unificada" className="flex h-full w-full"/>
        </div>

        <p className="text-white text-3xl font-SuperDario">Carregando...</p>
        
      </div>
    );
}

let lastInactiveTime = Date.now(); // Armazena a última atividade do usuário
const INACTIVITY_THRESHOLD = 30 * 1000; // Tempo em ms (30 segundos)

function setupInactivityReload() {
  const handlePageReload = () => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastInactiveTime;

    if (timeSinceLastActivity >= INACTIVITY_THRESHOLD) {
      window.location.reload();
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") handlePageReload();
  });

  window.addEventListener("focus", handlePageReload);

  // Atualiza o tempo da última atividade
  const resetInactiveTime = () => {
    lastInactiveTime = Date.now();
  };

  // Escuta eventos de atividade
  ["mousemove", "keydown", "click", "scroll"].forEach((event) =>
    window.addEventListener(event, resetInactiveTime)
  );

  // Função para limpar listeners se necessário
  return () => {
    document.removeEventListener("visibilitychange", handlePageReload);
    window.removeEventListener("focus", handlePageReload);
    ["mousemove", "keydown", "click", "scroll"].forEach((event) =>
      window.removeEventListener(event, resetInactiveTime)
    );
  };
}

export { Loading, setupInactivityReload }
  