import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {

    return (
        <article className="toy-article flex align-center">
            {/* <img src={toy.img} /> */}
            <div>
                <h4>{toy.name}</h4>
                <h6>Price:&nbsp;&nbsp;<span>{toy.price}</span></h6>
                <h6>Status:&nbsp;&nbsp;<span>{toy.inStock ? 'In stock' : 'Out of stock'}</span></h6>
            </div>
        </article>
    )
}