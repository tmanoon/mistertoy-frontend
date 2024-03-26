import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service-old.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const labels = toyService.getLabels()

    useEffect(() => {
        if (toyId) loadToy()
        else setToyToEdit(toyService.getEmptyToy())
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (field === 'labels' && type === 'checkbox') {
            if (target.checked) {
                setToyToEdit(prevToy => ({ ...prevToy, labels: [...prevToy.labels, value] }))
            } else {
                setToyToEdit(prevToy => ({ ...prevToy, labels: prevToy.labels.filter(label => label !== value) }))
                target.checked = !target.checked
            }
        }
        else {
            const newValue = type === 'number' ? +value : value
            if(type === 'checkbox') value = target.checked
            setToyToEdit(prevToy => ({ ...prevToy, [field]: newValue }))
        }
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 1000
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} toy</h2>

            <form onSubmit={onSaveToy} >
                <div className="name-edit">
                    <label htmlFor="name">Name: </label>
                    <input type="text"
                        name="name"
                        id="name"
                        placeholder="Enter the toy's name..."
                        value={toyToEdit.name}
                        onChange={handleChange} />
                </div>
                <div className="price-edit"><label htmlFor="price">Price: </label>
                    <input type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={toyToEdit.price}
                        onChange={handleChange} />
                </div>
                <div className="labels"><label htmlFor="label">Labels: </label>
                    <ul>
                        {labels.map(label => {
                            return <li key={label}>
                                <input type="checkbox" id={label} onChange={handleChange} checked={toyToEdit.labels.includes(label)} name="labels" value={label} />
                                <label htmlFor={label}>{label}</label>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="stock">
                    <label htmlFor="stock">In stock: </label>
                    <input type="checkbox" id="stock" name="inStock" checked={toyToEdit.inStock} onChange={handleChange} />
                </div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </form>
        </section >
    )
}