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
        <label htmlFor="txt">
            By text:
        </label>
        <input type="text" name="txt" id="txt" value={filterBy.txt} onChange={handleChange} />
    </section>
}