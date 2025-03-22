import { products } from "../utils/mockData";

export default function Products() {
  console.log(products);
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            {product.title}
            {product.price}
          </div>
        );
      })}
    </div>
  );
}
