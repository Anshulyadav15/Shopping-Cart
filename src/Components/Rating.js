import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick }) => {
  return (
    <>
      {Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return (
          <span className="star" key={index} onClick={() => onClick(index)}>
            {rating >= index + 1 ? (
              <FaStar />
            ) : rating >= number ? (
              <FaStarHalfAlt />
            ) : (
              <AiOutlineStar />
            )}
          </span>
        );
      })}
    </>
  );
};

export default Rating;
