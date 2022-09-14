import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
	const { imageUrl, title } = category;
	return (
		<div className="category-container" style={{backgroundImage: `url(${imageUrl})`}}>
			<div className="background-image" />
			<div className="category-body-container">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	)
}

export default CategoryItem;