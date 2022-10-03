import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useSelector } from 'react-redux';
function Profile() {
    const [adModal, setAdModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    return (
        <div>
            <div class="flex flex-row flex-wrap p-3">
                <div class="mx-auto w-2/3">
                    <div class="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased" style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
                        backgroundRepeat: "no-repat",
                        backgroundSize: "cover",
                        backgroundBlendMode: "multiply",
                    }}>
                        <div class="md:w-1/3 w-full">
                            <button onClick={() => { setImageModal(true) }}>
                                <img alt="Profile" class="rounded-lg shadow-lg antialiased" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                            </button>
                        </div>
                        <div class="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                            <div class="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
                                <div class="text-2xl text-white leading-tight">{user.nameSurname}
                                    <button class="ml-5" onClick={() => { setAdModal(true) }}>
                                        <svg class="h-6 w-6 text-right" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Transition appear show={adModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setAdModal(false)}
                >
                    <div className="min-h-screen text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="mt-2">
                                    <div class="flex flex-col py-5 bg-gray-50">
                                        <p class="mb-2 font-semibold text-gray-700">Kullanıcı Adı</p>
                                        <input id="" type="" name="" placeholder="Hesap Adı Giriniz" class="block w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none" required />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={() => setAdModal(false)}
                                    >
                                        Vazgeç
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-5 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={() => setAdModal(false)}
                                    >
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>


            <Transition appear show={imageModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setImageModal(false)}
                >
                    <div className="min-h-screen text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div class="">
                                    <main class="container mx-auto max-w-screen-lg h-full">

                                        <article aria-label="File Upload Modal" class="relative h-full flex flex-col bg-white shadow-xl rounded-md" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);" ondragenter="dragEnterHandler(event);">

                                            <div id="overlay" class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
                                                <i>
                                                    <svg class="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                                                    </svg>
                                                </i>
                                                <p class="text-lg text-blue-700">Drop files to upload</p>
                                            </div>

                                            <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
                                                <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                                    <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                                        <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                                    </p>
                                                    <input id="hidden-input" type="file" multiple class="hidden" />
                                                    <button id="button" class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                                        Upload a file
                                                    </button>
                                                </header>

                                                <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                                    To Upload
                                                </h1>

                                                <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                                                    <li id="empty" class="h-full w-full text-center flex flex-col items-center justify-center items-center">
                                                        <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                                        <span class="text-small text-gray-500">No files selected</span>
                                                    </li>
                                                </ul>
                                            </section>

                                        </article>
                                    </main>
                                </div>


                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={() => setImageModal(false)}
                                    >
                                        Vazgeç
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-5 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={() => setImageModal(false)}
                                    >
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>



        </div >
    )
}

export default Profile

