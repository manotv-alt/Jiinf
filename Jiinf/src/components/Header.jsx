import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { usePath } from '../hooks/usePath';

export function Header() {

    const [currentPage, setCurrentPage] = useState();
    const { isCurrentPage } = usePath();

    const current = 'flex font-SuperDario my-1 text-2xl lg:text-3xl text-jiinf-primary transition-all hover:text-jiinf-primary';
    const general = 'flex font-SuperDario my-1 text-2xl lg:text-3xl text-white transition-all hover:text-jiinf-primary';
    const navItems = [
        { to: '/', label: 'INÍCIO' },
        { to: '/teams', label: 'EQUPES' },
        { to: '/calendar', label: 'CALENDÁRIO' },
        { to: '/modalitys', label: 'MODALIDADES' },
    ];

    return (
        <header className="flex flex-col w-full justify-end items-center h-[140px] bg-jiinf-primary">

            {/* Top part of header */}
            <section className="flex flex-row justify-center md:justify-left items-center h-full w-full">
                <img src="https://oogovalzsivvyrtsnesm.supabase.co/storage/v1/object/public/imagens/Elementos/Logo.png" alt="Logo" className='flex mt-6 h-80'/>
                <h2 className='hidden md:flex w-full text-white text-md md:text-xl lg:text-2xl mt-8 mr-4 font-SuperDario h-full justify-end items-center'>JOGOS INTERNOS DO INSTITUTO DE INFORMÁTICA DA UFG</h2>
            </section>

            {/* Part to be a hamburguer when small screens */}
            <div className="flex w-full h-[40px] bg-jiinf-secondary justify-center items-center">
                <div className="flex w-3/4 flex-row h-full items-center justify-between">
                    <nav className='flex flex-row w-full items-center justify-center text-lg'>
                        <ul className='flex flex-row w-full items-center justify-between text-lg'>
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <NavLink to={item.to} className={isCurrentPage(item.to) ? current : general}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    
                </div>
            </div>
        </header>
    )
}//