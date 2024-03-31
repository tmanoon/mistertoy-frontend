import { useEffect, useState, useRef } from 'react'
import { utilService } from "../services/util.service.js"
import { TxtField } from './TxtField.jsx'
import { SelectEl } from './SelectEl.jsx'
import { MultiSelectEl } from './MultiSelectEl.jsx'
import { toyService } from '../services/toy.service.js'

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    return <section className="toy-filter flex center" style={{ position: 'relative' }}>
        <TxtField by={'name'} setFilterByToEdit={setFilterByToEdit} />
        <label>Stock state: </label>
        <SelectEl options={[{ status: 'In stock', value: 'available' },
        { status: 'Not in stock', value: 'gone' }]}
        setFilterByToEdit={setFilterByToEdit} name={"inStock"} />
        <label>Sort By:</label>
        <SelectEl options={[{ status: 'Name', value: 'name' },
        { status: 'Price', value: 'price' }, 
        { status: 'Creation date', value: 'createdAt' }]}
        setFilterByToEdit={setFilterByToEdit} name={"sortBy"} />
        <MultiSelectEl options={toyService.getLabels()} by={'Labels'} 
        setFilterByToEdit={setFilterByToEdit} />
    </section>
}

