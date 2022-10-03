import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { register } from "../redux/actions/authAction"
function Signup() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        re_password: "",
        nameSurname: ""
    })

    const { email, re_password, password, nameSurname } = formData;

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== re_password)
            return
        dispatch(register(email, password, nameSurname));
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    return (
        <div>
            <div class="max-w-lg max-w-xs bg-yellow-400 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4 rounded-xl">
                <h1 class="text-black text-center font-extrabold -mt-3 text-3xl">Kayıt Ol</h1>
                <div class="container py-5 max-w-md mx-auto">
                    <form onSubmit={e => onSubmit(e)}>
                        <div class="mb-4">
                            <input
                                placeholder="Ad Soyad"
                                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                name="nameSurname"
                                onChange={(e) => onChange(e)}
                                value={nameSurname}
                                required
                            />
                        </div>
                        <div class="mb-4">
                            <input placeholder="E-Mail"
                                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                onChange={(e) => onChange(e)}
                                value={email}
                                required
                            />
                        </div>
                        <div class="mb-4">

                            <input placeholder="Parola"
                                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="password"
                                onChange={(e) => onChange(e)}
                                value={password}
                                required
                            />

                        </div>
                        <div class="mb-4">

                            <input placeholder="Parola"
                                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="re_password"
                                type="password"
                                name="re_password"
                                onChange={(e) => onChange(e)}
                                value={re_password}
                                required
                            />

                        </div>
                        <div class="flex items-center justify-between">
                            <button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Kayıt Ol
                            </button>
                            <Link class="inline-block align-baseline font-bold text-sm text-gray-400 " to="/login">
                                <button
                                    class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button">
                                    Giriş Yap
                                </button>
                            </Link>
                        </div>
                        <div class="flex items-center justify-between mt-5 ml-40">
                            <Link class="align-baseline font-bold text-sm text-black " to="/">
                                Anasayfaya Dön
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup
