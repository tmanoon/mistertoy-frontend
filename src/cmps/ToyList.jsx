import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({toys, onRemoveToy }) {

	return <ul className="toy-list">
		{toys.map(toy =>
			<li key={toy._id} className="toy-preview">
					<ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
			</li>
		)}
	</ul>
}