import React, { useEffect, useState } from "react";
import { CartState } from "../Context/Context";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
    );
  }, [cart]);

  if (cart.length > 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart Items</h1>
        {cart.map((product, id) => {
          return (
            <div className="cart-card" key={id}>
              <div className="cart-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="cart-info">
                <h3>{product.name}</h3>
                <p>{product.brand}</p>
              </div>
              <div className="price">
                <p>${product.price}</p>
              </div>
              <div>
                <button
                  className="remove"
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_CART_QUANTITY",
                      payload: {
                        id: product.id,
                        quantity: product.quantity - 1,
                      },
                    })
                  }
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  className="cart-input"
                  type="text"
                  value={product.quantity}
                  onChange={(e) => {
                    dispatch({
                      type: "CHANGE_CART_QUANTITY",
                      payload: {
                        id: product.id,
                        quantity: Number(e.target.value),
                      },
                    });
                  }}
                />
                <button
                  className="add"
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_CART_QUANTITY",
                      payload: {
                        id: product.id,
                        quantity: product.quantity + 1,
                      },
                    })
                  }
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <div>
                <MdDelete
                  className="cart-remove-btn"
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: product })
                  }
                />
              </div>
            </div>
          );
        })}
        <div className="subtotal">
          <h3>Subtotal ({cart.length}) items</h3>
          <p>Total: ${total}</p>
          <button>Proceed to checkout</button>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1 className="cart-title">Your Cart Is Empty...</h1>
      </>
    );
  }
};

export default Cart;
