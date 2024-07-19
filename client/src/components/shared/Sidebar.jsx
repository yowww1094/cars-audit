import React from 'react'
import classNames from 'classnames'
import logo from '/protech-logo.png'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/Navigation'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import axios from 'axios'

axios.defaults.baseURL = 'http://locahost:8080'

const linkClasses =
    'flex item-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

function Sidebar() {
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    const handleChangePassword = async () => {
        const newPass = prompt('Nouveau Mot de Pass')
        const token = localStorage.getItem('_auth')
        const id = localStorage.getItem('user_id')
        try {
            const response = await axios.put(
                '/users/' + id,
                { password: newPass },
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            if (response.status == 200) {
                alert('Mot de pass changé avec succès')
                localStorage.clear()
                navigate('/login')
            }
        } catch (error) {}
    }

    return (
        <div className="flex flex-col bg-neutral-900 w-60 h-screen p-3 text-white overflow-hidden sticky top-0">
            <div className="flex items-center gap-2 px-3 pb-2 border-b border-neutral-700">
                <img src={logo} alt="logo" className="size-10" />
                <span className="text-neutral-100 text-lg">Protech Audit</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700 ">
                <div onClick={handleLogOut} className={classNames('text-red-500 cursor-pointer', linkClasses)}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Deconnexion
                </div>
                <div onClick={handleChangePassword} className={classNames('text-white cursor-pointer', linkClasses)}>
                    <span className="text-xl">
                        <FaUserCircle />
                    </span>
                    Changer Mot de Pass
                </div>
                <p className="text-center text-neutral-600 text-xs pt-2">Copyright &copy; 2024, <a className='text-neutral-500 underline' href="https://github.com/yowww1094">yowww1094</a>. <br /> Tous les droits réservés.</p>
            </div>
        </div>
    )
}

function SidebarLink({ item }) {
    const { pathname } = useLocation()

    return (
        <Link
            to={item.path}
            className={classNames(
                pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                linkClasses
            )}
        >
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}

export default Sidebar
