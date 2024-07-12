import React from 'react'
import {BiEdit, BiTrashAlt} from 'react-icons/bi'

function Services() {
    return (
        <section>
            <h1 className="text-xl text-center font-bold py-10">Services</h1>

            <div className="container mx-auto">
                <form className="grid lg:grid-cols-2 w-4/6 gap-4">
                    <div className="input-type">
                        <input
                            type="text"
                            name="serviceId"
                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                            id=""
                            placeholder="Numero de service"
                        />
                    </div>
                    <div className="input-type">
                        <input
                            type="text"
                            name="serviceName"
                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                            id=""
                            placeholder="Nom de service"
                        />
                    </div>

                    <button className="flex left-6 justify-center text-md w-1/6 bg-green-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                        Ajouter
                    </button>
                </form>
            </div>

            <div className="container mx-auto justify-between py-5 border=b">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-neutral-800">
                            <th className="px-16 py-2 w-1/8 items-center">
                                <span className="text-neutral-300">N</span>
                            </th>
                            <th className="px-16 py-2 w-2/8 items-center">
                                <span className="text-neutral-300">Code de Service</span>
                            </th>
                            <th className="px-16 py-2 w-3/8 items-center">
                                <span className="text-neutral-300">Nom de Service</span>
                            </th>
                            <th className="px-16 py-2 w-2/8 items-center">
                                <span className="text-neutral-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-neutral-300">
                        <tr>
                            <td className="px-16 py-2 w-1/8 items-center">
                                <span className="text-neutral-900">1</span>
                            </td>
                            <td className="px-16 py-2 w-2/8 items-center">
                                <span className="text-neutral-900 text-center">2001</span>
                            </td>
                            <td className="px-16 py-2 w-3/8 items-center">
                                <span className="text-neutral-900">Service 1</span>
                            </td>
                            <td className="px-16 py-2 w-2/8 items-center flex gap-3">
                                <button className="">
                                    <BiEdit size={25} color={'rgb(34,197,94)'} />
                                </button>
                                <button className="">
                                    <BiTrashAlt size={25} color={'rgb(244,63,94)'} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Services
