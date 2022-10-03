import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            <header class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-yellow-400">
                <div class="flex items-center">
                    <button class="text-gray-500 focus:outline-none lg:hidden">
                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <div class="flex items-center">
                    <div class="relative">

                        <div class="fixed inset-0 h-full w-full z-10" style={{ display: "none" }}></div>

                        <div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10"
                            style={{ width: "20rem", display: "none;" }}>

                        </div>
                    </div>

                    <div class="relative">
                        <Link to="/profil">
                            <button class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
                                <img class="h-full w-full object-cover"
                                    src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80"
                                    alt="Your avatar" />
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
