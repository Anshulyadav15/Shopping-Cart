import React from "react";
import { CartState } from "../Context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
    productstate: { sort, searchQuery, category, rating },
  } = CartState();

  const transformProduct = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) => {
        const searchinput = product.name.toLowerCase().includes(searchQuery);
        return searchinput;
      });
    }
    if (category.value) {
      sortedProducts = sortedProducts.filter((product) => {
        return product.category === category.value;
      });
      if (category.value === "All") {
        sortedProducts = products;
      }
    }
    if (rating) {
      sortedProducts = sortedProducts.filter((product) => {
        return product.rating >= rating;
      });
    }
    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters products={products} />
      <div className="productContainer">
        {transformProduct().map((product, id) => {
          return <SingleProduct data={product} key={id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
