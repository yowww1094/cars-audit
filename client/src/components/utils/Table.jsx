import React from 'react'

function table() {
  return (
    <table className='min-w-full table-auto'>
        <thead>
            <tr className='bg-neutral-800'>
                <th className='px-18 py-2 w-[10%] items-center'>
                    <span className='text-neutral-300'>N</span>
                </th>
                <th className='px-18 py-2 w-[30%] items-center'>
                    <span className='text-neutral-300'>Code de Service</span>
                </th>
                <th className='px-18 py-2 w-[60%] items-center'>
                    <span className='text-neutral-300'>Nom de Service</span>
                </th>
            </tr>
        </thead>
        <tbody className='bg-neutral-300'>
            <tr>
                <td className='px-16 py-2 w-[10%] items-center'>
                    <span className='text-neutral-900'>1</span>
                </td>
                <td className='px-16 py-2 w-[30%] items-center'>
                    <span className='text-neutral-900'>2001</span>
                </td>
                <td className='px-16 py-2 w-[60%] items-center'>
                    <span className='text-neutral-900'>Service 1</span>
                </td>
            </tr>
        </tbody>
    </table>
  )
}

export default table