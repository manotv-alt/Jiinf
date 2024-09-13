import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { usePath } from '../hooks/usePath';

export function Header() {

    const [currentPage, setCurrentPage] = useState();
    const { isCurrentPage } = usePath();

    const current = 'flex text-blue-500 transition-all hover:text-black';
    const general = 'flex text-white transition-all hover:text-black';
    const navItems = [
        { to: '/', label: 'Início' },
        { to: '/teams', label: 'Equipes' },
        { to: '/calendar', label: 'Calendário' },
        { to: '/modalitys', label: 'Modalidades' },
    ];

    return (
        <header className="flex flex-col w-full justify-end items-center h-[140px] bg-blue-700">
            <section className="flex justify-left items-center h-full w-3/4">
                <h1 className="flex text-white font-serif text-7xl">Jiinf</h1>
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