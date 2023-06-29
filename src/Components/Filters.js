import React, { useState } from "react";
import Rating from "./Rating";
import { FaBars } from "react-icons/fa";
import { CartState } from "../Context/Context";

const Filters = ({ products }) => {
  const [selectedindex, setSelectedIndex] = useState(0);

  const {
    productstate: { sort, rating },
    productDispatch,
  } = CartState();

  const getUniqueData = (data) => {
    let newValue = data.map((product) => {
      return product.category;
    });
    return (newValue = ["All", ...new Set(newValue)]);
  };
  const categoryData = getUniqueData(products);

  return (
    <>
      <div className="filtercontainer">
        <h2>Filter Products</h2>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <FaBars />
        </label>
        <form className="form-container">
          <div>
            <input
              className="lowtohigh"
              type="radio"
              id="ascending"
              name="ascending"
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                })
              }
              checked={sort === "lowToHigh" ? true : false}
            />
            <label className="ascending">Low To High</label>
          </div>

          <div>
            <input
              className="hightolow"
              type="radio"
              id="descending"
              name="descending"
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                })
              }
              checked={sort === "highToLow" ? true : false}
            />
            <label className="descending">High To Low</label>
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <div className="category">
              {categoryData.map((product, id) => {
                return (
                  <button
                    className={`category-btn ${
                      id === selectedindex ? "default-btn" : ""
                    }`}
                    key={id}
                    type="button"
                    name="category"
                    value={product}
                    onClick={(e) => {
                      let name = e.target.name;
                      let value = e.target.value;
                      productDispatch({
                        type: "FILTER_BY_CATEGORY",
                        payload: { name, value },
                      });
                      setSelectedIndex(id);
                    }}
                  >
                    {product}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label name="rating">Rating: </label>
            <Rating
              rating={rating}
              products={products}
              onClick={(index) =>
                productDispatch({
                  type: "FILTER_BY_RATING",
                  payload: index + 1,
                })
              }
            />
          </div>

          <button
            className="clearfilter-btn"
            onClick={() =>
              productDispatch({
                type: "CLEAR_FILTER",
              })
            }
          >
            Clear filters
          </button>
        </form>
      </div>
    </>
  );
};

export default Filters;
