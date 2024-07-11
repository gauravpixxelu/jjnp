// FAQ.jsx

import React from "react";

function FAQ() {
  return (
    <>
      <header className="bg-gray-900 py-8 text-center">
        <h1 className=" font-bold text-white">About Company</h1>
      </header>
      <main className="container mx-auto px-4 py-12 lg:px-8 lg:text-[14px] text-[12px]">
        <div className="space-y-6">
          <div>
            <h2 className=" font-semibold">
              Question 1: What is your return policy?
            </h2>
            <p className=" text-gray-700">
              Our return policy allows you to return items within 30 days of
              delivery for a full refund.
            </p>
          </div>
          <div>
            <h2 className=" font-semibold">
              Question 2: Do you offer free shipping?
            </h2>
            <p className=" text-gray-700">
              Yes, we offer free shipping on all orders over $50 within the US.
            </p>
          </div>
          <div>
            <h2 className=" font-semibold">
              Question 3: How can I track my order?
            </h2>
            <p className=" text-gray-700">
              Once your order has been shipped, you will receive a tracking
              number via email. You can use this tracking number to track your
              order on our website.
            </p>
          </div>
          <div>
            <h2 className=" font-semibold">
              Question 4: How can I contact customer support?
            </h2>
            <p className=" text-gray-700">
              You can contact our customer support team by emailing
              support@example.com or calling 1-800-123-4567.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default FAQ;
