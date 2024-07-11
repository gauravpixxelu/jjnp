// ProductCare.jsx

import React from "react";

function ProductCare() {
  return (
    <>
      <header className="bg-gray-900 py-8 text-center">
        <h1 className=" font-bold text-white">Product Care</h1>
      </header>
      <main className="container mx-auto px-4 py-12 lg:px-8 lg:text-[14px] text-[12px]">
        <div className="space-y-6">
          <div>
            <h2 className=" font-semibold">Washing Instructions</h2>
            <p className=" text-gray-700">
              For best results, we recommend washing our products in cold water
              and hanging them to dry.
            </p>
          </div>
          <div>
            <h2 className=" font-semibold">Storage Tips</h2>
            <p className=" text-gray-700">
              Store our products in a cool, dry place away from direct sunlight
              to prevent damage.
            </p>
          </div>
          <div>
            <h2 className=" font-semibold">Handling Instructions</h2>
            <p className=" text-gray-700">
              Handle our products with care to avoid tears or damage. Avoid
              contact with sharp objects.
            </p>
          </div>
          <div>
            <h2 className=" font-semibold">Cleaning Tips</h2>
            <p className=" text-gray-700">
              Spot clean our products with a damp cloth and mild detergent. Do
              not machine wash or dry clean.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductCare;
