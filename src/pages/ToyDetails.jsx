import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { store } from '../store/store.js'
import { useSelector } from 'react-redux'
import { addToyMsg } from "../store/actions/toy.actions.js"
import { addReview } from '../store/actions/review.actions.js'
import { ChatRoom } from '../cmps/ChatRoom.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const user = store.getState().userModule.user
    const [userMsg, setUserMsg] = useState('')
    const [userReview, setUserReview] = useState('')
    const [toyReviews, setToyReviews] = useState([])
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

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
            const currToyReviews = reviews.filter(review => review.toy._id === toyId)
            if (currToyReviews) setToyReviews(currToyReviews)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    function onUserTxtChange(e) {
        e.stopPropagation()
        const { name, value } = e.target
        if(name === 'msg') setUserMsg(value)
        if(name === 'review') setUserReview(value)
    }

    async function onAddAction(e) {
        e.stopPropagation()
        try {
            const { name } = e.target 
            if(name === 'msgs') {
            const userMsgToToy = _createMsg()
            const msg = await addToyMsg(toy, userMsgToToy)
            setToy(prevToy => ({ ...prevToy, msgs: [...prevToy.msgs, msg] }))
            setUserMsg('')
        } else {
            const review = { toyId: toy._id, txt: userReview }
            await addReview(review)
        }
        } catch (err) {
            console.log(err)
        }
    }

    function _createMsg() {
        const msg = {}
        msg.txt = userMsg
        return msg
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

            {toy.msgs.length > 0 && <> 
            <h2>Toy messages:</h2>
                <ul>
                    {toy.msgs.map(msg =>
                    <li key={msg.id}>"{msg.txt}" , by: {msg.by.fullname}, id: {msg.by._id}</li>)}
                </ul>
            </>}

            {toyReviews.length > 0 && <>
                <h2>Reviews:</h2>
                <ul>
                    {toyReviews.map(review => 
                    <li key={review.txt}>"{review.txt}" , by: {review.user.fullname}, id: {review.user._id}</li>)}
                </ul>
            </>}

            {user &&
                <section className="user-actions">
                    <textarea placeholder="Add a message" name="msg" value={userMsg} onChange={onUserTxtChange}></textarea>
                    <button name="msgs" onClick={onAddAction}>Add a message</button>
                    <textarea placeholder="Add a review" name="review" value={userReview} onChange={onUserTxtChange}></textarea>
                    <button name="reviews" onClick={onAddAction}>Add a review</button>
                </section>}
                {/* {toy && user && <ChatRoom toy={toy} />} */}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <p>
                {/* <Link to="/toy/lqIQG">Next toy</Link> */}
            </p>
            
        </section>
    )
}
