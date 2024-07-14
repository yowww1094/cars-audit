import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

axios.defaults.baseURL = 'http://localhost:8080'

function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState('')

    const navigate = useNavigate()

    const handelOnchange = (e) => {
        const { value, name } = e.target
        setLoginData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await axios.post('/login', loginData)
            if (user.status == 200) {
                const { token, id } = user.data
                localStorage.setItem('_auth', "Bearer " + token)
                localStorage.setItem('user_id', id)
                navigate('/')
            }
        } catch (error) {
            if (error.response || error.response?.data.errors) {
                setErrors(error.response.data.message)
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[600px] flex flex-col gap-1">
                <div className="bg-neutral-400 px-8 py-14 rounded-md">
                    <form onSubmit={handleLogin} className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4 px-4 justify-center items-center">
                            {errors && <span className="text-red-500 text-md pl-5">{errors}</span>}
                            <div className="input-type flex flex-col gap-3">
                                <label htmlFor="username" className="font-bold pl-5">
                                    Utilisateur
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="border w-full px-5 py-2 focus:outline-none rounded-md"
                                    id="username"
                                    required
                                    value={loginData.username}
                                    onChange={handelOnchange}
                                />
                            </div>

                            <div className="input-type flex flex-col gap-3">
                                <label htmlFor="password" className="font-bold pl-5">
                                    Mot de Pass
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="border w-full px-5 py-2 focus:outline-none rounded-md"
                                    id="password"
                                    required
                                    value={loginData.password}
                                    onChange={handelOnchange}
                                />
                            </div>
                        </div>

                        <button className="flex left-6 justify-center place-self-center text-md text-white w-[150px] bg-neutral-800 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-neutral-800 hover:text-neutral-800">
                            Connexion
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
