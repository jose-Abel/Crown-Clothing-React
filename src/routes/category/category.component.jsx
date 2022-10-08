import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import { CategoryContainer, CategoryTitle } from "./category.styles";

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);

	}, [category, categoriesMap]);

	return (
		<Fragment>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>

			<CategoryContainer>
				{
					products && products.map(product => <ProductCard key={product.id} product={product} />)
				}
			</CategoryContainer>
		</Fragment>
	)
}

export default Category;