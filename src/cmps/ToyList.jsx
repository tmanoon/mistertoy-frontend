const { Link } = ReactRouterDOM
const { useSelector } = ReactRedux

export function ToyList({ onRemoveToy }) {
	const toys = useSelector(storeState => storeState.toyModule.toys)

	return <ul className="contact-list">
		{toys.map(toy =>
			<li key={toy._id}>
				<Link to={`/toy/${toy._id}`}>
					<toyPreview toy={toy} />
				</Link>
				<div className="toy-actions flex space-evenly">
					<button className="remove-btn" onClick={() => onRemoveToy(toy._id)}></button>
					<Link to={`/toy/edit/${toy._id}`}><button className="edit-btn">Edit</button></Link>
				</div>
			</li>
		)}
	</ul>
}