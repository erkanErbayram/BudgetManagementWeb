import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <div class="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
                <div class="ml-8 text-lg text-gray-700 hidden md:flex">ITMAS</div>
                <div class="flex flex-row-reverse mr-4 ml-4 md:hidden">
                    <i class="fas fa-bars" />
                </div >
                <div class="flex flex-row-reverse mr-8 hidden md:flex">
                    <button
                        class="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
                    >
                        <Link to="/signup">Signup</Link>
                    </button>
                    <button
                        class="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-blue-700 uppercase transition bg-transparent border-2 mr-2 border-blue-700 rounded ripple hover:bg-blue-100 focus:outline-none"
                    >
                        <Link to="/login">Login</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
