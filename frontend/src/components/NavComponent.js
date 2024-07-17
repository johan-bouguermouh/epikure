"use client";

import Image from 'next/image';
import Logo from '../../public/logo/Epikure_dark.svg';

function NavComponent() {
    return (
        <header>
            <nav className="bg-slate-50 flex justify-between items-center px-10 py-4 w-full">
                <Image
                    src={Logo}
                    alt="Epikure Logo"
                    className="cursor-pointer w-40 h-10"
                    // priority
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Espace Agriculteur(trice)
                </button>
            </nav>
        </header>
    );
}

export default NavComponent;
