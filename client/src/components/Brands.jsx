import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrashAlt } from 'react-icons/bi'
import { IoMdCloseCircle } from 'react-icons/io'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'

function Brands() {
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name: ''
    })
    const [formDataEdit, setFormDataEdit] = useState({
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
        const brand = await axios.post('/brands', formData)
        if (brand.status == 200) {
            getFetchData()
            alert('Ajoutee avec Succee')
        }
    }

    const handleModificationSubmit = async (id) => {
        const brand = await axios.put("/brands/"+id, formDataEdit)
        
        if (brand.status == 200) {
          alert("Modifiee avec Succee")
          setShowModal(false)
          getFetchData()
        }
    }

    const handelDelete = async (id) => {
        const brands = await axios.delete('/brands/' + id)
        if (brands.status == 200) {
            getFetchData()
            alert('Suprimee avec Succee')
        }
    }

    const getFetchData = async () => {
        const brands = await axios.get('/brands')
        if (brands.status == 200) {
            setTableData(brands.data.brands)
        }
    }

    useEffect(() => {
        getFetchData()
    }, [])

    const handelEditButton = (brand) => {
        setShowModal(true)
        setFormDataEdit({ name: brand.name, id: brand._id })
    }

    const tableNumbers = (data) => {
      for (let index = 1; index <= data.length; index++) {
        return index
      }
    }

    return (
        <section>
            <h1 className="text-xl text-center font-bold py-10">Brands</h1>

            <div className="container mx-auto">
                <form onSubmit={handleCreationSubmit} className="grid lg:grid-cols-1 w-4/6 gap-4">
                    <div className="input-type">
                        <input
                            type="text"
                            name="name"
                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                            id="name"
                            placeholder="Nom du Marque"
                            onChange={handelOnChange}
                        />
                    </div>

                    <button className="flex left-6 justify-center text-white text-md w-1/6 bg-blue-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500">
                        Ajouter
                    </button>
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
                                onSubmit={()=>handleModificationSubmit(formDataEdit.id)}
                                className="flex flex-col gap-4"
                            >
                                <div className="input-type gap-1 flex flex-col">
                                    <label htmlFor="name" className="font-bold">
                                        Nom du Marque
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                        id="name"
                                        placeholder="Nom du Marque"
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
                            <th className="px-16 py-2 w-1/8 items-center">
                                <span className="text-neutral-300">N</span>
                            </th>
                            <th className="px-16 py-2 w-3/8 items-center">
                                <span className="text-neutral-300">Nom du Marque</span>
                            </th>
                            <th className="px-16 py-2 w-2/8 items-center">
                                <span className="text-neutral-300">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    {tableData.map((brand) => (
                        <tbody key={brand.name} className="bg-neutral-300">
                            <tr>
                                <td className="px-16 py-2 w-1/8 items-center">
                                    <span className="text-neutral-900">1</span>
                                </td>
                                <td className="px-16 py-2 w-3/8 items-center">
                                    <span className="text-neutral-900">{brand.name}</span>
                                </td>
                                <td className="px-16 py-2 w-2/8 items-center flex gap-3">
                                    <button className="">
                                        <BiEdit
                                            size={25}
                                            color={'rgb(34,197,94)'}
                                            onClick={() => handelEditButton(brand)}
                                        />
                                    </button>
                                    <button className="">
                                        <BiTrashAlt
                                            size={25}
                                            color={'rgb(244,63,94)'}
                                            onClick={() => handelDelete(brand._id)}
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

export default Brands
