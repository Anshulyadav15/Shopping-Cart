import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { CartState } from "../Context/Context";

const Header = () => {
  const {
    state: { cart },
    productDispatch,
  } = CartState();
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <h1>Shopping Cart</h1>
            </Link>
          </div>
          <div className="search">
            <BiSearch className="search-icon" />
            <form>
              <input
                type="text"
                className="search-input"
                placeholder="Search.."
                onChange={(e) =>
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  })
                }
              />
            </form>
          </div>
          <div>
            <Link className="cart" to="/Cart">
              <FaShoppingCart />
              <sub>{cart.length}</sub>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
