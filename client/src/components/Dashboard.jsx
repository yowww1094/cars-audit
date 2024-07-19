import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import { BiEdit, BiTrashAlt } from 'react-icons/bi'
import { FaEye } from 'react-icons/fa'
import axios from 'axios'
import dateFormat from 'dateformat'
import * as XLSX from 'xlsx'
import { useNavigate } from 'react-router'

axios.defaults.baseURL = 'http://localhost:8080'

function Dashboard() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [showDataModal, setShowDataModal] = useState(false)
    const [formData, setFormData] = useState({
        dateEntrer: '',
        dateSortie: '',
        blNumber: '',
        brand: '',
        matricule: '',
        clientName: '',
        clientPhone: '',
        serviceType: '',
        price: '',
        paidAmt: '',
        unpaidAmt: '',
        technicien: '',
        seniorityCard: '',
        fidelity: '',
        reclamation: ''
    })
    const [formDataEdit, setFormDataEdit] = useState({
        dateEntrer: '',
        dateSortie: '',
        blNumber: '',
        brand: '',
        matricule: '',
        clientName: '',
        clientPhone: '',
        serviceType: '',
        price: '',
        paidAmt: '',
        technicien: '',
        seniorityCard: '',
        fidelity: '',
        reclamation: '',
        id: ''
    })
    const [unpaidAmt, setUnpaidAmt] = useState('')
    const [tableData, setTableData] = useState([])
    const [errors, setErrors] = useState({
        dateEntrer: '',
        blNumber: '',
        brand: '',
        matricule: '',
        clientName: '',
        serviceType: '',
        price: ''
    })

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
        try {
            const service = await axios.post('/orders', formData, {
                headers: {
                    authorization: localStorage.getItem('_auth')
                }
            })
            if (service.status == 200) {
                setFormData({
                    dateEntrer: '',
                    dateSortie: '',
                    blNumber: '',
                    brand: '',
                    matricule: '',
                    clientName: '',
                    clientPhone: '',
                    serviceType: '',
                    price: '',
                    paidAmt: '',
                    unpaidAmt: '',
                    technicien: '',
                    seniorityCard: '',
                    fidelity: '',
                    reclamation: ''
                })
                setFormDataEdit({dateEntrer: '',
                    dateSortie: '',
                    blNumber: '',
                    brand: '',
                    matricule: '',
                    clientName: '',
                    clientPhone: '',
                    serviceType: '',
                    price: '',
                    paidAmt: '',
                    unpaidAmt: '',
                    technicien: '',
                    seniorityCard: '',
                    fidelity: '',
                    reclamation: ''})
                setErrors({})

                alert('Ajoutée avec Sucée')
                getFetchData()
            }
        } catch (error) {
            if (error.response.data.auth == false) {
                navigate('/login')
            } else if (error.response.data) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const handleModificationSubmit = async (id) => {
        try {
            const service = await axios.put('/orders/' + id, formDataEdit, {
                headers: {
                    authorization: localStorage.getItem('_auth')
                }
            })

            if (service.status == 200) {
                alert('Modifiée avec Sucée')
                setShowModal(false)
                getFetchData()
                setErrors({})
            }
        } catch (error) {
            if (error.response.data.auth == false) {
                navigate('/login')
            } else if (error.response.data) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const handelDelete = async (id) => {
        try {
            const order = await axios.delete('/orders/' + id, {
                headers: {
                    authorization: localStorage.getItem('_auth')
                }
            })
            if (order.status == 200) {
                getFetchData()
                alert('Supprimée avec Sucée')
            }
        } catch (error) {
            if (error.response?.data.auth == false) {
                navigate('/login')
            }
        }
    }

    const handelSearch = async () => {
        try {
            const orders = await axios.get('/orders', {
                params: formData,
                headers: {
                    authorization: localStorage.getItem('_auth')
                }
            })
            if (orders.status == 200) {
                setTableData(orders.data.orders)
            }
        } catch (error) {
            if (error.response?.data.auth == false) {
                navigate('/login')
            }
        }
    }

    const getFetchData = async () => {
        try {
            const orders = await axios.get('/orders', {
                headers: {
                    authorization: localStorage.getItem('_auth')
                }
            })

            if (orders.status == 200) {
                setTableData(orders.data.orders)
            }
        } catch (error) {
            if (error.response?.data.auth == false) {
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        getFetchData()
    }, [])

    useEffect(() => {
        // Convert the input values to numbers
        const priceValue = parseFloat(formData.price)
        const paidAmountValue = parseFloat(formData.paidAmt)

        // Calculate the unpaid amount
        if (!isNaN(priceValue) && !isNaN(paidAmountValue)) {
            setUnpaidAmt(priceValue - paidAmountValue)
        } else {
            setUnpaidAmt('')
        }
    }, [formData.price, formData.paidAmt])

    useEffect(() => {
        // Convert the input values to numbers
        const priceValue = parseFloat(formDataEdit.price)
        const paidAmountValue = parseFloat(formDataEdit.paidAmt)

        // Calculate the unpaid amount
        if (!isNaN(priceValue) && !isNaN(paidAmountValue)) {
            setUnpaidAmt(priceValue - paidAmountValue)
        } else {
            setUnpaidAmt('')
        }
    }, [formDataEdit.price, formDataEdit.paidAmt])

    const handelEditButton = (order) => {
        setShowModal(true)
        setFormDataEdit(order)
    }

    const handelMoreButton = (order) => {
        setShowDataModal(true)
        setFormDataEdit(order)
    }

    const handelExportToExcel = () => {
        var wb = XLSX.utils.book_new()
        var ws = XLSX.utils.json_to_sheet(tableData)

        ws['B1'].v = "Date d'Entrer"
        ws['C1'].v = 'Date de Sortie'
        ws['D1'].v = 'Numero de BL'
        ws['E1'].v = 'Marque'
        ws['F1'].v = 'Matricule'
        ws['G1'].v = 'Nom de Client'
        ws['H1'].v = 'Telephone'
        ws['I1'].v = 'Nature de service'
        ws['J1'].v = 'Prix'
        ws['K1'].v = 'Montant Payee'
        ws['L1'].v = 'Technicien'
        ws['M1'].v = 'Carte anciennete'
        ws['N1'].v = 'Carte fidelete'

        ws['!cols'] = ws['!cols'] || []
        ws['!cols'][0] = { hidden: true }
        ws['!cols'][14] = { hidden: true }
        ws['!cols'][15] = { hidden: true }
        ws['!cols'][16] = { hidden: true }
        ws['!cols'][17] = { hidden: true }

        //XLSX.utils.sheet_add_aoa(ws, [["Date d'Entrer"]], {origin: "B1"})

        XLSX.utils.book_append_sheet(wb, ws, 'Page1')
        XLSX.writeFile(wb, 'Protech_Audit.xlsx')
    }

    const dateFormatter = (date, fieldType) => {
        if (fieldType == 'table') {
            return dateFormat(date, 'dd-mm-yyyy')
        } else if (fieldType == 'form') {
            return dateFormat(date, 'yyyy-mm-dd')
        }
    }

    const checkArabic = (value) => {
        const arabicRegex = /[\u0600-\u06FF]/;
        if (arabicRegex.test(value)) {
            return "rtl"
        } else {
            return "ltr"
        }
    }

    return (
        <section>
            <h1 className="text-xl text-center font-bold py-5">Audit</h1>

            <div className="container mx-auto">
                <form onSubmit={handleCreationSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-row gap-4 px-4">
                        <div className="input-type">
                            <label htmlFor="dateEntrer" className="font-bold pl-5 pb-4">
                                Date Entrer
                            </label>
                            <input
                                type="date"
                                name="dateEntrer"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="dateEntrer"
                                value={formData.dateEntrer}
                                onChange={handelOnChange}
                            />
                            {errors.dateEntrer && (
                                <span className="text-red-500 text-sm pl-5">{errors.dateEntrer}</span>
                            )}
                        </div>

                        <div className="input-type">
                            <label htmlFor="dateSortie" className="font-bold pl-5 pb-4">
                                Date Sortie
                            </label>
                            <input
                                type="date"
                                name="dateSortie"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="dateSortie"
                                value={formData.dateSortie}
                                onChange={handelOnChange}
                            />
                        </div>
                        <div className="input-type">
                            <label htmlFor="blNumber" className="font-bold pl-5 pb-4">
                                Numero de BL
                            </label>
                            <input
                                type="text"
                                name="blNumber"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="blNumber"
                                placeholder="Numero de BL"
                                value={formData.blNumber}
                                onChange={handelOnChange}
                            />
                            {errors.blNumber && <span className="text-red-500 text-sm pl-5">{errors.blNumber}</span>}
                        </div>
                        <div className="input-type">
                            <label htmlFor="brand" className="font-bold pl-5 pb-4">
                                Marque
                            </label>
                            <input
                                type="text"
                                name="brand"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="brand"
                                placeholder="Marque du voiture"
                                value={formData.brand}
                                onChange={handelOnChange}
                            />
                            {errors.brand && <span className="text-red-500 text-sm pl-5">{errors.brand}</span>}
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 px-4">
                        <div className="input-type">
                            <label htmlFor="matricule" className="font-bold pl-5 pb-4">
                                Matricule
                            </label>
                            <input
                                type="text"
                                dir={checkArabic(formData.matricule)}
                                name="matricule"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="matricule"
                                placeholder="Matricule"
                                value={formData.matricule}
                                onChange={handelOnChange}
                            />
                            {errors.matricule && <span className="text-red-500 text-sm pl-5">{errors.matricule}</span>}
                        </div>
                        <div className="input-type">
                            <label htmlFor="clientName" className="font-bold pl-5 pb-4">
                                Nom du Client
                            </label>
                            <input
                                type="text"
                                name="clientName"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="clientName"
                                placeholder="Nom du Client"
                                value={formData.clientName}
                                onChange={handelOnChange}
                            />
                            {errors.clientName && (
                                <span className="text-red-500 text-sm pl-5">{errors.clientName}</span>
                            )}
                        </div>
                        <div className="input-type">
                            <label htmlFor="clientPhone" className="font-bold pl-5 pb-4">
                                Telephone
                            </label>
                            <input
                                type="text"
                                name="clientPhone"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="clientPhone"
                                placeholder="Telephone"
                                value={formData.clientPhone}
                                onChange={handelOnChange}
                            />
                        </div>
                        <div className="input-type">
                            <label htmlFor="serviceType" className="font-bold pl-5 pb-4">
                                Nature de Service
                            </label>
                            <input
                                type="text"
                                name="serviceType"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="serviceType"
                                placeholder="Nature de Service"
                                value={formData.serviceType}
                                onChange={handelOnChange}
                            />
                            {errors.serviceType && (
                                <span className="text-red-500 text-sm pl-5">{errors.serviceType}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 px-4">
                        <div className="input-type">
                            <label htmlFor="price" className="font-bold pl-5 pb-4">
                                Prix
                            </label>
                            <input
                                type="text"
                                name="price"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="price"
                                placeholder="Prix de service"
                                value={formData.price}
                                onChange={handelOnChange}
                            />
                            {errors.price && <span className="text-red-500 text-sm pl-5">{errors.price}</span>}
                        </div>
                        <div className="input-type">
                            <label htmlFor="paidAmt" className="font-bold pl-5 pb-4">
                                Montant Payée
                            </label>
                            <input
                                type="text"
                                name="paidAmt"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="paidAmt"
                                placeholder="Montant Payée"
                                value={formData.paidAmt}
                                onChange={handelOnChange}
                            />
                        </div>
                        <div className="input-type">
                            <label htmlFor="unpaidAmt" className="font-bold pl-5 pb-4">
                                Reste
                            </label>
                            <input
                                type="text"
                                name="unpaidAmt"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="unpaidAmt"
                                placeholder="Reste"
                                value={unpaidAmt}
                                onChange={handelOnChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 px-4">
                        <div className="input-type">
                            <label htmlFor="technicien" className="font-bold pl-5 pb-4">
                                Nom de Technicien
                            </label>
                            <input
                                type="text"
                                name="technicien"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="technicien"
                                placeholder="Nom de Technicien"
                                value={formData.technicien}
                                onChange={handelOnChange}
                            />
                        </div>
                        <div className="input-type">
                            <label htmlFor="seniorityCard" className="font-bold pl-5 pb-4">
                                Carte d'abonnement
                            </label>
                            <input
                                type="text"
                                name="seniorityCard"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="seniorityCard"
                                placeholder="Carte d'ancienneté"
                                value={formData.seniorityCard}
                                onChange={handelOnChange}
                            />
                        </div>
                        <div className="input-type">
                            <label htmlFor="fidelity" className="font-bold pl-5 pb-4">
                                Carte de fidélité
                            </label>
                            <input
                                type="text"
                                name="fidelity"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="fidelity"
                                placeholder="Carte de fidélité"
                                value={formData.fidelity}
                                onChange={handelOnChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 px-4">
                        <div className="input-type">
                            <label htmlFor="reclamation" className="font-bold pl-5 pb-4">
                                Divers reclamation
                            </label>
                            <input
                                type="text"
                                name="reclamation"
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                id="reclamation"
                                placeholder="Divers reclamation"
                                value={formData.reclamation}
                                onChange={handelOnChange}
                            />
                        </div>
                    </div>

                    <div className="px-4 w-full flex flex-row gap-2 justify-between">
                        <div className="flex flex-row">
                            <button
                                type="button"
                                onClick={getFetchData}
                                className="flex justify-center text-white text-md bg-gray-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-gray-500 hover:text-gray-500"
                            >
                                Afficher Tous
                            </button>
                        </div>
                        <div className="flex flex-row">
                            <button
                                type="button"
                                onClick={handelExportToExcel}
                                className="flex justify-center text-white text-md bg-green-500 px-4 py-2 border rounded-md hover:bg-neutral-50 hover:border-green-500 hover:text-green-500"
                            >
                                Expoter a l'excel
                            </button>
                        </div>
                        <div className="flex flex-row gap-3">
                            <button
                                type="button"
                                onClick={handelSearch}
                                className="flex justify-center text-white text-md bg-orange-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-orange-500 hover:text-orange-500"
                            >
                                Rechercher
                            </button>
                            <button
                                type="submit"
                                className="flex justify-center text-white text-md bg-blue-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500"
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[1000px] flex flex-col gap-1">
                        <button className="text-red-600 text-xl place-self-end" onClick={() => setShowModal(false)}>
                            <IoMdCloseCircle size={25} />
                        </button>
                        <div className="bg-white px-8 py-14 rounded-md">
                            <form
                                onSubmit={() => handleModificationSubmit(formDataEdit._id)}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="dateEntrer" className="font-bold pl-5 pb-4">
                                            Date Entrer
                                        </label>
                                        <input
                                            type="date"
                                            name="dateEntrer"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="dateEntrer"
                                            required
                                            value={dateFormatter(formDataEdit.dateEntrer, 'form')}
                                            onChange={handelOnChangeEdit}
                                        />
                                        {errors.dateEntrer && (
                                            <span className="text-red-500 text-sm pl-5">{errors.dateEntrer}</span>
                                        )}
                                    </div>

                                    <div className="input-type">
                                        <label htmlFor="dateSortie" className="font-bold pl-5 pb-4">
                                            Date Sortie
                                        </label>
                                        <input
                                            type="date"
                                            name="dateSortie"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="dateSortie"
                                            required
                                            value={dateFormatter(formDataEdit.dateSortie, 'form')}
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="blNumber" className="font-bold pl-5 pb-4">
                                            Numero de BL
                                        </label>
                                        <input
                                            type="text"
                                            name="blNumber"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="blNumber"
                                            placeholder="Numero de BL"
                                            required
                                            value={formDataEdit.blNumber}
                                            onChange={handelOnChangeEdit}
                                        />
                                        {errors.blNumber && (
                                            <span className="text-red-500 text-sm pl-5">{errors.blNumber}</span>
                                        )}
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="brand" className="font-bold pl-5 pb-4">
                                            Marque
                                        </label>
                                        <input
                                            type="text"
                                            name="brand"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="brand"
                                            placeholder="Marque du voiture"
                                            required
                                            value={formDataEdit.brand}
                                            onChange={handelOnChangeEdit}
                                        />
                                        {errors.brand && (
                                            <span className="text-red-500 text-sm pl-5">{errors.brand}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="matricule" className="font-bold pl-5 pb-4">
                                            Matricule
                                        </label>
                                        <input
                                            type="text"
                                            dir={checkArabic(formDataEdit.matricule)}
                                            name="matricule"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="matricule"
                                            placeholder="Matricule"
                                            required
                                            value={formDataEdit.matricule}
                                            onChange={handelOnChangeEdit}
                                        />
                                        {errors.matricule && (
                                            <span className="text-red-500 text-sm pl-5">{errors.matricule}</span>
                                        )}
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="clientName" className="font-bold pl-5 pb-4">
                                            Nom du Client
                                        </label>
                                        <input
                                            type="text"
                                            name="clientName"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="clientName"
                                            placeholder="Nom du Client"
                                            required
                                            value={formDataEdit.clientName}
                                            onChange={handelOnChangeEdit}
                                        />
                                        {errors.clientName && (
                                            <span className="text-red-500 text-sm pl-5">{errors.clientName}</span>
                                        )}
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="clientPhone" className="font-bold pl-5 pb-4">
                                            Telephone
                                        </label>
                                        <input
                                            type="text"
                                            name="clientPhone"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="clientPhone"
                                            placeholder="Telephone"
                                            required
                                            value={formDataEdit.clientPhone}
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="serviceType" className="font-bold pl-5 pb-4">
                                            Nature de Service
                                        </label>
                                        <input
                                            type="text"
                                            name="serviceType"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="serviceType"
                                            placeholder="Nature de Service"
                                            required
                                            value={formDataEdit.serviceType}
                                            onChange={handelOnChangeEdit}
                                        />
                                        {errors.serviceType && (
                                            <span className="text-red-500 text-sm pl-5">{errors.serviceType}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="price" className="font-bold pl-5 pb-4">
                                            Prix
                                        </label>
                                        <input
                                            type="text"
                                            name="price"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="price"
                                            placeholder="Prix de service"
                                            required
                                            value={formDataEdit.price}
                                            onChange={handelOnChangeEdit}
                                        />
                                        {errors.price && (
                                            <span className="text-red-500 text-sm pl-5">{errors.price}</span>
                                        )}
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="paidAmt" className="font-bold pl-5 pb-4">
                                            Montant Payée
                                        </label>
                                        <input
                                            type="text"
                                            name="paidAmt"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="paidAmt"
                                            placeholder="Montant Payée"
                                            value={formDataEdit.paidAmt}
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="unpaidAmt" className="font-bold pl-5 pb-4">
                                            Reste
                                        </label>
                                        <input
                                            type="text"
                                            name="unpaidAmt"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="unpaidAmt"
                                            placeholder="Reste"
                                            value={unpaidAmt}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="technicien" className="font-bold pl-5 pb-4">
                                            Nom de Technicien
                                        </label>
                                        <input
                                            type="text"
                                            name="technicien"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="technicien"
                                            placeholder="Nom de Technicien"
                                            value={formDataEdit.technicien}
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="seniorityCard" className="font-bold pl-5 pb-4">
                                            Carte d'ancienneté
                                        </label>
                                        <input
                                            type="text"
                                            name="seniorityCard"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="seniorityCard"
                                            placeholder="Carte d'ancienneté"
                                            value={formDataEdit.seniorityCard}
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="fidelity" className="font-bold pl-5 pb-4">
                                            Carte de fidélité
                                        </label>
                                        <input
                                            type="text"
                                            name="fidelity"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="fidelity"
                                            placeholder="Carte de fidélité"
                                            value={formDataEdit.fidelity}
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="reclamation" className="font-bold pl-5 pb-4">
                                            Divers reclamation
                                        </label>
                                        <input
                                            type="text"
                                            name="reclamation"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="reclamation"
                                            placeholder="Divers reclamation"
                                            value={formDataEdit.reclamation}
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                </div>

                                <button className="flex left-6 justify-center place-self-end text-md text-white w-[150px] bg-orange-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-orange-500 hover:text-orange-500">
                                    Modifier
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showDataModal && (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[1000px] flex flex-col gap-1">
                        <button className="text-red-600 text-xl place-self-end" onClick={() => setShowDataModal(false)}>
                            <IoMdCloseCircle size={25} />
                        </button>
                        <div className="bg-white px-8 py-14 rounded-md">
                            <form
                                onSubmit={() => handleModificationSubmit(formDataEdit._id)}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="dateEntrer" className="font-bold pl-5 pb-4">
                                            Date Entrer
                                        </label>
                                        <input
                                            type="date"
                                            name="dateEntrer"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="dateEntrer"
                                            value={dateFormatter(formDataEdit.dateEntrer, 'form')}
                                            onChange={handelOnChangeEdit}
                                            readOnly
                                        />
                                    </div>

                                    <div className="input-type">
                                        <label htmlFor="dateSortie" className="font-bold pl-5 pb-4">
                                            Date Sortie
                                        </label>
                                        <input
                                            type="date"
                                            name="dateSortie"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="dateSortie"
                                            required
                                            value={dateFormatter(formDataEdit.dateSortie, 'form')}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="blNumber" className="font-bold pl-5 pb-4">
                                            Numero de BL
                                        </label>
                                        <input
                                            type="text"
                                            name="blNumber"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="blNumber"
                                            placeholder="Numero de BL"
                                            required
                                            value={formDataEdit.blNumber}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="brand" className="font-bold pl-5 pb-4">
                                            Marque
                                        </label>
                                        <input
                                            type="text"
                                            name="brand"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="brand"
                                            placeholder="Marque du voiture"
                                            required
                                            value={formDataEdit.brand}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="matricule" className="font-bold pl-5 pb-4">
                                            Matricule
                                        </label>
                                        <input
                                            type="text"
                                            dir={checkArabic(formDataEdit.matricule)}
                                            name="matricule"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="matricule"
                                            placeholder="Matricule"
                                            required
                                            value={formDataEdit.matricule}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="clientName" className="font-bold pl-5 pb-4">
                                            Nom du Client
                                        </label>
                                        <input
                                            type="text"
                                            name="clientName"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="clientName"
                                            placeholder="Nom du Client"
                                            required
                                            value={formDataEdit.clientName}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="clientPhone" className="font-bold pl-5 pb-4">
                                            Telephone
                                        </label>
                                        <input
                                            type="text"
                                            name="clientPhone"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="clientPhone"
                                            placeholder="Telephone"
                                            required
                                            value={formDataEdit.clientPhone}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="serviceType" className="font-bold pl-5 pb-4">
                                            Nature de Service
                                        </label>
                                        <input
                                            type="text"
                                            name="serviceType"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="serviceType"
                                            placeholder="Nature de Service"
                                            required
                                            value={formDataEdit.serviceType}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="price" className="font-bold pl-5 pb-4">
                                            Prix
                                        </label>
                                        <input
                                            type="text"
                                            name="price"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="price"
                                            placeholder="Prix de service"
                                            required
                                            value={formDataEdit.price}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="paidAmt" className="font-bold pl-5 pb-4">
                                            Montant Payée
                                        </label>
                                        <input
                                            type="text"
                                            name="paidAmt"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="paidAmt"
                                            placeholder="Montant Payée"
                                            value={formDataEdit.paidAmt}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="unpaidAmt" className="font-bold pl-5 pb-4">
                                            Reste
                                        </label>
                                        <input
                                            type="text"
                                            name="unpaidAmt"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="unpaidAmt"
                                            placeholder="Reste"
                                            value={unpaidAmt}
                                            onChange={handelOnChange}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="technicien" className="font-bold pl-5 pb-4">
                                            Nom de Technicien
                                        </label>
                                        <input
                                            type="text"
                                            name="technicien"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="technicien"
                                            placeholder="Nom de Technicien"
                                            value={formDataEdit.technicien}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="seniorityCard" className="font-bold pl-5 pb-4">
                                            Carte d'ancienneté
                                        </label>
                                        <input
                                            type="text"
                                            name="seniorityCard"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="seniorityCard"
                                            placeholder="Carte d'ancienneté"
                                            value={formDataEdit.seniorityCard}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                    <div className="input-type">
                                        <label htmlFor="fidelity" className="font-bold pl-5 pb-4">
                                            Carte de fidélité
                                        </label>
                                        <input
                                            type="text"
                                            name="fidelity"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="fidelity"
                                            placeholder="Carte de fidélité"
                                            value={formDataEdit.fidelity}
                                            readOnly
                                            onChange={handelOnChangeEdit}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 px-4">
                                    <div className="input-type">
                                        <label htmlFor="reclamation" className="font-bold pl-5 pb-4">
                                            Divers reclamation
                                        </label>
                                        <input
                                            type="text"
                                            name="reclamation"
                                            className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                            id="reclamation"
                                            placeholder="Divers reclamation"
                                            value={formDataEdit.reclamation}
                                            onChange={handelOnChange}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto justify-between py-5 border=b">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-neutral-800">
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300 ">Date Entrer</span>
                            </th>
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300">N BL</span>
                            </th>
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300">Marque</span>
                            </th>
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300">Matricule</span>
                            </th>
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300">Nom Client</span>
                            </th>
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300">Telephone</span>
                            </th>
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300">Service</span>
                            </th>
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300">Prix</span>
                            </th>
                            <th className="px-3 py-2 text-center items-center">
                                <span className="text-neutral-300">Actions</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-neutral-300">
                        {tableData.map((order) => (
                            <tr key={order.orderId}>
                                <td className="px-3 py-2 text-center  items-center">
                                    <span className="text-neutral-900">{dateFormatter(order.dateEntrer, 'table')}</span>
                                </td>
                                <td className="px-3 py-2 text-center items-center">
                                    <span className="text-neutral-900">{order.blNumber}</span>
                                </td>
                                <td className="px-3 py-2 text-center items-center">
                                    <span className="text-neutral-900">{order.brand}</span>
                                </td>
                                <td className="px-3 py-2 text-center items-center">
                                    <span className="text-neutral-900" dir={checkArabic(order.matricule)}>{order.matricule}</span>
                                </td>
                                <td className="px-3 py-2 text-center items-center">
                                    <span className="text-neutral-900">{order.clientName}</span>
                                </td>
                                <td className="px-3 py-2 text-center items-center">
                                    <span className="text-neutral-900">{order.clientPhone}</span>
                                </td>
                                <td className="px-3 py-2 text-center items-center">
                                    <span className="text-neutral-900">{order.serviceType}</span>
                                </td>
                                <td className="px-3 py-2 text-center items-center">
                                    <span className="text-neutral-900">{order.price}</span>
                                </td>
                                <td className="px-3 py-2 items-center justify-center flex gap-3">
                                    <button className="items-center">
                                        <FaEye
                                            size={25}
                                            color={'rgb(255, 155, 0'}
                                            onClick={() => handelMoreButton(order)}
                                        />
                                    </button>
                                    <button className="items-center">
                                        <BiEdit
                                            size={25}
                                            color={'rgb(34,197,94)'}
                                            onClick={() => handelEditButton(order)}
                                        />
                                    </button>
                                    <button className="items-center">
                                        <BiTrashAlt
                                            size={25}
                                            color={'rgb(244,63,94)'}
                                            onClick={() => handelDelete(order._id)}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Dashboard
