import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    function transferTimestampToStr(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${day}/${month}/${year}`
    }

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
            <h1>Toy name : {toy.name}</h1>
            <h2>Price: ${toy.price}</h2>
            <h2>In stock: {toy.inStock ? 'Yes' : 'No'}</h2>
            <h2>Id: {toy._id}</h2>
            <h2>Created At: {transferTimestampToStr(toy.createdAt)}</h2>
            {toy.owner && <h2>Owner: {toy.owner}</h2>}
            <h2>Belongs to categories:
                {toy.labels.length === 1 && toy.labels[0]}
                {toy.labels.length > 1 && toy.labels.map((label, idx, arr) => <span key={label}> {label} {idx < arr.length - 1 && ','} </span>)}
            </h2>
            <h2>Toy messages: </h2>
            {toy.msgs.length && <ul>{toy.msgs.map(msg => 
            <li key={msg.id}>
                <h3>" {msg.txt} "</h3>
                <h5>By: {msg.by.fullname}, id: {msg.by._id}</h5>
            </li>
        )}
        </ul>}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <p>
                {/* <Link to="/toy/lqIQG">Next toy</Link> */}
            </p>
        </section>
    )
}
