import React, { useState, useEffect } from "react"

function Loading() {
  const [loadingText, setLoadingText] = useState("NÓS BEBEMOS CACHAÇA")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const texts = ["NÓS BEBEMOS CACHAÇA", "E NÃO TEMOS RESSACA", "ISSO AQUI NÃO É ***", "ISSO É UNIFICADAAA!!!"]

    let textIndex = 0
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length
      setLoadingText(texts[textIndex])
    }, 2200)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + Math.random() * 3
      })
    }, 150)

    return () => {
      clearInterval(textInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="absolute inset-0 min-h-screen min-w-full z-20 bg-blue-800 flex items-center justify-center p-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated Monster Image */}
        <div className="mb-8 relative">
          <div className="monster-container">
            <img
              src="/mascote_unificada.png"
              alt="Three-headed monster"
              className="monster-image w-80 h-80 object-contain mx-auto"
            />

            {/* Orange Fire Particles */}
            <div className="fire-particle fire-1"></div>
            <div className="fire-particle fire-2"></div>
            <div className="fire-particle fire-3"></div>
            <div className="fire-particle fire-4"></div>
            <div className="fire-particle fire-5"></div>
            <div className="fire-particle fire-6"></div>
            <div className="fire-particle fire-7"></div>
            <div className="fire-particle fire-8"></div>
            <div className="fire-particle fire-9"></div>
            <div className="fire-particle fire-10"></div>

            {/* Large Fire Bursts */}
            <div className="fire-burst burst-1"></div>
            <div className="fire-burst burst-2"></div>
            <div className="fire-burst burst-3"></div>

            {/* Energy particles around monster */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div
              className="absolute top-20 right-16 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-80"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-80"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-16 right-12 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-80"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute top-1/2 left-8 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-80"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/3 right-8 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-80"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white tracking-wider">
            {loadingText}
          </h2>

          {/* Progress Bar */}
          <div className="w-96 mx-auto">
            <div className="flex justify-between text-sm text-gray-300 mb-3">
              <span className="font-semibold">PODER DO CERBERUS</span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border-2 border-gray-500 shadow-lg">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-purple-500 to-yellow-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .monster-container {
          position: relative;
          animation: monster-float 4s ease-in-out infinite;
        }

        .monster-image {
          animation: 
            monster-breathe 3s ease-in-out infinite,
            monster-glow 2s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.5));
          transform-origin: center center;
        }

        /* Fire Particles */
        .fire-particle {
          position: absolute;
          width: 4px;
          height: 8px;
          background: linear-gradient(to top, #ff4500, #ff8c00, #ffd700);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          opacity: 0.8;
          animation: fire-rise 3s ease-out infinite;
        }

        .fire-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .fire-2 {
          top: 30%;
          right: 20%;
          animation-delay: 0.5s;
        }

        .fire-3 {
          bottom: 25%;
          left: 25%;
          animation-delay: 1s;
        }

        .fire-4 {
          bottom: 35%;
          right: 15%;
          animation-delay: 1.5s;
        }

        .fire-5 {
          top: 50%;
          left: 10%;
          animation-delay: 2s;
        }

        .fire-6 {
          top: 40%;
          right: 10%;
          animation-delay: 2.5s;
        }

        .fire-7 {
          top: 60%;
          left: 20%;
          animation-delay: 0.8s;
        }

        .fire-8 {
          top: 70%;
          right: 25%;
          animation-delay: 1.3s;
        }

        .fire-9 {
          top: 25%;
          left: 50%;
          animation-delay: 1.8s;
        }

        .fire-10 {
          bottom: 40%;
          right: 50%;
          animation-delay: 2.3s;
        }

        /* Large Fire Bursts */
        .fire-burst {
          position: absolute;
          width: 12px;
          height: 20px;
          background: radial-gradient(ellipse at bottom, #ff4500, #ff6347, #ffa500, transparent);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          opacity: 0.6;
          animation: fire-burst 4s ease-out infinite;
        }

        .burst-1 {
          top: 15%;
          left: 30%;
          animation-delay: 0s;
        }

        .burst-2 {
          bottom: 20%;
          right: 30%;
          animation-delay: 1.5s;
        }

        .burst-3 {
          top: 45%;
          right: 5%;
          animation-delay: 3s;
        }

        @keyframes fire-rise {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-60px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes fire-burst {
          0% {
            transform: translateY(0px) scale(0.5);
            opacity: 0;
          }
          20% {
            transform: translateY(-10px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) scale(1.5);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-80px) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes monster-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(-1deg);
          }
        }

        @keyframes monster-breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes monster-glow {
          0% {
            filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.5)) brightness(1);
          }
          100% {
            filter: drop-shadow(0 0 30px rgba(234, 88, 12, 0.7)) brightness(1.1);
          }
        }

        /* Hover effect for extra interactivity */
        .monster-container:hover .monster-image {
          animation-duration: 1.5s, 1s;
          transform: scale(1.1);
        }

        /* Intensify fire on hover */
        .monster-container:hover .fire-particle {
          animation-duration: 1.5s;
        }

        .monster-container:hover .fire-burst {
          animation-duration: 2s;
        }
      `}</style>
    </div>
  )
}

let lastInactiveTime = Date.now(); // Armazena a última atividade do usuário
const INACTIVITY_THRESHOLD = 60 * 1000;

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
