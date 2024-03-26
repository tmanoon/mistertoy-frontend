import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
// import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to cart')
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add a toy</Link>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        // addToCart={addToCart}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}

