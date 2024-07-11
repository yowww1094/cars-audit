import {FaCarSide, FaClipboardList} from 'react-icons/fa'
import {MdMiscellaneousServices} from 'react-icons/md'
import {SiMercedes} from 'react-icons/si'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key:'voitures-audit',
        label:'Voitures Audit',
        path:'/',
        icon: <FaCarSide />,
    },
    {
        key:'services',
        label:'Services',
        path:'/services',
        icon: <MdMiscellaneousServices />,
    },
    {
        key:'brands',
        label:'Brands',
        path:'/brands',
        icon: <SiMercedes />,
    },
    {
        key:'models',
        label:'Models',
        path:'/models',
        icon: <FaClipboardList />,
    },
]