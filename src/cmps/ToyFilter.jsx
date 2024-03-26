import { useEffect, useState, useRef } from 'react'
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <section className="contact-filter">
        <label htmlFor="name">
            By name:
        </label>
        <input type="text" name="name" id="name" placeholder="Enter the toy's name" value={filterBy.name} onChange={handleChange} />
        <label>Stock state: </label>
        <select value={filterByToEdit.stockState} onChange={handleChange} name="inStock">
            <option value="">Choose</option>
            <option value="available">In stock</option>
            <option value="low">Low in stock</option>
            <option value="gone">Not in stock</option>
        </select>
        <label>Sort By:</label>
        <select value={filterBy.sortBy} onChange={handleChange} name="sortBy">
            <option value="all">Choose</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Creation date</option>
        </select>
    </section>
}
