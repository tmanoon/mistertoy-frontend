import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {

    function transferTimestampToStr(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${day}/${month}/${year}`
    }
    return (
        <article className="toy-article flex align-center">
            {/* <img src={toy.img} /> */}
            <div>
                <h4>{toy.name}</h4>
                <h6>Price:&nbsp;&nbsp;<span>{toy.price}</span></h6>
                <h6>Status:&nbsp;&nbsp;<span>{toy.inStock ? 'In stock' : 'Out of stock'}</span></h6>
                <h6>Created at: {transferTimestampToStr(toy.createdAt)}</h6>
            </div>
        </article>
    )
}