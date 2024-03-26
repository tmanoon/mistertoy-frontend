import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { toyService } from "../services/toy.service-old.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>toy name : {toy.name}</h1>
            <h2>Price: ${toy.price}</h2>
            <h2>In stock: {toy.inStock ? 'Yes' : 'No'}</h2>
           <h2>Belongs to categories: </h2>{toy.labels.map(label => <pre key={label}>{label}</pre>)}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <p>
                {/* <Link to="/toy/lqIQG">Next toy</Link> */}
            </p>
        </section>
    )
}
