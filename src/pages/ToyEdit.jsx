import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFormik } from 'formik'
import { editSchema } from '../schemas/editSchema.js'
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const navigate = useNavigate()
    // const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const initialValues = toyService.getEmptyToy()
    const { toyId } = useParams()
    const labels = toyService.getLabels()

    const { values, setValues, errors, handleChange, handleBlur} = useFormik({
        initialValues,
        validationSchema: editSchema
    })

    useEffect(() => {
        if (toyId && values === initialValues) loadToy()
    }, [values])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setValues(toy)
        } catch (err) {
            console.log('Had issues in toy edit', err)
            navigate('/toy')
        }
    }

    function handleCheckboxChange(ev) {
        const { name, value, checked } = ev.target;
        const updatedLabels = checked
            ? [...values.labels, value] 
            : values.labels.filter(label => label !== value)
        setValues({ ...values, [name]: updatedLabels })
    }

    async function onSaveToy(e) {
        e.preventDefault()
        try {
            if (!values.price) values.price = 20
            values.createdAt = Date.now()
            const toy = values
            await saveToy(toy)
            showSuccessMsg('toy Saved!')
            navigate('/toy')
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Had issues in toy details')
        }
    }

    return (
        <section className="toy-edit">
            <h2>{values._id ? 'Edit' : 'Add'} toy</h2>

            <form onSubmit={onSaveToy} >
                <div className="name-edit">
                    <label htmlFor="name">Name: </label>
                    <input type="text"
                        className={errors.name ? 'error-input' : ''}
                        name="name"
                        id="name"
                        placeholder="Enter the toy's name..."
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className="price-edit"><label htmlFor="price">Price: </label>
                    <input type="number"
                        className={errors.price ? 'error-input' : ''}
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
                <div className="labels"><label htmlFor="label">Labels: </label>
                    <ul>
                        {labels.map((label) => {
                            return <li key={label}>
                                <input type="checkbox" id={label} onChange={handleCheckboxChange} 
                                checked={values.labels.includes(label)} name="labels" value={label} />
                                <label htmlFor={label}>{label}</label>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="stock">
                    <label htmlFor="stock">In stock: </label>
                    <input type="checkbox" id="stock" name="inStock" checked={values.inStock} onChange={handleChange} />
                </div>
                <button type="submit">{values._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </form>
        </section >
    )
}