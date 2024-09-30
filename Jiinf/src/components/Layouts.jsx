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
        <header className={`flex flex-col min-w-screen justify-end items-center ${isMenuOpen ? 'h-[340px]' : 'h-[140px]'} bg-jiinf-primary transition-all duration-300`}>

            {/* Top part of header */}
            <section className="flex flex-row justify-center md:justify-left items-center h-full w-full">
                <NavLink to={"/"} className="flex min-w-fit">
                    <img src="https://oogovalzsivvyrtsnesm.supabase.co/storage/v1/object/public/imagens/Elementos/Logo.png" alt="Logo" className={`flex ${isMenuOpen ? 'mt-48' : 'mt-6'} md:mt-4 h-80`}/>
                </NavLink>
                <h2 className='hidden md:flex w-full text-white md:text-xl lg:text-2xl mt-8 mr-4 font-SuperDario h-full justify-end items-center'>JOGOS INTERNOS DO INSTITUTO DE INFORMÁTICA DA UFG</h2>
            </section>

            {/* Hamburguer menu for small screens */}
            <div className="md:hidden w-full border-b-jiinf-primary border-b-[1px] flex justify-between items-center px-4 h-[40px] bg-jiinf-secondary">
                <button onClick={toggleMenu} className="text-white py-1">
                    {/* Icon for the hamburger menu */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Navigation for small screens */}
            {isMenuOpen && (
                <div className="md:hidden w-full bg-jiinf-secondary flex flex-col">
                    <nav className='flex flex-col w-full items-center justify-center text-lg'>
                        <ul className='flex flex-col w-full'>
                            {navItems.map((item, index) => (
                                <li key={index} className="w-full text-center border-b-jiinf-primary border-b-[1px]">
                                    <NavLink to={item.to} 
                                    className={`flex w-full justify-center font-SuperDario my-1 text-2xl lg:text-3xl transition-all hover:text-jiinf-primary
                                    ${isCurrentPage(item.to) ? 'text-jiinf-primary' : 'text-white'}`}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

            {/* Part for larger screens */}
            <div className="hidden md:flex w-full h-[32px] bg-jiinf-secondary justify-center items-center">
                <div className="flex w-3/4 flex-row h-full items-center justify-between">
                    <nav className='flex flex-row w-full items-center justify-center text-lg'>
                        <ul className='flex flex-row w-full items-center justify-between text-lg'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <NavLink to={item.to} className={`flex w-full justify-center font-SuperDario my-1 text-2xl lg:text-3xl transition-all hover:text-jiinf-primary
                                    ${isCurrentPage(item.to) ? 'text-jiinf-primary' : 'text-white'}`}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

const Footer = () => {
    return (
        <footer className=" bg-jiinf-primary text-white py-4 mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col  items-center md:flex-row md:justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <div className='flex flex-row gap-3 items-center justify-center'>
                    <p className="text-lg font-semibold">Unificada</p>
                    <a 
                    href="https://www.instagram.com/unificadaufg/"
                    target="_blank"
                    rel="noopener noreferrer">
                        <Instagram className='text-white h-5 w-5 hover:text-jiinf-secondary cursor-pointer'/>
                    </a>
                </div>
                <p className="text-sm mt-2">© 2024 Unificada. All rights reserved.</p>              
              </div>

              <div className='flex flex-col gap-3'>
                <div className='flex flex-row gap-2 items-center justify-center'>
                    <p className="text-sm">Developed by</p>
                    
                    <a 
                    href="https://github.com/manotv-alt" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex flex-row gap-2 hover:text-jiinf-secondary'>
                        <p className='text-sm cursor-pointer'>manotv-alt</p>
                        <Github className='h-5 w-5 cursor-pointer'/>
                    </a>

                    <a 
                    href="https://www.linkedin.com/in/emmanuel-fernandes-a04646289/"
                    target="_blank"
                    rel="noopener noreferrer">
                        <Linkedin className='text-white h-5 w-5 hover:text-jiinf-secondary cursor-pointer'/>
                    </a>

                </div>

                <div className='flex flex-row gap-2 items-center justify-center'>
                    <p className="text-sm">and</p>
                    
                    <a 
                    href="https://github.com/LuisFcarmo" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex flex-row gap-2 hover:text-jiinf-secondary'>
                        <p className='text-sm cursor-pointer'>LuisFcarmo</p>
                        <Github className='h-5 w-5 cursor-pointer'/>
                    </a>

                    <a 
                    href="https://www.linkedin.com/in/luis-cesar-ferreira-do-carmo/"
                    target="_blank"
                    rel="noopener noreferrer">
                        <Linkedin className='text-white h-5 w-5 hover:text-jiinf-secondary cursor-pointer'/>
                    </a>

                </div>
              </div>
              
            </div>
          </div>
        </footer>
    );
};

export { Footer, Header };
