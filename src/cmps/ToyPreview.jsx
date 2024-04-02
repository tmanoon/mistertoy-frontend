import { Link } from 'react-router-dom'
export function ToyPreview({ toy, onRemoveToy }) {

    function transferTimestampToStr(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${day}/${month}/${year}`
    }
    return (//flex column align-center
        <article className="toy-preview">
            
            <div>
                <h4>{toy.name}</h4>
                <h6>Price:&nbsp;&nbsp;<span>${toy.price}</span></h6>
                <h6>Status:&nbsp;&nbsp;<span>{toy.inStock ? 'In stock' : 'Out of stock'}</span></h6>
                {toy.owner && <h6>Owner: {toy.owner}</h6>}
                <img className="toy-img" src={`https://robohash.org/${toy.name}?set=set4`} title={`image of ${toy.name}`} />
                <div className="toy-actions">
                    <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}></button>
                    <Link to={`/toy/edit/${toy._id}`}><button className="edit-btn">Edit</button></Link>
                    <Link to={`/toy/${toy._id}`}><button className='details-btn'>Details</button></Link>
                </div>
            </div>
        </article>
    )
}