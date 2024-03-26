import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({toys, onRemoveToy }) {

	return <ul className="toy-list">
		{toys.map(toy =>
			<li key={toy._id}>
				<Link to={`/toy/${toy._id}`}>
					<ToyPreview toy={toy} />
				</Link>
				<div className="toy-actions">
					<button className="remove-btn" onClick={() => onRemoveToy(toy._id)}></button>
					<Link to={`/toy/edit/${toy._id}`}><button className="edit-btn">Edit</button></Link>
				</div>
			</li>
		)}
	</ul>
}