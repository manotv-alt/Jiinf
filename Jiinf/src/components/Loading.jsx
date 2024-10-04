export function Loading() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-jiinf-secondary bg-opacity-100 z-50">
        <div className="animate-spin rounded-full h-36 w-36 border-jiinf-secondary">
          <img src="./Logo Unificada.png" alt="Logo-Unificada" className="flex h-full w-full"/>
        </div>

        <p className="text-white text-3xl font-SuperDario">Carregando...</p>
        
      </div>
    );
  }
  