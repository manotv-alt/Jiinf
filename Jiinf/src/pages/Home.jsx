import { ModalityCard } from "../components/ModalityCard";


export function Home() {

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen min-w-screen rounded-lg bg-white mx-12 mt-12">
  <img 
    src="https://th.bing.com/th/id/R.93b95738cb630f899bacf7dd835b5ad5?rik=tTYET5ChbtekCw&riu=http%3a%2f%2fyesofcorsa.com%2fwp-content%2fuploads%2f2016%2f11%2f4K-Wallpapers-7.jpg&ehk=T6iESUSfpf9rlqxhPxnOLZKKmedMu0oOGAuICEPY%2fbo%3d&risl=&pid=ImgRaw&r=0" 
    alt="bg-home"
    className="flex min-h-screen min-w-screen rounded-lg"
  />

  {/* Div sobreposta */}
  <div className="absolute right-0 top-0 w-2/5 h-full bg-black bg-opacity-50 p-8 rounded-r-lg">
    <h2 className="text-white text-2xl font-bold">Conteúdo Sobreposto</h2>
    <p className="text-white mt-4">Este conteúdo está sobreposto à imagem de fundo, ocupando 1/3 da largura da tela.</p>
  </div>
</div>

    )
}