import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePath } from '../hooks/usePath';
import { Github, Instagram, Linkedin } from 'lucide-react';

const Header = () => {
    const { isCurrentPage } = usePath();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //Header navigation options
    const navItems = [
        { to: '/', label: 'INÍCIO' },
        { to: '/teams', label: 'EQUIPES' },
        { to: '/calendar', label: 'CALENDÁRIO' },
        { to: '/modalities', label: 'MODALIDADES' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="relative min-w-screen bg-gradient-to-b from-jiinf-primary to-jiinf-secondary shadow-md">
            {/* PARTE SUPERIOR (FIXA) */}
            <div className="h-[120px]">
                {/* Seção do Logo e Título com posicionamento relativo */}
                <section className="flex justify-center p-3 lg:justify-start items-center h-full w-full mx-auto px-4">
                    <NavLink to={"/"} className="flex h-full lg:ml-8 z-10">
                        <img 
                            src="https://oogovalzsivvyrtsnesm.supabase.co/storage/v1/object/public/imagens/Elementos/Logo.png" 
                            alt="Logo"
                            className='object-contain lg:my-2'
                        />
                    </NavLink>

                    {/* TÍTULO POSICIONADO ABSOLUTAMENTE */}
                    {/* Ele sai do fluxo normal e não interfere no alinhamento da logo */}
                    <h2 className='hidden sm:block w-full right-4 top-1/2 text-right text-white text-lg md:text-xl lg:text-2xl font-SuperDario'>
                        JOGOS INTERNOS DO INSTITUTO DE INFORMÁTICA DA UFG
                    </h2>
                </section>
            </div>

            {/* PARTE INFERIOR (NAVEGAÇÃO) - Sem alterações */}
            <div className="w-full bg-white border-t-[1px] border-black h-[36px] md:h-[32px] flex justify-center">
                <div className="w-full max-w-7xl px-4 flex justify-between md:justify-center items-center">
                    
                    {/* Botão Hambúrguer (Apenas em telas pequenas) */}
                    <div className="md:hidden items-center flex">
                        <button onClick={toggleMenu} className="text-jiinf-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                    {/* Navegação para telas grandes */}
                    <nav className="hidden md:flex w-3/4">
                        <ul className='flex flex-row w-full items-center justify-between'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <NavLink to={item.to} className={`font-bold text-base transition-all hover:text-jiinf-primary ${isCurrentPage(item.to) ? 'text-jiinf-primary' : 'text-jiinf-secondary'}`}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            
            {/* MENU DROPDOWN (POSICIONADO ABSOLUTAMENTE) - Sem alterações */}
            {isMenuOpen && (
                <div className="absolute top-full w-full md:hidden bg-jiinf-secondary shadow-lg z-50">
                    <nav className='flex flex-col items-center text-lg'>
                        <ul className='flex flex-col w-full'>
                            {navItems.map((item, index) => (
                                <li key={index} className="w-full text-center border-b-jiinf-primary border-b-[1px]">
                                    <NavLink to={item.to} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block w-full py-2 font-bold text-base transition-all hover:text-jiinf-primary ${isCurrentPage(item.to) ? 'text-jiinf-primary' : 'text-white'}`}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}

const Footer = () => {
    return (
        <footer className=" bg-gradient-to-br from-black to-gray-800 text-white py-4 mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <div className='flex flex-row gap-2 items-center justify-center lg:justify-start'>
                    <p className="text-sm md:text-lg font-semibold">Unificada</p>
                    <a 
                    href="https://www.instagram.com/unificadaufg/"
                    target="_blank"
                    rel="noopener noreferrer">
                        <Instagram className='text-white w-4 md:h-5 md:w-5 hover:text-jiinf-secondary cursor-pointer'/>
                    </a>
                </div>
                <p className="text-xs md:text-sm mt-2">© 2024 Unificada. All rights reserved.</p>              
              </div>

              <div className='flex h-full flex-col items-center justify-center'>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-row gap-1 items-center justify-center lg:justify-end'>
                    <p className="text-xs md:text-sm">Developed by</p>
                    
                    <a 
                    href="https://github.com/manotv-alt" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex flex-row items-center gap-2 hover:text-jiinf-secondary'>
                        <p className='text-xs md:text-sm cursor-pointer'>manotv-alt</p>
                        <Github className='w-4 md:h-5 md:w-5 cursor-pointer'/>
                    </a>

                    <a 
                    href="https://www.linkedin.com/in/emmanuel-fernandes-a04646289/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <Linkedin className='text-white w-4 md:h-5 md:w-5 hover:text-jiinf-secondary cursor-pointer'/>
                    </a>

                </div>

                <div className='flex flex-row gap-1 items-center justify-center lg:justify-end'>
                    <p className="text-xs md:text-sm">and</p>
                    
                    <a 
                    href="https://github.com/LuisFcarmo" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex flex-row items-center gap-2 hover:text-jiinf-secondary'>
                        <p className='text-xs md:text-sm cursor-pointer'>LuisFcarmo</p>
                        <Github className='w-4 md:h-5 md:w-5 cursor-pointer'/>
                    </a>

                    <a 
                    href="https://www.linkedin.com/in/luis-cesar-ferreira-do-carmo/"
                    target="_blank"
                    rel="noopener noreferrer">
                        <Linkedin className='text-white w-4 md:h-5 md:w-5 hover:text-jiinf-secondary cursor-pointer'/>
                    </a>

                </div>
              </div>
              
              </div>
              
            </div>
          </div>
        </footer>
    );
};

export { Footer, Header };
