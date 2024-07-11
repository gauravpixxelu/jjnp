import React from "react";

const ProductCard = (props) => {
  return (
    <div className="flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg h-96">
      <div className="relative flex items-center justify-center h-96">
        <img className="relative w-full h-full object-cover" src={props.imgSrc} alt="" />      
      </div>
    </div>
  );
};

export default ProductCard;
