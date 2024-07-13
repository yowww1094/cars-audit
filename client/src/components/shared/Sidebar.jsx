import React from 'react'
import classNames from 'classnames'
import logo from '/protech-logo.png'
import {HiOutlineLogout} from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/Navigation';
import { Link, useLocation } from 'react-router-dom';

const linkClasses = 'flex item-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

function Sidebar() {
  return (
    <div className='flex flex-col bg-neutral-900 w-60 h-screen p-3 text-white overflow-hidden sticky top-0'>
      <div className='flex items-center gap-2 px-3 pb-2 border-b border-neutral-700'>
        <img src={logo} alt="logo" className='size-10'/>
        <span className='text-neutral-100 text-lg'>Protech Audit</span>
      </div>
      <div className='flex-1 py-8 flex flex-col gap-0.5'>
        {DASHBOARD_SIDEBAR_LINKS.map(item => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700 '>
        <div to='/' className={classNames('text-red-500 cursor-pointer', linkClasses)}>
          <span className='text-xl'><HiOutlineLogout /></span>
          Deconnexion
        </div>
        <p className='text-center text-neutral-600 text-base'>botdiv</p>
      </div>
    </div>
  )
}

function SidebarLink({item}) {
  const {pathname} = useLocation()

  return (
    <Link to={item.path} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClasses)}>
      <span className='text-xl'>{item.icon}</span>
      {item.label}
    </Link>
  )
}


export default Sidebar