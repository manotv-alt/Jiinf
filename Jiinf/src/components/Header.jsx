import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { usePath } from '../hooks/usePath';

export function Header() {

    const [currentPage, setCurrentPage] = useState();
    const { isCurrentPage } = usePath();

    const current = 'flex font-semibold my-1 text-lg lg:text-xl text-jiinf-primary transition-all hover:text-jiinf-primary';
    const general = 'flex font-semibold my-1 text-lg lg:text-xl text-white transition-all hover:text-jiinf-primary';
    const navItems = [
        { to: '/', label: 'Início' },
        { to: '/teams', label: 'Equipes' },
        { to: '/calendar', label: 'Calendário' },
        { to: '/modalitys', label: 'Modalidades' },
    ];

    return (
        <header className="flex flex-col w-full justify-end items-center h-[140px] bg-jiinf-primary">
            <section className="flex flex-row justify-left items-center h-full w-full">
                <img src="https://oogovalzsivvyrtsnesm.supabase.co/storage/v1/object/public/imagens/Elementos/Logo.png" alt="Logo" className='flex mt-5 h-80'/>
                <h2 className='flex w-full text-white text-md lg:text-lg mt-8 mr-4 font-bold h-full justify-end items-center'>JOGOS INTERNOS DO INSTITUTO DE INFORMÁTICA DA UFG</h2>
            </section>
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