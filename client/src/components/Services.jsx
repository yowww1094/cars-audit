import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrashAlt } from 'react-icons/bi'
import { IoMdCloseCircle } from 'react-icons/io'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

function Services() {
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        serviceId: '',
        name: ''
    })
    const [formDataEdit, setFormDataEdit] = useState({
        serviceId: '',
        name: '',
        id: ''
    })
    const [tableData, setTableData] = useState([])

    const handelOnChange = (e) => {
        const { value, name } = e.target
        setFormData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handelOnChangeEdit = (e) => {
        const { value, name } = e.target
        setFormDataEdit((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleCreationSubmit = async (e) => {
        e.preventDefault()
        const service = await axios.post('/services', formData)
        if (service.status == 200) {
            getFetchData()
            alert('Ajoutee avec Succee')
            setFormData({
                serviceId: '',
                name: ''
            })
        }
    }

    const handleModificationSubmit = async (id) => {
        const service = await axios.put('/services/' + id, {
            serviceId: formDataEdit.serviceId,
            name: formDataEdit.name
        })

        if (service.status == 200) {
            alert('Modifiee avec Succee')
            setShowModal(false)
            getFetchData()
        }
    }

    const handelDelete = async (id) => {
        const service = await axios.delete('/services/' + id)
        if (service.status == 200) {
            getFetchData()
            alert('Suprimee avec Succee')
        }
    }

    const getFetchData = async () => {
        const services = await axios.get('/services')
        if (services.status == 200) {
            setTableData(services.data.services)
        }
    }

    useEffect(() => {
        getFetchData()
    }, [])

    const handelEditButton = (service) => {
        setShowModal(true)
        setFormDataEdit({ name: service.name, serviceId: service.serviceId, id: service._id })
    }

    return (
        <section>
            <h1 className="text-xl text-center font-bold py-5">Services</h1>

            <div className="container mx-auto">
                <form onSubmit={handleCreationSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-row gap-4 px-4">
                        <div className="input-type w-1/3">
                            <label htmlFor="name" className="font-bold pl-5 pb-4">
                                Numero de Service
                            </label>
                            <input
                                type="text"
                                name="serviceId"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="serviceId"
                                placeholder="Numero de Service"
                                value={formData.serviceId}
                                onChange={handelOnChange}
                            />
                        </div>

                        <div className="input-type w-2/3">
                            <label htmlFor="name" className="font-bold pl-5 pb-4">
                                Nom du Service
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="name"
                                placeholder="Nom du Service"
                                value={formData.name}
                                onChange={handelOnChange}
                            />
                        </div>
                    </div>

                    <div className="px-4 place-self-end">
                        <button className="flex justify-center text-white text-md bg-blue-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500">
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[600px] flex flex-col gap-1">
                        <button className="text-red-600 text-xl place-self-end" onClick={() => setShowModal(false)}>
                            <IoMdCloseCircle size={25} />
                        </button>
                        <div className="bg-white px-20 py-20 rounded-md">
                            <form
                                onSubmit={() => handleModificationSubmit(formDataEdit.id)}
                                className="flex flex-col gap-4"
                            >
                                <div className="input-type gap-1 flex flex-col">
                                    <label htmlFor="serviceId" className="font-bold">
                                        Numero de Service
                                    </label>
                                    <input
                                        type="text"
                                        name="serviceId"
                                        className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                        id="serviceId"
                                        placeholder="Numero de Service"
                                        value={formDataEdit.serviceId}
                                        onChange={handelOnChangeEdit}
                                    />
                                </div>
                                <div className="input-type gap-1 flex flex-col">
                                    <label htmlFor="name" className="font-bold">
                                        Nom du Service
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                        id="name"
                                        placeholder="Nom du Service"
                                        value={formDataEdit.name}
                                        onChange={handelOnChangeEdit}
                                    />
                                </div>

                                <button className="flex left-6 justify-center place-self-end text-md text-white w-[150px] bg-orange-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-orange-500 hover:text-orange-500">
                                    Modifier
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto justify-between py-5 border=b">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-neutral-800">
                            <th className="px-16 py-2 w-3/8 items-center">
                                <span className="text-neutral-300">Numero de Service</span>
                            </th>
                            <th className="px-16 py-2 w-3/8 items-center">
                                <span className="text-neutral-300">Nom du Service</span>
                            </th>
                            <th className="px-16 py-2 w-2/8 items-center">
                                <span className="text-neutral-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    {tableData.map((service) => (
                        <tbody key={service.name} className="bg-neutral-300">
                            <tr>
                                <td className="px-16 py-2 w-3/8 items-center">
                                    <span className="text-neutral-900">{service.serviceId}</span>
                                </td>
                                <td className="px-16 py-2 w-3/8 items-center">
                                    <span className="text-neutral-900">{service.name}</span>
                                </td>
                                <td className="px-16 py-2 w-2/8 items-center flex gap-3">
                                    <button className="">
                                        <BiEdit
                                            size={25}
                                            color={'rgb(34,197,94)'}
                                            onClick={() => handelEditButton(service)}
                                        />
                                    </button>
                                    <button className="">
                                        <BiTrashAlt
                                            size={25}
                                            color={'rgb(244,63,94)'}
                                            onClick={() => handelDelete(service._id)}
                                        />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </section>
    )
}

export default Services
