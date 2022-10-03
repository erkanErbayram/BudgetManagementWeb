import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from "../redux/actions/authAction"

function Sidebar() {
    const dispatch = useDispatch();
    return (
        <div>
            <div class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-yellow-400 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
                <div class="flex items-center justify-center mt-8">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>

                        <Link to="/main"><span class="text-black text-2xl mx-2 font-semibold">Dashboard</span></Link>
                    </div>
                </div>

                <nav class="mt-10 pb-96 pt-32">

                    <Link class="flex items-center mt-4 py-2 px-6 text-black hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        to="/hesaplar">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                        </svg>

                        <span class="mx-3">Hesaplar</span>
                    </Link>

                    <Link class="flex items-center mt-4 py-2 px-6 text-black hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        to="/gelirgider">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>

                        <span class="mx-3">Gelir-Gider Anasayfası</span>
                    </Link>

                    <Link class="flex items-center mt-4 py-2 px-6 text-black hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        to="/raporlar">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>

                        <span class="mx-3">Raporlar</span>
                    </Link>

                    <Link class="flex items-center mt-4 py-2 px-6 text-black hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        to="/kur">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span class="mx-3">Kur</span>
                    </Link>

                    <Link class="flex items-center mt-4 py-2 px-6 text-black hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        to="/profil">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span class="mx-3">Profil</span>
                    </Link>

                    <button onClick={() => dispatch(logout())} class="flex items-center mt-4 py-2 px-6 text-black hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                    >
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>

                        <span class="mx-3">Çıkış</span>
                    </button>

                </nav>
            </div>
        </div>
    )
}

export default Sidebar
