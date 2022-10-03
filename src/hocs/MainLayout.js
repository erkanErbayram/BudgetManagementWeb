import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function MainLayout(props) {
    return (
        <div>
            <div class="flex h-screen bg-gray-200">
                <div class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"></div>
                <Sidebar />

                <div class="flex-1 flex flex-col overflow-hidden h-full">
                    <Header />
                    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                        <div class="container mx-auto px-6 py-8">
                            {props.children}

                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
