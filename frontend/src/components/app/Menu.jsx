"use client"

import { AreaChart, ChevronsLeft, Github, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Menu() {
    let router = useRouter();
    const [menu, setMenu] = useState(false);

    let links = [
        {
            id: 0, name: "Início", img: <Home color="white" width={menu ? "21px" : "25px"} />, imgAlt: "Ícone início", link: "/"
        },
        {
            id: 1, name: "Desenvolvedores", img: <Github color="white" width={menu ? "21px" : "25px"} />, imgAlt: "Ícone início", link: "/desenvolvedores"
        },
        {
            id: 2, name: "Niveis", img: <AreaChart color="white" width={menu ? "21px" : "25px"} />, imgAlt: "Ícone início", link: "/niveis"
        }
    ];
    return (
        <>
            <nav className={`flex flex-col ${!menu ? "w-[280px] min-w-[280px]" : "w-[56px] min-w-[56px]"} bg-gray-700 ${menu && "transition-all"}`}>
                <div className="mx-2 pt-4 sticky top-0 left-0">
                    <div className={`flex flex-col gap-6`}>
                        <div className="flex items-center gap-3">
                            <img src="/assets/logo.jpeg" alt="imgem logo" className={menu ? "w-[38px]" : "w-[45px]"} />
                            {!menu && (
                                <div className="flex flex-col">
                                    <p className="text-white text-sm whitespace-nowrap">Gazin Tech</p>
                                </div>
                            )}
                        </div>
                        <hr />
                        <ul className="flex flex-col gap-2 mt-4">
                            {links?.map((link) => (
                                <li key={link.id} title={`Ir para ${link.name}`}>
                                    <Link href={link.link} className="flex items-center gap-2 hover:bg-gray-500 hover:cursor-pointer p-2 rounded-md">
                                        {link.img}
                                        {!menu && (
                                            <span className="text-sm text-white">{link.name}</span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className={`flex items-center gap-2 p-2 ${menu ? "w-[56px]" : "w-[280px]"} fixed bottom-0 left-0 rounded-md bg-gray-700 hover:bg-gray-500`}
                        onClick={() => {
                            if (menu) {
                                setMenu(false);
                            } else {
                                setMenu(true);
                            }
                        }} title={menu ? "Abrir menu" : "Fechar menu"}>
                        <ChevronsLeft color="white" className={`${menu && "rotate-180"}`} />
                        {!menu && (
                            <p className="text-white text-sm">Fechar menu</p>
                        )}
                    </button>
                </div>
            </nav>
        </>
    )
}