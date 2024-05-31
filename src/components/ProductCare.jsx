import { useEffect } from "react";

function ProductCare() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>


      <section className="relative">

        <div className="relative bg-cover bg-center flex items-center justify-center min-h-[170px] lg:min-h-[400px]" style={{ backgroundImage: `url(./contact/contact-banner.png)` }}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-2xl lg:text-5xl font-bold">Product Care</h1>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-4 m-4 lg:m-8 lg:gap-8 lg:flex-nowrap">
          <div className="w-full">
            <img className="w-full" src="./product-care/image1.png" alt="" />
            <h4 className="mt-4 mb-1 font-bold text-black text-[20px]">Washing Instructions</h4>
            <p className="text-gray-700">For best results, we recommend washing our products in cold water and hanging them to dry.</p>
          </div>
          <div className="w-full">
            <img className="w-full" src="./product-care/image2.png" alt="" />
            <h4 className="mt-4 mb-1 font-bold text-black text-[20px]">Storage Tips</h4>
            <p className="text-gray-700">Store our products in a cool, dry place away from direct sunlight to prevent damage.</p>
          </div>
          <div className="w-full">
            <img className="w-full" src="./product-care/image3.png" alt="" />
            <h4 className="mt-4 mb-1 font-bold text-black text-[20px]">Handling Instructions</h4>
            <p className="text-gray-700">Handle our products with care to avoid tears or damage. Avoid contact with sharp objects.</p>
          </div>
          <div className="w-full">
            <img className="w-full" src="./product-care/image4.png" alt="" />
            <h4 className="mt-4 mb-1 font-bold text-black text-[20px]">Cleaning Tips</h4>
            <p className="text-gray-700">Spot clean our products with a damp cloth and mild detergent. Do not machine wash or dry clean.</p>
          </div>
        </div>

      </section>
    </>
  );
}

export default ProductCare;
