import React from "react";

function AboutUs() {
  return (
    <>
      <header className="bg-gray-900 py-8 text-center">
        <h1 className="text-xl font-bold text-white">About Company</h1>
      </header>
      <main className="container mx-auto px-4 py-12 lg:px-8 lg:text-[14px] text-[12px]">
        <p className="text-gray-700 ">
          Welcome to our fashion website! We are passionate about bringing you
          the latest trends in fashion and ensuring you have the best shopping
          experience possible.
        </p>
        <p className=" text-gray-700 mt-4">
          Our mission is to provide high-quality clothing, excellent customer
          service, and a seamless online shopping experience.
        </p>
        <p className="text-gray-700 mt-4">
          If you have any questions or feedback, please don't hesitate to
          contact us. We'd love to hear from you!
        </p>
      </main>
    </>
  );
}

export default AboutUs;
