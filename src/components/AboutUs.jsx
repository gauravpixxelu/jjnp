import { useEffect } from "react";

function AboutUs() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>

      <section className="relative">

        <div className="relative bg-cover bg-center flex items-center justify-center min-h-[170px] lg:min-h-[400px]" style={{ backgroundImage: `url(./contact/contact-banner.png)` }}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-2xl lg:text-5xl font-bold">About Company</h1>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-4 m-4 lg:m-8 lg:gap-8 lg:flex-nowrap">
          <div className="w-full">
            <img className="w-full" src="./about/about1.png" alt="" />
            <p className="mt-4 text-gray-700">Welcome to our fashion website! We are passionate about bringing you the latest trends in fashion and ensuring you have the best shopping experience possible.</p>
          </div>
          <div className="w-full">
          <img className="w-full" src="./about/about2.png" alt="" />
            <p className="mt-4 text-gray-700">Our mission is to provide high-quality clothing, excellent customer service, and a seamless online shopping experience.</p>
          </div>
          <div className="w-full">
          <img className="w-full" src="./about/about3.png" alt="" />
            <p className="mt-4 text-gray-700">If you have any questions or feedback, please don't hesitate to contact us. We'd love to hear from you!</p>
          </div>
        </div>

      </section>
    </>
  );
}

export default AboutUs;
