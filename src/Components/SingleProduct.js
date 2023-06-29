import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { CartState } from "../Context/Context";

const SingleProduct = (props) => {
  const { id, name, price, image, brand, rating } = props.data;

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const ratingStar = () =>
    Array.from({ length: 5 }, (elem, index) => {
      let number = index + 0.5;
      return (
        <span key={index}>
          {rating >= index + 1 ? (
            <FaStar className="star-icon" />
          ) : rating >= number ? (
            <FaStarHalfAlt className="star-icon" />
          ) : (
            <AiOutlineStar className="star-icon" />
          )}
        </span>
      );
    });

  return (
    <div className="card">
      <img src={image} alt={name} className="img" />
      <div className="info">
        <h2>{name}</h2>
        <p>{brand}</p>
        <p>
          <span className="price">${price}</span>
        </p>
        <p>{ratingStar()}</p>
      </div>
      <div className="add-remove-btn">
        {cart.some((p) => p.id === id) ? (
          <button
            className="removefromcart"
            onClick={() =>
              dispatch({ type: "REMOVE_FROM_CART", payload: props.data })
            }
          >
            Remove from cart
          </button>
        ) : (
          <button
            className="addtocart"
            onClick={() =>
              dispatch({ type: "ADD_TO_CART", payload: props.data })
            }
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
