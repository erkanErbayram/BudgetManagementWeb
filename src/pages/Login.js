import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../redux/actions/authAction"
function Login() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData;

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (isAuthenticated) {
        return <Redirect to="/main" />;
    }
    return (
        <div>
            <div class="max-w-lg max-w-xs bg-yellow-400 shadow-2xl rounded-lg mx-auto text-center py-12 mt-16 rounded-xl">
                <h1 class="text-black text-center font-extrabold -mt-3 text-3xl">Giriş Yap</h1>
                <div class="container py-5 max-w-md mx-auto">
                    <form onSubmit={e => onSubmit(e)}>
                        <div class="mb-4">
                            <input placeholder="Email"
                                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                onChange={(e) => onChange(e)}
                                value={email}
                            />
                        </div>
                        <div class="mb-6">

                            <input placeholder="Parola"
                                class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="password"
                                onChange={(e) => onChange(e)}
                                value={password}
                            />

                        </div>
                        <div class="flex items-center justify-between">
                            <button
                                type="submit"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Giriş Yap
                            </button>
                            <Link class="inline-block align-baseline font-bold text-sm text-gray-400 " to="/signup">
                                <button
                                    class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Kayıt Ol
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

export default Login
